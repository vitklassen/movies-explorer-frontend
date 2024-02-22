import { useEffect, useRef, useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.jsx";
function SearchForm({
  onSubmit,
  isCheckBox,
  handleClickCheckBox,
  currentMovieName
}) {
  //хук для доступа к input
  const movie = useRef();
  //функция сабмита формы
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(movie.current.value);
  };
  //инициализация начальных данных
  useEffect(() => {
    movie.current.value = currentMovieName;
  }, [currentMovieName]);
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
        handleClickCheckBox={handleClickCheckBox}
      />
    </form>
  );
}
export default SearchForm;
