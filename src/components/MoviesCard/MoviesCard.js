import { useState } from "react";
function MoviesCard(props) {
  const [isSaved, setSaved] = useState(true);
  function handleChange() {
    setSaved(!isSaved);
  }
  function calculateDuration() {
    const hour = String(Math.trunc(props.duration / 60));
    const minute = String(props.duration % 60);
    return hour + 'ч ' + minute + 'м';
  }
  return (
    <li className="card">
      <div className="card__description">
        <h2 className="card__name">{props.name}</h2>
        <p className="card__duration">{calculateDuration()}</p>
      </div>
      <img className="card__image" src={props.image} alt="Постер"></img>
      <button
        className={`${
          props.saved
            ? "card__delete-button"
            : `card__save-button ${isSaved ? "card__save-button_active" : ""}`
        }`}
        onClick={!props.saved ? handleChange : null}
      >Сохранить
      </button>
    </li>
  );
}
export default MoviesCard;
