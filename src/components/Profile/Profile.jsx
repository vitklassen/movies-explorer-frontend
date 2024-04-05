import FormContainer from "../FormContainer/FormContainer";
import Header from "../Header/Header";
import ProfileForm from "../ProfileForm/ProfileForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
const Profile = ({ loggedIn, onSubmit, isSending, onSignOut, profileEditError, profileEditStateError }) => {
  //хук управления и валидации формы
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);
  //проверка на одинаковые данные
  const [isSameDataError, setSameDataError] = useState(true);
  //сабмит формы
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email } = values;
    onSubmit(name, email);
    resetForm(currentUser, {}, true);
  };
  //инициализация начальных данных
  useEffect(() => {
    if(currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);
  //проверка изменения данных пользователя
  useEffect(() => {
    if((values.name === currentUser.name && values.email === currentUser.email)) {
      setSameDataError(true);
    }
    else setSameDataError(false);
  }, [values, currentUser]);
  return (
    <>
      <Header color={false} loggedIn={loggedIn} />
      <FormContainer title={`Привет, ${currentUser.name}`} profileType={true}>
        <ProfileForm
          onSubmit={handleSubmit}
          isDisabled={!isValid || isSending || isSameDataError}
          onSignOut={onSignOut}
          buttonText={isSending ? "Редактирование...":  "Редактировать"}
          error={profileEditError}
          stateError={profileEditStateError}
        >
          <div className="profile-form__content">
            <fieldset className="profile-form__fieldset">
              <div className="profile-form__block">
                <label className="profile-form__label" htmlFor="name">
                  Имя
                </label>
                <input
                  className="profile-form__input"
                  id="name"
                  name="name"
                  type="text"
                  required
                  pattern="[a-zA-zа-яА-Я -]{2,30}$"
                  value={values.name || ""}
                  onChange={handleChange}
                ></input>
              </div>
              <span
                className={`profile-form__error profile-form__error_type_validation ${
                  errors.name === "" || errors.name === undefined
                    ? ""
                    : "profile-form__error_active"
                }`}
              >
                {errors.name || "no-error"}
              </span>
            </fieldset>
            <fieldset className="profile-form__fieldset">
              <div className="profile-form__block">
                <label className="profile-form__label" htmlFor="email">
                  Email
                </label>
                <input
                  className="profile-form__input"
                  id="name"
                  name="email"
                  type="email"
                  required
                  pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
                  value={values.email || ""}
                  onChange={handleChange}
                ></input>
              </div>
              <span
                className={`profile-form__error profile-form__error_type_validation ${
                  errors.email === "" || errors.email === undefined
                    ? ""
                    : "profile-form__error_active"
                }`}
              >
                {errors.email || "no-error"}
              </span>
            </fieldset>
          </div>
        </ProfileForm>
      </FormContainer>
    </>
  );
};
export default Profile;
