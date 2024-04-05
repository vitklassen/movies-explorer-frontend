import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import {
  findSuitableMovies,
  findShortMovies,
} from "../../utils/filterMovies.js";
import { useEffect, useState } from "react";
const SavedMovies = ({ loggedIn, savedMoviesList, isSaveMoviesList, handleDeleteMovie }) => {
  // состояние ошибки при запросе/поиске
  const [stateError, setStateError] = useState(false);
  // текст ошибки
  const [textError, setTextError] = useState("no-error");
  //состояние чекбокса
  const [isSavedMoviesCheckbox, setSavedMoviesCheckbox] = useState(false);
  // полный список фильмов, подходящий под поиск
  const [initialMoviesList, setInitialMoviesList] = useState([]);
  // отфильтрованный список фильмов
  const [filteredMoviesList, setFilteredMoviesList] = useState([]);
  // фильтрация фильмов
  const filterMoviesList = (allMovies, movieName) => {
    const suitableMoviesList = findSuitableMovies(allMovies, movieName);
    setInitialMoviesList(suitableMoviesList);
    if (suitableMoviesList.length === 0) {
      setStateError(true);
      setTextError("По вашему запросу ничего не найдено.");
    }
    else {
      setStateError(false);
      setTextError("no-error");
      if(isSavedMoviesCheckbox) {
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
  //сабмит формы поиска 
  const handleSubmitSearchForm = (movieName) => {
    if (movieName === "" || movieName === undefined) {
      setStateError(true);
      setTextError("Нужно ввести ключевое слово.");
    }
    else {
      filterMoviesList(savedMoviesList, movieName);
    }
  }
  //переключение чекбокса 
  const handleClickCheckbox = () => {
    setSavedMoviesCheckbox(!isSavedMoviesCheckbox);
    if(!isSavedMoviesCheckbox) {
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
    }
    else {
      setStateError(false);
      setTextError("no-error");
      setFilteredMoviesList(initialMoviesList);
    }
  }
  //инициализация всех сохраненных фильмов
  useEffect(() => {
    setInitialMoviesList(savedMoviesList);
    setFilteredMoviesList(savedMoviesList);
  }, [savedMoviesList])
  return (
    <>
      <Header loggedIn={loggedIn} color={false} />
      <main className="saved-movies">
        <SearchForm
          onSubmit={handleSubmitSearchForm}
          handleClickCheckbox={handleClickCheckbox}
          isCheckBox={isSavedMoviesCheckbox}
        />
        {stateError ? (
          <h2 className="saved-movies__error">{textError}</h2>
        ) : (
          <MoviesCardList
            savedMoviesList={savedMoviesList}
            movies={filteredMoviesList}
            handleDeleteMovie={handleDeleteMovie}
            isSaveMoviesList={isSaveMoviesList}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
export default SavedMovies;
