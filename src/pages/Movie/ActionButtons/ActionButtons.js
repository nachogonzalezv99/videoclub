import { ToggleButton } from "components/ToggleButton";
import {
  useCreateListItem,
  useListItem,
  useRemoveListItem,
  useUpdateOptimisticListItem,
} from "hooks/list-items";
import {
  BsCheckLg,
  BsFillBookmarkFill,
  BsHandThumbsDownFill,
  BsHandThumbsUpFill,
} from "react-icons/bs";
import style from "./ActionButtons.module.scss";

function ActionButtons({ movieId }) {
  const { listItem } = useListItem(movieId);
  const { mutateAsync: create } = useCreateListItem();
  const { mutateAsync: remove } = useRemoveListItem();
  const { mutateAsync: update } = useUpdateOptimisticListItem();

  return (
    <div className={style.actions}>
      <ToggleButton
        on={listItem}
        label="Watchlist"
        className={style.actions__btn}
        onAction={() => remove({ id: listItem.id })}
        offAction={() => create({ movieId })}
      >
        <BsFillBookmarkFill />
      </ToggleButton>
      {listItem && (
        <ToggleButton
          on={Boolean(listItem?.finishDate)}
          label="Watched"
          isOptimistic={true}
          className={style.actions__btn}
          onAction={() => update({ id: listItem.id, finishDate: null })}
          offAction={() => update({ id: listItem.id, finishDate: new Date() })}
        >
          <BsCheckLg />
        </ToggleButton>
      )}
      {Boolean(listItem?.finishDate) && (
        <ToggleButton
          on={Boolean(listItem?.rating === "like")}
          label="Like"
          isOptimistic={true}
          className={style.actions__btn}
          onAction={() => update({ id: listItem.id, rating: "none" })}
          offAction={() => update({ id: listItem.id, rating: "like" })}
        >
          <BsHandThumbsUpFill />
        </ToggleButton>
      )}
      {Boolean(listItem?.finishDate) && (
        <ToggleButton
          on={Boolean(listItem?.rating === "dislike")}
          label="Dislike"
          className={style.actions__btn}
          isOptimistic={true}
          onAction={() => update({ id: listItem.id, rating: "none" })}
          offAction={() => update({ id: listItem.id, rating: "dislike" })}
        >
          <BsHandThumbsDownFill />
        </ToggleButton>
      )}
    </div>
  );
}
export { ActionButtons };
