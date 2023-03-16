import moviesData from "./movies-data.json";

let movies = [...moviesData];

async function create(movie) {
  movies.push(movie);
  return movie;
}

async function read(movieId) {
  return movies.find((movie) => movie._id === movieId);
}

async function getAll() {
  return movies;
}

async function query(search) {
  return (
    movies.filter((movie) =>
      movie.Title.toLowerCase().includes(search.toLowerCase())
    ) || []
  );
}

async function reset() {
  movies = [...moviesData];
}

export { create, query, read, getAll, reset };
