import logoPath from "../../images/Header/header__logo.svg";
import profilePath from "../../images/Header/header__profile-button.svg"
import { NavLink } from "react-router-dom";
function Header(props) {
  return (
    <header className={`header ${props.color ? "header_color_green" : ""}`}>
      <NavLink className="header__main-link" to="/">
        <img className="header__logo" src={logoPath}></img>
      </NavLink>
      <nav className="header__navigation">
        {props.loggedIn ? (
          <>
            <NavLink
              to="/movies"
              className={({isActive}) => `header__link header__link_to_movie ${isActive ? "header__link_active" : ""}`}
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className={({isActive}) => `header__link header__link_to_saved-movie ${isActive ? "header__link_active" : ""}`}
            >
              Сохранённые фильмы
            </NavLink>
            <NavLink className="header__link header__link_to_profile" to="/profile">
              <img className="header__profile-button" src={profilePath}></img>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/signup"
              className="header__link header__link_to_register"
            >
              Регистрация
            </NavLink>
            <NavLink
              to="/signin"
              className="header__link header__link_to_login"
            >
              Войти
            </NavLink>
          </>
        )}
      </nav>
      <button className='header__button-navigate'></button>
    </header>
  );
}
export default Header;
