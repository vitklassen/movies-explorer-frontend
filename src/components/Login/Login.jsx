import FormContainer from "../FormContainer/FormContainer";
import Form from "../Form/Form";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
const Login = ({ onSubmit, loginError, loginStateError, isSending }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
    const handleSubmit = (e) => {
      e.preventDefault();
      const {email, password} = values;
      onSubmit(email, password);
      resetForm();
    }
  return (
    <FormContainer title="Рады видеть!">
      <Form
        type="login"
        name="login"
        onSubmit={handleSubmit}
        buttonText={isSending ? "Вход..." : "Войти"}
        question="Ещё не зарегистрированы? "
        linkText="Регистрация"
        path="/sign-up"
        error={loginError}
        stateError={loginStateError}
        isDisabled={!isValid || isSending}
      >
        <div className="form__content form__content_type_login">
          <fieldset className="form__fieldset">
            <label className="form__label" for="email">
              E-mail
            </label>
            <input
              className="form__input"
              id="email"
              type="email"
              name="email"
              placeholder="Введите E-mail"
              required
              pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
              value={values.email || ""}
              onChange={handleChange}
            ></input>
            <span
              className={`form__error form__error_type_validation ${
                errors.email === "" || errors.email === undefined
                  ? ""
                  : "form__error_active"
              }`}
            >
              {errors.email || "no-error"}
            </span>
          </fieldset>
          <fieldset className="form__fieldset">
            <label className="form__label" for="password">
              Пароль
            </label>
            <input
              className="form__input"
              id="password"
              type="password"
              name="password"
              placeholder="Введите пароль"
              required
              minLength="2"
              maxLength="30"
              value={values.password || ""}
              onChange={handleChange}
            ></input>
            <span
              className={`form__error form__error_type_validation ${
                errors.password === "" || errors.password === undefined
                  ? ""
                  : "form__error_active"
              }`}
            >
              {errors.password || "no-error"}
            </span>
          </fieldset>
        </div>
      </Form>
    </FormContainer>
  );
};
export default Login;
