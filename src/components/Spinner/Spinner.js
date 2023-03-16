import style from "./Spinner.module.scss";
function Spinner({ className, ...props }) {
  return (
    <div className={style.spinner + " " + className} {...props}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
export { Spinner };
