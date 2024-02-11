import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";
function SearchForm(props) {
  function handleChange(e) {
    props.handleChangeMovieName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
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
      <FilterCheckbox
        isCheckBox={props.isCheckBox}
        handleClickCheckBox={props.handleClickCheckBox}
      />
    </form>
  );
}
export default SearchForm;
