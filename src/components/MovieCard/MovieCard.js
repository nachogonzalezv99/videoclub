import { ToggleButton } from "components/ToggleButton";
import {
  useCreateListItem,
  useListItem,
  useRemoveListItem,
  useUpdateListItem,
} from "hooks/list-items";
import { BsCheckLg, BsFillBookmarkFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { privateRoutes } from "utils/routes";
import style from "./MovieCard.module.scss";

function MovieCard({ movie }) {
  const { listItem } = useListItem(movie.id);
  const { mutateAsync: create } = useCreateListItem();
  const { mutateAsync: remove } = useRemoveListItem();
  const { mutateAsync: update } = useUpdateListItem();

  return (
    <Link to={`${privateRoutes.DISCOVER}/${movie.id}`} className={style.card}>
      <article>
        <img src={movie.url} alt="brooklin" className={style.card__img} />
        <footer className={style.card__footer}>
          <ToggleButton
            on={listItem}
            label="Watchlist"
            className={style.card__btn}
            onAction={() => remove({ id: listItem.id })}
            offAction={() => create({ movieId: movie.id })}
          >
            <BsFillBookmarkFill />
          </ToggleButton>

          {listItem && (
            <ToggleButton
              on={Boolean(listItem?.finishDate)}
              label="Watched"
              className={style.card__btn}
              onAction={() => update({ id: listItem.id, finishDate: null })}
              offAction={() =>
                update({ id: listItem.id, finishDate: new Date() })
              }
            >
              <BsCheckLg />
            </ToggleButton>
          )}
        </footer>
      </article>
    </Link>
  );
}
export { MovieCard };
