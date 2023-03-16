import { rest } from "msw";
import * as moviesDB from "test/data/movies";
import * as usersDB from "test/data/users";
import * as listItemsDB from "test/data/list-items";

const apiUrl = process.env.REACT_APP_API_URL;
const authUrl = process.env.REACT_APP_AUTH_URL;

let sleep;
if (process.env.CI) {
  sleep = () => Promise.resolve();
} else if (process.env.NODE_ENV === "test") {
  sleep = () => Promise.resolve();
} else {
  sleep = (
    t = Math.random() * ls("__videoclub_variable_request_time__", 600) +
      ls("__videoclub_min_request_time__", 600)
  ) => new Promise((resolve) => setTimeout(resolve, t));
}

function ls(key, defaultVal) {
  const lsVal = window.localStorage.getItem(key);
  let val;
  if (lsVal) {
    val = Number(lsVal);
  }
  return Number.isFinite(val) ? val : defaultVal;
}

const handlers = [
  rest.post(`${authUrl}/login`, async (req, res, ctx) => {
    const { username, password } = req.body;
    const user = await usersDB.authenticate({ username, password });
    return res(ctx.json({ user }));
  }),

  rest.post(`${authUrl}/register`, async (req, res, ctx) => {
    const { username, password } = req.body;
    const userFields = { username, password };
    await usersDB.create(userFields);
    let user;
    try {
      user = await usersDB.authenticate(userFields);
    } catch (error) {
      return res(
        ctx.status(400),
        ctx.json({ status: 400, message: error.message })
      );
    }
    return res(ctx.json({ user }));
  }),

  rest.get(`${apiUrl}/me`, async (req, res, ctx) => {
    const user = await getUser(req);
    const token = getToken(req);
    return res(ctx.json({ user: { ...user, token } }));
  }),

  rest.get(`${apiUrl}/movies`, async (req, res, ctx) => {
    if (!req.url.searchParams.has("query")) {
      return ctx.fetch(req);
    }
    const query = req.url.searchParams.get("query");

    let matchingMovies = [];
    if (query) {
      matchingMovies = await moviesDB.query(query);
    } else {
      matchingMovies = await moviesDB.getAll();
    }

    return res(ctx.json({ movies: matchingMovies }));
  }),

  rest.get(`${apiUrl}/movie/:movieId`, async (req, res, ctx) => {
    const { movieId } = req.params;
    const movie = await moviesDB.read(movieId);
    if (!movie) {
      return res(
        ctx.status(404),
        ctx.json({ status: 404, message: "Movie not found" })
      );
    }
    return res(ctx.json({ movie }));
  }),

  rest.get(`${apiUrl}/list-items`, async (req, res, ctx) => {
    const user = await getUser(req);
    const lis = await listItemsDB.readByOwner(user.id);
    const listItemsAndMovies = await Promise.all(
      lis.map(async (listItem) => ({
        ...listItem,
        movie: await moviesDB.read(listItem.movieId),
      }))
    );
    return res(ctx.json({ listItems: listItemsAndMovies }));
  }),

  rest.post(`${apiUrl}/list-items`, async (req, res, ctx) => {
    const user = await getUser(req);
    const { movieId } = req.body;
    const listItem = await listItemsDB.create({
      ownerId: user.id,
      movieId: movieId,
    });
    const movie = await moviesDB.read(movieId);
    return res(ctx.json({ listItem: { ...listItem, movie } }));
  }),

  rest.put(`${apiUrl}/list-items/:listItemId`, async (req, res, ctx) => {
    const user = await getUser(req);
    const { listItemId } = req.params;
    const updates = req.body;
    await listItemsDB.authorize(user.id, listItemId);
    const updatedListItem = await listItemsDB.update(listItemId, updates);
    const movie = await moviesDB.read(updatedListItem.movieId);
    return res(ctx.json({ listItem: { ...updatedListItem, movie } }));
  }),

  rest.delete(`${apiUrl}/list-items/:listItemId`, async (req, res, ctx) => {
    const user = await getUser(req);
    const { listItemId } = req.params;
    await listItemsDB.authorize(user.id, listItemId);
    await listItemsDB.remove(listItemId);
    return res(ctx.json({ success: true }));
  }),
].map((handler) => {
  const originalResolver = handler.resolver;
  handler.resolver = async function resolver(req, res, ctx) {
    try {
      const result = await originalResolver(req, res, ctx);
      return result;
    } catch (error) {
      const status = error.status || 500;
      return res(
        ctx.status(status),
        ctx.json({ status, message: error.message || "Unknown Error" })
      );
    } finally {
      await sleep();
    }
  };
  return handler;
});
const getToken = (req) =>
  req.headers.get("Authorization")?.replace("Bearer ", "");

async function getUser(req) {
  const token = getToken(req);
  if (!token) {
    const error = new Error("A token must be provided");
    error.status = 401;
    throw error;
  }
  let userId;
  try {
    userId = atob(token);
  } catch (e) {
    const error = new Error("Invalid token. Please login again.");
    error.status = 401;
    throw error;
  }
  const user = await usersDB.read(userId);
  return user;
}

export { handlers };
