import Logo from "../Logo/Logo";
const { Link } = require("react-router-dom");

function Form(props) {
  return (
    <main className="formcontainer">
      <div className="formcontainer__content">
        <Logo form={true} />
        <h1 className="formcontainer__title">{props.title}</h1>
        <form
          className="formcontainer__form"
          name="form"
          method="post"
          onSubmit={props.onSubmit}
        >
            {props.children}
            <label className="formcontainer__label" for="email">
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
            <label className="formcontainer__label" for="password">
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
            <span className="formcontainer__span formcontainer__span_type_error">
              {props.error || 1}
            </span>
          <div className={`formcontainer__footer ${props.login ? 'formcontainer__footer_type_login' : ''}`}>
            <button
              className="formcontainer__button"
              type="submit"
              onSubmit={props.onSubmit}
            >
              {props.buttonText}
            </button>
            <Link className="formcontainer__description" to={props.path}>
              {props.text}
              <span className="formcontainer__link">{props.link}</span>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
export default Form;
