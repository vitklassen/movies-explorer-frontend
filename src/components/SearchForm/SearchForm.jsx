import { useEffect, useRef, useContext } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { useLocation } from "react-router-dom";
function SearchForm({
  onSubmit,
  isCheckBox,
  handleClickCheckbox,
}) {
  // данные текущего пользователя
  const currentUser = useContext(CurrentUserContext);
  //текущая локация 
  const currentLocation = useLocation();
  //хук для доступа к input
  const movie = useRef();
  //функция сабмита формы
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(movie.current.value);
  };
  //инициализация начальных данных
  useEffect(() => {
    if(localStorage.getItem('currentMovieName') && currentLocation.pathname === '/movies') {
      movie.current.value = localStorage.getItem('currentMovieName');
    }
  }, [currentUser]);
  return (
    <form
      className="movie-form"
      noValidate
      name="movies"
      method="get"
      onSubmit={handleSubmit}
    >
      <fieldset className="movie-form__fieldset">
        <input
          className="movie-form__input"
          type="text"
          id="movieName"
          name="movie"
          placeholder="Фильм"
          maxLength={"40"}
          required
          ref={movie}
        ></input>
        <button
          className="movie-form__button"
          type="submit"
          onSubmit={onSubmit}
        >
          Поиск
        </button>
      </fieldset>
      <FilterCheckbox
        isCheckBox={isCheckBox}
        handleClickCheckBox={handleClickCheckbox}
      />
    </form>
  );
}
export default SearchForm;
