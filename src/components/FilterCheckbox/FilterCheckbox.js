import { useState } from "react";

function FilterCheckbox() {
  const [checked, setChecked] = useState(false);
  function handleChange() {
    setChecked(!checked);
  }
  return (
    <label className="toggle" for="checkBoxId">
      <input className="toggle__input" type="checkbox" id="checkBoxId" checked={checked} onChange={handleChange}/>
      <span className="toggle__pseudo-item"></span>
      <span className="toggle__text">Короткометражки</span>
    </label>
  );
}
export default FilterCheckbox;
