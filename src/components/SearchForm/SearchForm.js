import { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";
function SearchForm(props) {
  const [error, setError] = useState('');
  function handleChange(e) {
    props.handleChangeMovieName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (props.movieName === '' || props.movieName === undefined) {
      setError('Нужно ввести ключевое слово');
      return
    }
    setError('');
    props.onSubmit();
  }
  return (
    <form className="form" noValidate name="movies" method="get" onSubmit={handleSubmit}>
      <div className="form__search">
        <input
          className="form__input"
          type="text"
          id="movieName"
          name="movie"
          placeholder="Фильм"
          maxLength={"40"}
          required
          value={props.movieName || ""}
          onChange={handleChange}
        ></input>
        <button className="form__button" type="submit">
          Поиск
        </button>
      </div>
      <span className="form__error">{error}</span>
      <FilterCheckbox
        isCheckBox={props.isCheckBox}
        handleClickCheckBox={props.handleClickCheckBox}
      />
    </form>
  );
}
export default SearchForm;
