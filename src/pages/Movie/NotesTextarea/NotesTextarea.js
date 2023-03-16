import { TextField } from "components";
import { Spinner } from "components/Spinner/Spinner";
import { useListItem, useUpdateListItem } from "hooks/list-items";
import { useMemo } from "react";
import { BsXLg } from "react-icons/bs";
import { debounce } from "utils/utils";
import style from "../Movie.module.scss";

function NotesTextarea({ movieId }) {
  const { listItem } = useListItem(movieId);
  const { mutate: update, error, isLoading, isError } = useUpdateListItem();

  const debouncedMutate = useMemo(
    () => debounce(update, { wait: 300 }),
    [update]
  );

  const handleNotesChange = (e) => {
    debouncedMutate({ id: listItem.id, notes: e.target.value });
  };
  return (
    <div style={{ position: "relative" }}>
      {isLoading ? (
        <Spinner className={style.loading} />
      ) : isError ? (
        <BsXLg className={style.errorIcon} />
      ) : null}
      <TextField
        id="notes"
        label="Notes"
        defaultValue={listItem?.notes}
        textarea
        onChange={handleNotesChange}
        error={error}
      />
    </div>
  );
}
export { NotesTextarea };
