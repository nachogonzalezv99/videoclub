import * as moviesDB from "./movies";

const listItemsKey = "__videoclub_list_items__";
let listItems = {};
const persist = () =>
  window.localStorage.setItem(listItemsKey, JSON.stringify(listItems));
const load = () =>
  Object.assign(
    listItems,
    JSON.parse(window.localStorage.getItem(listItemsKey))
  );

// initialize
try {
  load();
} catch (error) {
  persist();
  // ignore json parse error
}

window.__videoclub = window.__videoclub || {};
window.__videoclub.purgeListItems = () => {
  Object.keys(listItems).forEach((key) => {
    delete listItems[key];
  });
  persist();
};

async function create({
  movieId = required("movieId"),
  ownerId = required("ownerId"),
  rating = "none",
  notes = "",
  startDate = Date.now(),
  finishDate = null,
}) {
  const id = hash(`${movieId}${ownerId}`);
  if (listItems[id]) {
    const error = new Error(
      `This user cannot create new list item for that movie`
    );
    error.status = 400;
    throw error;
  }
  const movie = await moviesDB.read(movieId);
  if (!movie) {
    const error = new Error(`No movie found with the ID of ${movieId}`);
    error.status = 400;
    throw error;
  }
  listItems[id] = {
    id,
    movieId,
    ownerId,
    rating,
    notes,
    finishDate,
    startDate,
  };
  persist();
  return read(id);
}

async function update(id, updates) {
  validateListItem(id);
  Object.assign(listItems[id], updates);
  persist();
  return read(id);
}

// this would be called `delete` except that's a reserved word in JS :-(
async function remove(id) {
  validateListItem(id);
  delete listItems[id];
  persist();
}

async function authorize(userId, listItemId) {
  const listItem = await read(listItemId);
  if (listItem.ownerId !== userId) {
    const error = new Error("User is not authorized to view that list");
    error.status = 403;
    throw error;
  }
}
async function read(id) {
  validateListItem(id);
  return listItems[id];
}

async function readByOwner(userId) {
  return Object.values(listItems).filter((li) => li.ownerId === userId);
}

function validateListItem(id) {
  load();
  if (!listItems[id]) {
    const error = new Error(`No list item with the id "${id}"`);
    error.status = 404;
    throw error;
  }
}

function hash(str) {
  var hash = 5381,
    i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return String(hash >>> 0);
}

function required(key) {
  const error = new Error(`${key} is required`);
  error.status = 400;
  throw error;
}

export { create, readByOwner, authorize, update, remove };
