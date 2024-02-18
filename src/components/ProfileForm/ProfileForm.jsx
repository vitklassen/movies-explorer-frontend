import { Link } from "react-router-dom";
const ProfileForm = ({
  onSubmit,
  isDisabled,
  children,
  onSignOut,
  error,
  stateError,
  buttonText,
}) => {
  return (
    <form
      className="profile-form"
      noValidate
      name="profile-form"
      method="post"
      autoComplete="off"
      onSubmit={onSubmit}
    >
      {children}
      <div className="profile-form__footer">
        <span
          className={`profile-form__error profile-form__error_type_request ${
            stateError ? "profile-form__error_active" : ""
          }`}
        >
          {error}
        </span>
        <button
          className={`profile-form__button profile-form__button_type_edit`}
          type="submit"
          disabled={isDisabled}
          onSubmit={onSubmit}
        >
          {buttonText}
        </button>
        <button
          className="profile-form__button profile-form__button_type_sign-out"
          type="button"
          onClick={onSignOut}
        >
          <Link to="/" className="profile-form__link">
            Выйти из аккаунта
          </Link>
        </button>
      </div>
    </form>
  );
};
export default ProfileForm;
