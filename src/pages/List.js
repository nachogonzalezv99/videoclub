import { MovieCard } from "components/MovieCard/MovieCard";
import { MovieCardsSkeleton } from "components/MovieCard/MovieCardsSkeleton";
import { useListItems } from "hooks/list-items";

function List() {
  const { listItems, isError, isLoading, isSuccess, error } = useListItems();
  return (
    <div className="container section">
      {/*  <div className={style.header}>
        <h1>Watchlist</h1>
      </div> */}

      <section className="grid">
        {isLoading ? (
          <MovieCardsSkeleton num={10} />
        ) : isError ? (
          <p>Error: {error.message}</p>
        ) : isSuccess ? (
          listItems.length ? (
            listItems.map(({ movie }) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p>No movies found</p>
          )
        ) : null}
      </section>
    </div>
  );
}
export { List };
