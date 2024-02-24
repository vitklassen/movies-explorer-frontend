import { calculateDuration } from "../../utils/filterMovies";
import { useLocation } from "react-router-dom";
const MoviesCard = ({
  movie,
  handleSaveMovie,
  handleDeleteMovie,
  isSaveMoviesList,
  isSaved
}) => {
  const currentLocation = useLocation();
  const saveMovie = () => {
    handleSaveMovie(movie);
  };
  const deleteMovie = () => {
    handleDeleteMovie(movie);
  };
  return (
    <li className="card">
      <div className="card__description">
        <h2 className="card__name">{movie.name || movie.nameRU}</h2>
        <p className="card__duration">{calculateDuration(movie.duration)}</p>
      </div>
      <a className="card__link" href={movie.trailerLink} target="_blank">
        <img
          className="card__image"
          src={
            isSaveMoviesList
              ? movie.image
              : `https://api.nomoreparties.co${movie.image.url}`
          }
          alt="Постер"
        ></img>
      </a>
      {currentLocation.pathname === "/movies" ? (
        <button
          className={`card__save-button ${
            isSaved ? "card__save-button_active" : ""
          }`}
          onClick={isSaved ? deleteMovie : saveMovie}
        >
          Сохранить
        </button>
      ) : (
        <button className="card__delete-button" onClick={deleteMovie}></button>
      )}
    </li>
  );
};
export default MoviesCard;
