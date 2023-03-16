import { Link } from "react-router-dom";
import { publicRoutes } from "utils/routes";
import style from "./NotFound.module.scss";
function NotFound() {
  return (
    <div className={style.notFound}>
      <h1 className={style.notFound__title}>404</h1>
      <h3 className={style.notFound__subtitle}>Whooops!</h3>
      <p className={style.notFound__text}>
        We couldn't find the site you were looking for
      </p>
      <Link to={publicRoutes.LOGIN} className={style.notFound__btn}>
        Go home
      </Link>
    </div>
  );
}
export { NotFound };
