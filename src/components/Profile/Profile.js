import Header from "../Header/Header";
function Profile(props) {
  return(
  <>
    <Header loggedIn={props.loggedIn} />
    <section className="profile">
      <div className="profile__content">
        <h2 className="profile__title">Привет, Виталий!</h2>
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
            <button className="profile__button">Выйти из аккаунта</button>
          </div>
        </form>
      </div>
    </section>
  </>
  );
}

export default Profile;
