import { Link } from "react-router-dom";

const ProfileForm = ({ onSubmit, isDisabled, children, onSignOut, onEdit, isEdit }) => {
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
      {isEdit ? (
        <div className="profile-form__footer">
          <button
            className="profile-form__edit-button"
            type="button"
            onClick={onEdit}
          >
            Редактировать
          </button>
          <button
            className="profile-form__sign-out-button"
            type="button"
            onClick={onSignOut}
          >
            <Link to="/">Выйти из аккаунта</Link>
          </button>
        </div>
      ) : (
        <button
          className="profile-form__save-button"
          type="submit"
          onSubmit={onSubmit}
          disabled={isDisabled}
        >
          Сохранить
        </button>
      )}
    </form>
  );
};
export default ProfileForm;
