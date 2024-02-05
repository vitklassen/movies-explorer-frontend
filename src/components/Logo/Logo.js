import { NavLink } from "react-router-dom";
import logoPath from "../../images/Header/header__logo.svg";
function Logo(props) {
  return (
    <NavLink className={`logo ${props.form ? 'logo_place_form': ''}`} to="/">
      <img className="logo__image" src={logoPath} alt="Лого"></img>
    </NavLink>
  );
}
export default Logo;