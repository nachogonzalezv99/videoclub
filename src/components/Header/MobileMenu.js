import { useState } from "react";
import { BsX, BsList } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { menuRoutes } from "utils/routes";
import style from "./MobileMenu.module.scss";
function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <nav className={style.mobileNav}>
      <button className={style.mobileNav__hamburguer} onClick={handleClick}>
        <BsList />
      </button>
      {isOpen && (
        <div className={style.mobileNav__content}>
          <button onClick={handleClick} className={style.mobileNav__close}>
            <BsX />
          </button>
          {menuRoutes.map((route, i) => (
            <NavLink
              key={i}
              to={route.link}
              onClick={() => setIsOpen(false)}
              className={style.mobileNav__link}
              style={({ isActive }) => ({
                ...(isActive ? { color: "white" } : null),
              })}
            >
              {route.text}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
export { MobileMenu };
