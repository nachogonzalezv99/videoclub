import style from "./FullPageSpinner.module.scss";
function FullPageSpinner() {
  return (
    <div className={style.spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
export { FullPageSpinner };
