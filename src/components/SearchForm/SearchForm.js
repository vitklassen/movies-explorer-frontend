import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";
function SearchForm() {
  return (
    <form className="form">
      <label className="form__search">
        <input
          className="form__input"
          name="movie"
          placeholder="Фильм"
          maxLength={"40"}
        ></input>
        <button className="form__button" type="submit">
          Поиск
        </button>
      </label>
      <FilterCheckbox />
    </form>
  );
}
export default SearchForm;
