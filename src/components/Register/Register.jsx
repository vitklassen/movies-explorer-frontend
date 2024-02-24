import FormContainer from "../FormContainer/FormContainer";
import Form from "../Form/Form";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
const Register = ({
  onSubmit,
  registerError,
  registerStateError,
  isSending,
}) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  const handleSubmit = (e) => {
    e.preventDefault();
    const {name, email, password} = values;
    onSubmit(name, email, password);
    resetForm();
  }
  return (
    <FormContainer title="Добро пожаловать!">
      <Form
        type="register"
        name="register"
        onSubmit={handleSubmit}
        buttonText={isSending ? "Регистрация..." : "Зарегистрироваться"}
        question="Уже зарегистрированы? "
        linkText="Войти"
        path="/sign-in"
        error={registerError}
        stateError={registerStateError}
        isDisabled={!isValid || isSending}
      >
        <div className="form__content form__content_type_register">
          <fieldset className="form__fieldset">
            <label className="form__label" htmlFor="name">
              Имя
            </label>
            <input
              className="form__input"
              id="name"
              type="text"
              name="name"
              placeholder="Введите имя"
              required
              pattern="[a-zA-zа-яА-Я -]{2,30}$"
              value={values.name || ""}
              onChange={handleChange}
            ></input>
            <span
              className={`form__error form__error_type_validation ${
                errors.name === "" || errors.name === undefined
                  ? ""
                  : "form__error_active"
              }`}
            >
              {errors.name || "no-error"}
            </span>
          </fieldset>
          <fieldset className="form__fieldset">
            <label className="form__label" htmlFor="email">
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
            <label className="form__label" htmlFor="password">
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
export default Register;
