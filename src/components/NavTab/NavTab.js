import profileColorGreen from "../../images/Header/header__profile-button.svg";
import profileColorGray from "../../images/Header/header__profile-button_color_gray.svg";
import { NavLink, Link } from "react-router-dom";

function NavTab(props) {
  return (
    <div className={`menu ${props.isOpen ? "menu_open" : ""}`}>
      <div className="menu__content">
        <nav className="menu__links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `menu__link ${isActive ? "menu__link_active" : ""}`
            }
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `menu__link ${isActive ? "menu__link_active" : ""}`
            }
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={({ isActive }) =>
              `menu__link ${isActive ? "menu__link_active" : ""}`
            }
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link to="/profile" className="menu__profile">
          <img
            className="menu__profile-button"
            src={props.color ? profileColorGreen : profileColorGray}
            alt="Аккаунт"
          ></img>
        </Link>
        <button className="menu__button-close" onClick={props.handler}></button>
      </div>
    </div>
  );
}
export default NavTab;
