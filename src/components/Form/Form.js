import Logo from "../Logo/Logo";
import { useFormWithValidation } from "../../utils/useFormWithValidation";
import { emailValidation, nameValidation } from "../../utils/validationConstants";
const { Link } = require("react-router-dom");
function Form(props) {
  const input = useFormWithValidation();
  const { name, email, password } = input.errors;
  const validation = input.isValid;
  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = input.values;
    if(props.register) {
      props.onSubmit({name, email, password});
    }
    else {
      props.onSubmit({email, password});
    }
    input.resetForm();
  }
  return (
    <main className="formcontainer">
      <div className="formcontainer__content">
        <Logo form={true} />
        <h1 className="formcontainer__title">{props.title}</h1>
        <form
          className="formcontainer__form"
          name="form"
          method="post"
          onSubmit={handleSubmit}
          noValidate
        >
          {props.register && (
            <>
              <label className="formcontainer__label">
                Имя
                <input
                  className="formcontainer__input"
                  name="name"
                  required
                  id="name"
                  type="text"
                  minLength="2"
                  maxLength="30"
                  pattern={nameValidation}
                  onChange={input.handleChange}
                  value={input.values.name || ""}
                ></input>
              </label>
              <span
                className={'formcontainer__error-validation'}
              >
                {name}
              </span>
            </>
          )}
          <label className="formcontainer__label" for="email">
            E-mail
            <input
              className="formcontainer__input"
              type="email"
              name="email"
              required
              autoComplete="off"
              id="email"
              pattern={emailValidation}
              onChange={input.handleChange}
              value={input.values.email || ""}
            ></input>
          </label>
          <span
            className={'formcontainer__error-validation'}
          >
            {email}
          </span>
          <label className="formcontainer__label" for="password">
            Пароль
            <input
              className="formcontainer__input"
              type="password"
              name="password"
              required
              autoComplete="off"
              id="password"
              onChange={input.handleChange}
              value={input.values.password || ""}
            ></input>
          </label>
          <span
            className={'formcontainer__error-validation'}
          >
            {password}
          </span>
          <div
            className={`formcontainer__footer ${
              props.login ? "formcontainer__footer_type_login" : ""
            }`}
          >
            <p className={`formcontainer__submit-error ${props.stateError ? 'formcontainer__submit-error_active' : ''}`}>{props.stateError ? props.error: '1'}</p>
            <button
              className="formcontainer__button"
              type="submit"
              onSubmit={handleSubmit}
              disabled={!validation}
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
