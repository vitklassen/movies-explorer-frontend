import logoPath from '../../images/Header/header__logo.svg';
import { NavLink } from "react-router-dom";
const { Link } = require("react-router-dom");

function Form(props) {
  return (
    <div className="formcontainer">
      <NavLink className="header__main-link" to="/">
        <img className="header__logo" src={logoPath}></img>
      </NavLink>
      <h2 className="formcontainer__title">{props.title}</h2>
      <form
        className="formcontainer__form"
        name="form"
        method="post"
        onSubmit={props.onSubmit}
      >
        {props.children}
        <label className="formcontainer__label">
          <span className="formcontainer__span">E-mail</span>
          <input
            className="formcontainer__input"
            type="email"
            name="email"
            required
            id="email"
            value={props.email}
            onChange={props.onChange}
          ></input>
        </label>
        <label className="formcontainer__label">
          <span className="formcontainer__span">Пароль</span>
          <input
            className="formcontainer__input"
            type="password"
            name="password"
            required
            id="password"
            value={props.password}
            onChange={props.onChange}
          ></input>
        </label>
        <span className='formcontainer__span formcontainer__span_type_error'>{props.error || 1}</span>
        <button className="formcontainer__button" type="submit" onSubmit={props.onSubmit}>
            {props.buttonText}
        </button>
        <Link className="formcontainer__description" to={props.path}>
            {props.text}<span className="formcontainer__link">{props.link}</span>
        </Link>
      </form>
    </div>
  );
}
export default Form;