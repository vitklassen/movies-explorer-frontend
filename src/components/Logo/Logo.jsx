import { NavLink } from "react-router-dom";
import logoPath from "../../images/Header/header__logo.svg";
function Logo({form}) {
  return (
    <NavLink className={`logo ${form ? 'logo_place_form': ''}`} to="/">
      <img className="logo__image" src={logoPath} alt="Лого"></img>
    </NavLink>
  );
}
export default Logo;