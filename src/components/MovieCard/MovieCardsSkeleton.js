import style from "./MovieCard.module.scss";

function MovieCardsSkeleton({ num = 10 }) {
  return Array(num)
    .fill()
    .map((movie, index) => (
      <div key={index} className={style.card__skeleton}></div>
    ));
}
export { MovieCardsSkeleton };
