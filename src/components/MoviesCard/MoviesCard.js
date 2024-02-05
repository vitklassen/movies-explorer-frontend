import { useState } from "react";
import imagePath from "../../images/MoviesCard/card__image_numer_five.png";
function MoviesCard(props) {
  const [isSaved, setSaved] = useState(true);
  function handleChange() {
    setSaved(!isSaved);
  }
  return (
    <div className="card">
      <div className="card__description">
        <h2 className="card__name">{props.name}</h2>
        <p className="card__duration">{props.duration}</p>
      </div>
      <img className="card__image" src={imagePath} alt="Постер"></img>
      <button
        className={`${
          props.saved
            ? "card__delete-button"
            : `card__save-button ${isSaved ? "card__save-button_active" : ""}`
        }`}
        onClick={!props.saved ? handleChange : null}
      >
        <p
          className={`card__button-text ${
            isSaved ? "" : "card__button-text_active"
          }`}
        >
          Сохранить
        </p>
      </button>
    </div>
  );
}
export default MoviesCard;
