import { MovieCard } from "components/MovieCard/MovieCard";
import { MovieCardsSkeleton } from "components/MovieCard/MovieCardsSkeleton";
import { useListItems } from "hooks/list-items";
function Finished() {
  const { listItems, isError, isLoading, isSuccess, error } = useListItems();
  const filteredItems = listItems?.filter((li) => Boolean(li.finishDate)) ?? [];

  return (
    <div className="container section">
      {/*  <div className={style.header}>
        <h1>Finished</h1>
      </div> */}

      <section className="grid">
        {isLoading ? (
          <MovieCardsSkeleton num={10} />
        ) : isError ? (
          <p>Error: {error.message}</p>
        ) : isSuccess ? (
          filteredItems.length ? (
            filteredItems.map(({ movie }) => (
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
export { Finished };
