function FilterCheckbox({isCheckBox, handleClickCheckBox}) {
  return (
    <label className="toggle" for="checkBoxId">
      <input
        className="toggle__input"
        type="checkbox"
        id="checkBoxId"
        checked={isCheckBox}
        onChange={handleClickCheckBox}
      />
      <span className="toggle__pseudo-item"></span>
      <span className="toggle__text">Короткометражки</span>
    </label>
  );
}
export default FilterCheckbox;
