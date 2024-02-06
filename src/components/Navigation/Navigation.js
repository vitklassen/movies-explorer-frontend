import profileColorGreen from "../../images/Header/header__profile-button.svg";
import profileColorGray from "../../images/Header/header__profile-button_color_gray.svg";
import { NavLink, Link } from "react-router-dom";

function Navigation(props) {
  return (
    <>
      <nav className="navigation">
        {props.loggedIn ? (
          <>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `navigation__link navigation__link_to_movie ${
                  isActive ? "navigation__link_active" : ""
                }`
              }
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className={({ isActive }) =>
                `navigation__link navigation__link_to_saved-movie ${
                  isActive ? "navigation__link_active" : ""
                }`
              }
            >
              Сохранённые фильмы
            </NavLink>
            <Link
              className="navigation__link navigation__link_to_profile"
              to="/profile"
            >
              <img
                className="navigation__profile-button"
                src={props.color ? profileColorGreen: profileColorGray}
                alt="Аккаунт"
              ></img>
            </Link>
            <button
              className={`navigation__button ${
                props.color ? "navigation__button_color_green" : ""
              }`}
            onClick={props.handler}></button>
          </>
        ) : (
          <>
            <NavLink
              to="/signup"
              className="navigation__link navigation__link_to_register"
            >
              Регистрация
            </NavLink>
            <NavLink
              to="/signin"
              className="navigation__link navigation__link_to_login"
            >
              Войти
            </NavLink>
          </>
        )}
      </nav>
    </>
  );
}
export default Navigation;
