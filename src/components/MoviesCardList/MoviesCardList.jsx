import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import { useScreenWidth } from "../../hooks/useScreenWidth.js";
import { settingsDevice } from "../../utils/constants.js";
import { useLocation } from "react-router-dom";
function MoviesCardList({
  movies,
  handleSaveMovie,
  handleDeleteMovie,
  isSaveMoviesList,
  savedMoviesList,
}) {
  const [filterMoviesList, setFilterMoviesList] = useState([]);
  const [cardsParameters, setCardsParameters] = useState({
    total: 12,
    more: 3,
  });
  const [isMount, setMount] = useState(true);
  const screenWidth = useScreenWidth();
  const currentLocation = useLocation();
  const { desktop, tablet, mobile } = settingsDevice;

  // количество отображаемых карточек при разной ширине экрана
  useEffect(() => {
    if (currentLocation.pathname === "/movies") {
      if (screenWidth > desktop.width) {
        setCardsParameters(desktop.cardsParamaters);
      } else if (screenWidth <= desktop.width && screenWidth > mobile.width) {
        setCardsParameters(tablet.cardsParamaters);
      } else {
        setCardsParameters(mobile.cardsParamaters);
      }
      return () => setMount(false);
    }
  }, [currentLocation.pathname, screenWidth, isMount, desktop, tablet, mobile]);

  // изменяем отображаемый массив фильмов в зависимости от ширины экрана
  useEffect(() => {
    if (movies && movies.length !== 0) {
      const res = movies.filter((item, i) => i < cardsParameters.total);
      setFilterMoviesList(res);
    }
  }, [movies, cardsParameters.total]);

  // добавление карточек при клике по кнопке "Еще"
  function handleClickMoreMovies() {
    const start = filterMoviesList.length;
    const end = start + cardsParameters.more;
    const additional = movies.length - start;

    if (additional > 0) {
      const newCards = movies.slice(start, end);
      setFilterMoviesList([...filterMoviesList, ...newCards]);
    }
  }
  return (
    <>
      <ul className="movies__cards">
        {filterMoviesList.map((movie) => {
          return (
            <MoviesCard
              key={movie.id || movie._id}
              movie={movie}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
              isSaveMoviesList={isSaveMoviesList}
              isSaved={savedMoviesList.some((item) => item.movieId === movie.id || item.movieId === movie.movieId)}
            />
          );
        })}
      </ul>
      {currentLocation.pathname === "/movies" &&
        filterMoviesList.length >= 5 &&
        filterMoviesList.length < movies.length && (
          <button className="movies__button" onClick={handleClickMoreMovies}>
            Ещё
          </button>
        )}
    </>
  );
}
export default MoviesCardList;
