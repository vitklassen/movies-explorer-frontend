import { calculateDuration } from "../../utils/filterMovies";
function MoviesCard({ movie, handleClickMovieCardButton, isSaveMoviesList, saveMoviesList }) {
  const isSaved = isSaveMoviesList || saveMoviesList.some((savedMovie) => {return movie.id === savedMovie.movieId});
  const handleButtonClick = () => {
    handleClickMovieCardButton(movie);
  }
  return (
    <li className="card">
      <div className="card__description">
        <h2 className="card__name">{movie.name || movie.nameRU}</h2>
        <p className="card__duration">{calculateDuration(movie.duration)}</p>
      </div>
      <a className="card__link" href={movie.trailerLink} target="_blank">
        <img
          className="card__image"
          src={isSaveMoviesList ? movie.image : `https://api.nomoreparties.co${movie.image.url}`}
          alt="Постер"
        ></img>
      </a>
      <button
        className={
          isSaveMoviesList
            ? "card__delete-button"
            : isSaved
            ? "card__save-button card__save-button_active"
            : "card__save-button"
        }
        onClick={handleButtonClick}
      >Сохранить</button>
    </li>
  );
}
export default MoviesCard;
