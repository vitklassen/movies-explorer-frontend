import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import SearchForm from "../SearchForm/SearchForm.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import {
  findSuitableMovies,
  findShortMovies,
} from "../../utils/filterMovies.js";
import moviesApi from "../../utils/MoviesApi.js";
const Movies = ({
  loggedIn,
  savedMoviesList,
  handleSaveMovie,
  handleDeleteMovie,
  isSaveMoviesList,
}) => {
  // данные текущего пользователя
  const currentUser = useContext(CurrentUserContext);
  // полный список фильмов, подходящий под поиск
  const [initialMoviesList, setInitialMoviesList] = useState([]);
  // отфильтрованный список фильмов
  const [filteredMoviesList, setFilteredMoviesList] = useState([]);
  // состояние ошибки при запросе/поиске
  const [stateError, setStateError] = useState(false);
  // текст ошибки
  const [textError, setTextError] = useState("no-error");
  // состояние чекбокса
  const [isMoviesCheckbox, setMoviesCheckbox] = useState(false);
  //индикация загрузки
  const [isPreloader, setPreloader] = useState(false);
  // фильтрация фильмов
  const filterMoviesList = (allMovies, movieName) => {
    const suitableMoviesList = findSuitableMovies(allMovies, movieName);
    localStorage.setItem(
      "currentMoviesList",
      JSON.stringify(suitableMoviesList)
    );
    setInitialMoviesList(suitableMoviesList);
    if (suitableMoviesList.length === 0) {
      setStateError(true);
      setTextError("По вашему запросу ничего не найдено.");
    }
    else {
      setStateError(false);
      setTextError("no-error");
      if(isMoviesCheckbox) {
        const shortSavedMoviesList = findShortMovies(suitableMoviesList);
        if(shortSavedMoviesList.length === 0) {
          setStateError(true);
          setTextError("По вашему запросу ничего не найдено.");
        }
        else {
          setStateError(false);
          setTextError("no-error");
        }
        setFilteredMoviesList(shortSavedMoviesList);
      }
      else {
        setFilteredMoviesList(suitableMoviesList);
      }
    }
  };
  // сабмит формы поиска
  const handleSubmitSearchForm = (movieName) => {
    if (movieName === "" || movieName === undefined) {
      setStateError(true);
      setTextError("Нужно ввести ключевое слово.");
      setInitialMoviesList([]);
      setFilteredMoviesList([]);
    } else {
      localStorage.setItem("isMoviesCheckbox", JSON.parse(isMoviesCheckbox));
      localStorage.setItem("currentMovieName", movieName);
      const allMovies = localStorage.getItem("allMoviesList");
      if (allMovies && JSON.parse(allMovies).length !== 0) {
        filterMoviesList(JSON.parse(allMovies), movieName);
      } else {
        setPreloader(true);
        moviesApi
          .getMovies()
          .then((res) => {
            filterMoviesList(res, movieName);
            localStorage.setItem('allMoviesList', JSON.stringify(res));
          })
          .catch((err) => {
            setStateError(true);
            setTextError(
              "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте еще раз."
            );
          })
          .finally(() => setPreloader(false));
      }
    }
  };
  //переключение чекбокса
  const handleClickCheckbox = () => {
    setMoviesCheckbox(!isMoviesCheckbox);
    localStorage.setItem("isMoviesCheckbox", JSON.parse(!isMoviesCheckbox));
    if (!isMoviesCheckbox) {
      const shortSavedMoviesList = findShortMovies(initialMoviesList);
      if(shortSavedMoviesList.length === 0) {
        setStateError(true);
        setTextError("По вашему запросу ничего не найдено.");
      }
      else {
        setStateError(false);
        setTextError("no-error");
      }
      setFilteredMoviesList(shortSavedMoviesList);
    } else {
      if(initialMoviesList.length === 0) {
        setStateError(true);
        setTextError("По вашему запросу ничего не найдено.");
      }
      else {
        setStateError(false);
        setTextError("no-error");
      }
      setFilteredMoviesList(initialMoviesList);
    }
  };
  //инициализация списка фильмов из localStorage
  useEffect(() => {
    if (localStorage.getItem("currentMoviesList")) {
      const moviesList = JSON.parse(localStorage.getItem("currentMoviesList"));
      const checkBoxState = JSON.parse(
        localStorage.getItem("isMoviesCheckbox")
      );
      setInitialMoviesList(moviesList);
      if (checkBoxState) {
        setFilteredMoviesList(findShortMovies(moviesList));
      } else {
        setFilteredMoviesList(moviesList);
      }
    }
  }, [currentUser]);
  useEffect(() => {
    if(JSON.parse(
      localStorage.getItem("isMoviesCheckbox"))) {
        setMoviesCheckbox(true);
      }
      else {
        setMoviesCheckbox(false);
      }
  }, [currentUser])
  return (
    <>
      <Header loggedIn={loggedIn} color={false} />
      <main className="movies">
        <SearchForm
          onSubmit={handleSubmitSearchForm}
          handleClickCheckbox={handleClickCheckbox}
          isCheckBox={isMoviesCheckbox}
        />
        {isPreloader ? (
          <Preloader />
        ) : stateError ? (
          <h2 className="movies__error">{textError}</h2>
        ) : (
          <MoviesCardList
            savedMoviesList={savedMoviesList}
            movies={filteredMoviesList}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
            isSaveMoviesList={isSaveMoviesList}
          />
        )}
      </main>
      <Footer />
    </>
  );
};
export default Movies;
