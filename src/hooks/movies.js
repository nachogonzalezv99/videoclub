import { useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "utils/client";

function useMovie(movieId) {
  const results = useQuery({
    queryKey: ["movie", { movieId }],
    queryFn: () =>
      client(`movie/${movieId}`).then((data) => {
        return {
          id: data.movie._id,
          url: data.movie.ImageURL,
          title: data.movie.Title,
          director: data.movie.Director.Name,
          genre: data.movie.Genre.Name,
          description: data.movie.Description,
          release: data.movie.Release,
        };
      }),
  });

  return { ...results, movie: results.data };
}

function useMovieSearch(query) {
  const queryClient = useQueryClient();
  const results = useQuery({
    queryKey: ["movieSearch", { query }],
    queryFn: () =>
      client(`movies?query=${query}`).then((data) =>
        data.movies.map((movie) => {
          return {
            id: movie._id,
            url: movie.ImageURL,
            title: movie.Title,
            director: movie.Director.Name,
            genre: movie.Genre.Name,
            description: movie.Description,
            release: movie.Release,
          };
        })
      ),

    onSuccess: (movies) => {
      for (const movie of movies) setQueryDataForMovie(queryClient, movie);
    },
  });
  return { ...results, movies: results.data };
}

function setQueryDataForMovie(queryClient, movie) {
  queryClient.setQueryData(["movie", { movieId: movie.id }], movie);
}

export { useMovie, useMovieSearch, setQueryDataForMovie };
