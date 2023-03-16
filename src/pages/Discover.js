import {
  Button,
  Container,
  Grid,
  Group,
  Stack,
  TextField,
  Typography,
} from "components";
import { ErrorMessage } from "components/Error/ErrorMessage";
import { MovieCard } from "components/MovieCard/MovieCard";
import { MovieCardsSkeleton } from "components/MovieCard/MovieCardsSkeleton";
import { useMovieSearch } from "hooks/movies";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

function Discover() {
  const [query, setQuery] = useState("");

  const { movies, error, isLoading, isError, isSuccess } =
    useMovieSearch(query);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(e.target.elements.search.value);
  };

  return (
    <Container>
      <Stack justifyContent="space-between">
        <Typography component="h1">Discover</Typography>
        <Group as="form" onSubmit={handleSubmit}>
          <TextField id="search" label="Search" />
          <Button isLoading={isLoading} isSquared>
            <BsSearch />
          </Button>
        </Group>
      </Stack>
      <Grid>
        {isLoading ? (
          <MovieCardsSkeleton num={10} />
        ) : isError ? (
          <ErrorMessage error={error.message} />
        ) : isSuccess ? (
          movies.length ? (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <p>No movies found</p>
          )
        ) : null}
      </Grid>
    </Container>
  );
}
export { Discover };
