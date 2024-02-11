function FilterCheckbox(props) {
  return (
    <label className="toggle" for="checkBoxId">
      <input
        className="toggle__input"
        type="checkbox"
        id="checkBoxId"
        checked={props.isCheckBox}
        onChange={props.handleClickCheckBox}
      />
      <span className="toggle__pseudo-item"></span>
      <span className="toggle__text">Короткометражки</span>
    </label>
  );
}
export default FilterCheckbox;
