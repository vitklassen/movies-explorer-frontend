import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Movies from "../Movies/Movies.jsx";
import { useEffect, useState } from "react";
import ErrorPage from "../ErrorPage/ErrorPage.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import Main from "../Main/Main.jsx";
import auth from "../../utils/Auth.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import Profile from "../Profile/Profile.jsx";
import mainApi from "../../utils/MainApi.js";
import {
  findShortMovies,
} from "../../utils/filterMovies.js";
import moviesApi from "../../utils/MoviesApi.js";
import InfoTooltip from "../InfoTooltip/InfoTooltip.jsx";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";
function App() {
  //состояние авторизации
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") || false
  );
  //данные текущего пользователя
  const [currentUser, setCurrentUser] = useState({});
  //состояние и текст ошибки для страницы регистрации
  const [registerError, setRegisterError] = useState("no-error");
  const [registerStateError, setRegisterStateError] = useState(false);
  //состояние и текст ошибки для страницы авторизации
  const [loginError, setLoginError] = useState("no-error");
  const [loginStateError, setLoginStateError] = useState(false);
  //состояние и текст ошибки для страницы редактирования профиля
  const [profileEditError, setProfileEditError] = useState("no-error");
  const [profileEditStateError, setProfileEditStateError] = useState(false);
  //состояние и текст ошибки для поиска фильмов
  const [moviesError, setMoviesError] = useState("no-error");
  const [moviesStateError, setMoviesStateError] = useState(false);
  //список искомых фильмов
  const [moviesList, setMoviesList] = useState(
    JSON.parse(localStorage.getItem("currentMoviesList")) || []
  );
  //список сохраненных фильмов
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  //список отфильтрованных сохраненных списков
  const [filterSavedMoviesList, setFilterSavedMoviesList] = useState([]);
  //текущее значение строки поиска фильма
  const [currentMovieName, setCurrentMovieName] = useState(
    localStorage.getItem("currentMovie") || ""
  );
  //состояние чекбокса "Фильмы"
  const [isMoviesCheckbox, setMoviesCheckbox] = useState(
    JSON.parse(localStorage.getItem("isMoviesCheckbox")) || false
  );
  //состояние чекбокса "Сохраненные фильмы"
  const [isSavedMoviesCheckbox, setSavedMoviesCheckbox] = useState(false);
  //стейт для индикации загрузки
  const [isSending, setSending] = useState(false);
  //состояние popup'a
  const [isInfoTooltip, setInfoToolTip] = useState(false);
  //состояние поиска
  const [isFindActive, setFindActive] = useState(
    JSON.parse(localStorage.getItem("isFindActive")) || false
  );
  //хук навигации
  const navigate = useNavigate();
  //функция регистрации
  const handleRegister = (name, email, password) => {
    setSending(true);
    auth
      .register(name, email, password)
      .then(() => {
        navigate("/sign-in", { replace: true });
        handleLogin(email, password);
        setRegisterError("no-error");
        setRegisterStateError(false);
      })
      .catch((err) => {
        setRegisterError(err.message);
        setRegisterStateError(true);
      })
      .finally(() => setSending(false));
  };
  //функция авторизации
  const handleLogin = (email, password) => {
    setSending(true);
    auth
      .authorize(email, password)
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        localStorage.setItem("loggedIn", true);
        setLoginError("no-error");
        setLoginStateError(false);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setLoginError(err.message);
        setLoginStateError(true);
      })
      .finally(() => setSending(false));
  };
  //функция редактирования профиля
  const handleEditProfile = (name, email) => {
    setSending(true);
    mainApi
      .updateUserInfo(name, email)
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email });
        setProfileEditError("no-error");
        setProfileEditStateError(false);
        setInfoToolTip(true);
      })
      .catch((err) => {
        setProfileEditError(err.message);
        setProfileEditStateError(true);
      })
      .finally(() => setSending(false));
  };
  //функция фильтрации фильмов
  const filterMovies = (allMovies, movie) => {
    const filteredMovies = allMovies.filter((item) => {
      return (
        item.nameRU.toLowerCase().includes(movie.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(movie.toLowerCase())
      );
    });
    const shortFilteredMovies = filteredMovies.filter((item) => {
      return item.duration <= 40;
    });
    localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
    localStorage.setItem(
      "shortFilteredMovies",
      JSON.stringify(shortFilteredMovies)
    );
    if (filteredMovies && filteredMovies.length !== 0) {
      localStorage.setItem("currentMovie", movie);
      if (isMoviesCheckbox) {
        if (shortFilteredMovies && shortFilteredMovies.length !== 0) {
          setMoviesList(shortFilteredMovies);
          localStorage.setItem(
            "currentMoviesList",
            JSON.stringify(shortFilteredMovies)
          );
          setFindMovieError("no-error", false);
        } else {
          setFindMovieError("По вашему запросу ничего не найдено.", true);
        }
      } else {
        setMoviesList(filteredMovies);
        localStorage.setItem(
          "currentMoviesList",
          JSON.stringify(filteredMovies)
        );
        setFindMovieError("no-error", false);
      }
    } else {
      setFindMovieError("По вашему запросу ничего не найдено.", true);
    }
  };
  //функция поиска фильма
  const findMovies = (movie) => {
    setFindActive(true);
    localStorage.setItem("isFindActive", JSON.parse(true));
    if (movie === "" || movie === undefined) {
      setFindMovieError("Нужно ввести ключевое слово.", true);
      return;
    }
    localStorage.setItem("isMoviesCheckbox", JSON.stringify(isMoviesCheckbox));
    const fullMoviesList = JSON.parse(localStorage.getItem("fullMoviesList"));
    if (fullMoviesList) {
      filterMovies(fullMoviesList, movie);
    } else {
      setSending(true);
      moviesApi
        .getMovies()
        .then((fullMoviesList) => {
          localStorage.setItem(
            "fullMoviesList",
            JSON.stringify(fullMoviesList)
          );
          filterMovies(fullMoviesList, movie);
        })
        .catch(() => {
          setFindMovieError(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.",
            true
          );
        })
        .finally(() => setSending(false));
    }
  };
  //функция ошибки поиска фильмов
  const setFindMovieError = (textError, stateError) => {
    setMoviesError(textError);
    setMoviesStateError(stateError);
  };
  //функция загрузки всех сохраненных фильмов
  const getSavedMovies = () => {
    mainApi
      .getSavedMovies()
      .then((res) => {
        setSavedMoviesList(res);
        setFilterSavedMoviesList(res);
      })
      .catch(() => {
        setFindMovieError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.",
          true
        );
      });
  };
  //функция фильтрации сохраненных фильмов
  const filterSavedMovies = (allSavedMovies, savedMovie) => {
    const suitableSavedMoviesList = allSavedMovies.filter((item) => {
      return (
        item.nameRU.toLowerCase().includes(savedMovie.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(savedMovie.toLowerCase())
      );
    });
    if (suitableSavedMoviesList && suitableSavedMoviesList.length !== 0) {
      setSavedMoviesList(suitableSavedMoviesList);
      setFindMovieError("no-error", false);
    } else {
      setFindMovieError("По вашему запросу ничего не найдено.", true);
    }
  };
  //функция поиска сохраненных фильмов
  const findSavedMovies = (movie) => {
    if (movie === "" || movie === undefined) {
      setFindMovieError("Нужно ввести ключевое слово", true);
      return;
    }
    //checkEmptyMovies(savedMoviesList, movie, true);
    filterSavedMovies(savedMoviesList, movie);
  };
  //функция клика по чекбоксу "Фильмы"
  const handleClickMoviesCheckbox = () => {
    setMoviesCheckbox(!isMoviesCheckbox);
    localStorage.setItem("isMoviesCheckbox", JSON.stringify(!isMoviesCheckbox));
    console.log(isFindActive);
    if (isFindActive) {
      const filteredMovies = JSON.parse(localStorage.getItem("filteredMovies"));
      if (filteredMovies && filteredMovies.length !== 0) {
        if (!isMoviesCheckbox) {
          const shortMovies = JSON.parse(
            localStorage.getItem("shortFilteredMovies")
          );
          if (shortMovies && shortMovies.length !== 0) {
            setMoviesList(shortMovies);
            localStorage.setItem(
              "currentMoviesList",
              JSON.stringify(shortMovies)
            );
            setFindMovieError("no-error", false);
          } else {
            setFindMovieError("По вашему запросу ничего не найдено.", true);
          }
        } else {
          setMoviesList(filteredMovies);
          localStorage.setItem(
            "currentMoviesList",
            JSON.stringify(filteredMovies)
          );
          setFindMovieError("no-error", false);
        }
      } else {
        setFindMovieError("По вашему запросу ничего не найдено.", true);
      }
    }
  };
  //функция клика по чекбоксу "Сохраненные Фильмы"
  const handleClickSavedMoviesCheckbox = () => {
    setSavedMoviesCheckbox(!isSavedMoviesCheckbox);
  };
  //эффекты при изменении состояния чекбокса "Сохраненные Фильмы"
  useEffect(() => {
    if (isSavedMoviesCheckbox) {
      const shortMovies = findShortMovies(savedMoviesList);
      if (shortMovies.length === 0) {
        setMoviesError("По вашему запросу ничего не найдено.");
        setMoviesStateError(true);
        return;
      }
      setFilterSavedMoviesList(shortMovies);
      setMoviesError("no-error");
      setMoviesStateError(false);
      return;
    }
    setFilterSavedMoviesList(savedMoviesList);
    setMoviesError("no-error");
    setMoviesStateError(false);
  }, [isSavedMoviesCheckbox, savedMoviesList]);
  //функция удаления/сохранения фильма
  const handleClickMovieCardButton = (movie) => {
    const savedMovie =
      savedMoviesList.find((element) => element.movieId === movie.id) ||
      savedMoviesList.find((element) => element.movieId === movie.movieId);
    if (savedMovie) {
      mainApi
        .deleteMovies(savedMovie._id)
        .then(() => {
          setSavedMoviesList((movies) =>
            movies.filter((element) => element._id !== savedMovie._id)
          );
        })
        .catch((err) => console.log(err));
    } else {
      mainApi
        .saveMovies(movie)
        .then((res) => {
          setSavedMoviesList([...savedMoviesList, res]);
        })
        .catch((err) => console.log(err));
    }
  };
  //обновление отображения списка фильмов при сохранении
  useEffect(() => {
    setMoviesList(moviesList);
  }, [savedMoviesList, moviesList]);
  //закрытие popup'a
  const closeInfoTooltip = () => {
    setInfoToolTip(false);
  };
  //функция выхода из личного кабинета
  const onSignOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    setRegisterError("no-error");
    setRegisterStateError(false);
    setLoginError("no-error");
    setLoginStateError(false);
    setProfileEditError("no-error");
    setProfileEditStateError(false);
    setSending(false);
    setMoviesError("no-error");
    setMoviesStateError(false);
    setMoviesList([]);
    setMoviesCheckbox(false);
    setSavedMoviesCheckbox(false);
    setCurrentMovieName("");
    setInfoToolTip(false);
    navigate("/", { replace: true });
  };
  //функция проверки токена пользователя
  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then(() => {
          navigate("/movies", { replace: true });
          console.log("succesfully check token");
        })
        .catch(() => {
          setLoggedIn(false);
          localStorage.removeItem("loggedIn");
          navigate("/", { replace: true });
        });
    }
  };
  //функция проверки токена при каждом рендере страницы
  useEffect(() => {
    checkToken();
  }, []);
  //эффекты при успешной авторизации пользователя
  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getCurrentUser()
        .then((res) => {
          setCurrentUser({ name: res.name, email: res.email, id: res._id });
        })
        .catch((err) => {
          console.log(err);
        });
      getSavedMovies();
    }
  }, [loggedIn]);
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/sign-up"
            element={
              <Register
                registerError={registerError}
                registerStateError={registerStateError}
                isSending={isSending}
                onSubmit={handleRegister}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                loginError={loginError}
                loginStateError={loginStateError}
                isSending={isSending}
                onSubmit={handleLogin}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                isSending={isSending}
                profileEditError={profileEditError}
                profileEditStateError={profileEditStateError}
                onSubmit={handleEditProfile}
                onSignOut={onSignOut}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
                isSending={isSending}
                movies={moviesList}
                onSubmit={findMovies}
                isCheckBox={isMoviesCheckbox}
                handleClickCheckBox={handleClickMoviesCheckbox}
                error={moviesError}
                stateError={moviesStateError}
                currentMovieName={currentMovieName}
                handleClickMovieCardButton={handleClickMovieCardButton}
                saveMoviesList={savedMoviesList}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                isSending={isSending}
                movies={filterSavedMoviesList}
                onSubmit={findSavedMovies}
                isCheckBox={isSavedMoviesCheckbox}
                handleClickCheckBox={handleClickSavedMoviesCheckbox}
                error={moviesError}
                stateError={moviesStateError}
                currentMovieName=""
                handleClickMovieCardButton={handleClickMovieCardButton}
                saveMoviesList={savedMoviesList}
              />
            }
          />
        </Routes>
        <InfoTooltip isOpen={isInfoTooltip} onClose={closeInfoTooltip} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
