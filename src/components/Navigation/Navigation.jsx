import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const makeActive = ({ isActive }) => {
  return clsx(css.page, isActive && css.isActive);
};

export default function Navigation() { 

    return (
            <nav className={css.nav}>
                <NavLink to="/" className={makeActive}>Home</NavLink>
                <NavLink to="/movies" className={makeActive}>Movies</NavLink>
            </nav>
       
    )
}