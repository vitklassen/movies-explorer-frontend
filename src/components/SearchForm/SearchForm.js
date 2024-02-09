import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";
function SearchForm() {
  return (
    <form className="form">
      <div className="form__search">
        <input
          className="form__input"
          name="movie"
          placeholder="Фильм"
          maxLength={"40"}
        ></input>
        <button className="form__button" type="submit">
          Поиск
        </button>
      </div>
      <FilterCheckbox />
    </form>
  );
}
export default SearchForm;
