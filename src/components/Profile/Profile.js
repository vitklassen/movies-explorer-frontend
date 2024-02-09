import { NavLink } from "react-router-dom";
import Header from "../Header/Header";
function Profile(props) {
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
            onSubmit={props.onSubmit}
          >
            <div className="profile__form-row">
              <label className="profile__form-label" htmlFor="name">
                Имя
              </label>
              <input
                className="profile__form-input"
                name="name"
                id="name"
                value={props.name}
                onChange={props.onChange}
              ></input>
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
                value={props.email}
                onChange={props.onChange}
              ></input>
            </div>
            <div className="profile__buttons">
              <button className="profile__button">Редактировать</button>
              <NavLink className="profile__signout-link" to="/">
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
