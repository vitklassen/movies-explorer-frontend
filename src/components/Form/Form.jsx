import { Link } from "react-router-dom";
const Form = ({
  name,
  children,
  onSubmit,
  buttonText,
  isDisabled,
  linkText,
  path,
  question,
  error,
  stateError,
}) => {
  return (
    <form
      className="form"
      noValidate
      method="post"
      name={name}
      autoComplete="off"
      onSubmit={onSubmit}
    >
      {children}
      <div className="form__footer">
        <span
          className={`form__error form__error_type_request ${
            stateError ? "form__error_active" : ""
          }`}
        >
          {error}
        </span>
        <button
          className="form__submit-button"
          type="submit"
          onSubmit={onSubmit}
          disabled={isDisabled}
        >
          {buttonText}
        </button>
        <Link to={path} className="form__text">
          {question}
          <span className="form__link">{linkText}</span>
        </Link>
      </div>
    </form>
  );
};
export default Form;
