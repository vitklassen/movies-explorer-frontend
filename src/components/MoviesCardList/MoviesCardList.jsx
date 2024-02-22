import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import { useScreenWidth } from "../../hooks/useScreenWidth.js";
import { settingsDevice } from "../../utils/constants.js";
import { useLocation } from "react-router-dom";
function MoviesCardList({
  isCheckBox,
  movies,
  onSubmit,
  handleClickCheckBox,
  children,
  error,
  stateError,
  isSending,
  currentMovieName,
  handleClickMovieCardButton,
  isSaveMoviesList,
  saveMoviesList,
}) {
  const [filterMoviesList, setFilterMoviesList] = useState([]);
  const [cardsParameters, setCardsParameters] = useState({
    total: 12,
    more: 3,
  });
  const [isMount, setMount] = useState(true);
  const screenWidth = useScreenWidth();
  const currentLocation = useLocation();
  console.log(currentLocation)
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
      console.log()
      return () => setMount(false);
    }
  }, [currentLocation.pathname, screenWidth, isMount, desktop, tablet, mobile]);

  // изменяем отображаемый массив фильмов в зависимости от ширины экрана
  useEffect(() => {
    if (movies.length) {
      const res = movies.filter(
        (item, i) => i < cardsParameters.total
      );
      console.log(res);
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
      <main className="movies">
        <SearchForm
          onSubmit={onSubmit}
          isCheckBox={isCheckBox}
          handleClickCheckBox={handleClickCheckBox}
          currentMovieName={currentMovieName}
        />
        {isSending ? (
          <Preloader />
        ) : stateError ? (
          <h2 className="movies__error">{error}</h2>
        ) : (
          <>
            <ul className="movies__cards">
              {filterMoviesList.map((movie) => {
                return (
                  <MoviesCard
                    key={movie.id || movie._id}
                    movie={movie}
                    handleClickMovieCardButton={handleClickMovieCardButton}
                    isSaveMoviesList={isSaveMoviesList}
                    saveMoviesList={saveMoviesList}
                  />
                );
              })}
            </ul>
            {currentLocation.pathname === "/movies" &&
              filterMoviesList.length >= 5 &&
              filterMoviesList.length < movies.length && (
                <button
                  className="movies__button"
                  onClick={handleClickMoreMovies}
                >
                  Ещё
                </button>
              )}
          </>
        )}
      </main>
    </>
  );
}
export default MoviesCardList;
