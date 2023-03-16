import { SkeletonContainer } from "components/SkeletonContainer/SkeletonContainer";
import { ActionButtons } from "pages/Movie/ActionButtons/ActionButtons";

import { useMovie } from "hooks/movies";
import { useParams } from "react-router-dom";
import style from "./Movie.module.scss";
import { NotesTextarea } from "./NotesTextarea/NotesTextarea";
import { useListItem } from "hooks/list-items";
import { Container, Stack, Tag, Typography } from "components";

function Movie() {
  const { movieId } = useParams();
  const { movie, isLoading } = useMovie(movieId);
  const { listItem } = useListItem(movieId);
  return (
    <Container className={style.movie}>
      <div className={style.cover}>
        <SkeletonContainer isLoading={isLoading} height="100%" widt="100%">
          <img src={movie?.url} alt="brrokling" className={style.cover__img} />
        </SkeletonContainer>
      </div>

      <div className={style.content}>
        <Typography component="h1" isLoading={isLoading}>
          {movie?.title}
        </Typography>

        <SkeletonContainer
          isLoading={isLoading}
          height="40px"
          style={{ marginBottom: "20px" }}
        >
          <Stack style={{ marginBottom: "20px" }}>
            <Tag>
              <Typography variant="pLg">{movie?.genre}</Typography>
            </Tag>
            <Typography variant="pLg">{movie?.director}</Typography>
            <Typography variant="pLg">{movie?.release}</Typography>
          </Stack>
        </SkeletonContainer>

        <Typography isSecondary isLoading={isLoading} count={6}>
          {movie?.description}
        </Typography>

        <ActionButtons movieId={movieId} />

        {listItem && (
          <SkeletonContainer isLoading={isLoading} height="200px">
            <NotesTextarea movieId={movieId} />
          </SkeletonContainer>
        )}
      </div>
    </Container>
  );
}
export { Movie };
