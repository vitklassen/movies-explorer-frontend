import { NavLink, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { useFormWithValidation } from "../../utils/useFormWithValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useEffect, useState } from "react";
import {
  emailValidation,
  nameValidation,
} from "../../utils/validationConstants";
function Profile(props) {
  const [isChange, setChange] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const {values, setValues, errors, isValid, handleChange} = useFormWithValidation();
  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
  }, [setValues, currentUser.name, currentUser.email]);
  function handleSubmit() {
    const { name, email } = input.values;
  }
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="profile">
        <section className="profile__content">
          <h1 className="profile__title">Привет, Виталий!</h1>
          <form
            className="profile__form"
            name="profile-form"
            method="post"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="profile__form-row">
              <label className="profile__form-label" htmlFor="name">
                Имя
              </label>
              <input
                className="profile__form-input"
                name="name"
                id="name"
                value={values.name || ""}
                onChange={handleChange}
                pattern={nameValidation}
              ></input>
              <span className="profile__error-validation">{errors.name}</span>
            </div>
            <div className="profile__form-row">
              <label className="profile__form-label" htmlFor="email">
                E-mail
              </label>
              <input
                className="profile__form-input"
                type="email"
                name="email"
                required
                id="email"
                pattern={emailValidation}
                value={values.email || ""}
                onChange={handleChange}
              ></input>
              <span className="profile__error-validation">{errors.email}</span>
            </div>
            <div className="profile__buttons">
              <button className="profile__button" disabled={!isValid}>
                Редактировать
              </button>
              <NavLink
                className="profile__signout-link"
                to="/"
                onClick={props.onSignOut}
              >
                Выйти из аккаунта
              </NavLink>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Profile;
