import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Movies from "../Movies/Movies.jsx";
import { useEffect, useState  } from "react";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import Main from "../Main/Main.jsx";
import auth from "../../utils/Auth.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import Profile from "../Profile/Profile.jsx";
import mainApi from "../../utils/MainApi.js";
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
  //список сохраненных фильмов
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  //стейт для индикации загрузки
  const [isSending, setSending] = useState(false);
  //состояние popup'a
  const [isInfoTooltip, setInfoToolTip] = useState(false);
  //хук навигации
  const navigate = useNavigate();
  //функция для кнопки "Назад" ErrorPage
  const redirect = () => {
    navigate('/', {replace: true});
  }
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
  //функция получения данных пользователя
  const getCurrentUserData = () => {
    mainApi
      .getCurrentUser()
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email, id: res._id });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //функция получения всех сохраненных фильмов
  const getSavedMovies = () => {
    mainApi
      .getSavedMovies()
      .then((res) => {
        setSavedMoviesList(res);
      })
      .catch((err) => console.log(err));
  };
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
    setSavedMoviesList([]);
    setSending(false);
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
      getCurrentUserData();
      getSavedMovies();
    }
  }, [loggedIn]);
  //функция сохранения фильма
  const handleSaveMovie = (movie) => {
    mainApi
      .saveMovies(movie)
      .then((newMovie) => {
        setSavedMoviesList([...savedMoviesList, newMovie]);
      })
      .catch((err) => console.log(err));
  };
  //функция удаления фильма
  const handleDeleteMovie = (movie) => {
    const deletedMovie = savedMoviesList.find(
      (element) =>
        element.movieId === movie.id || element.movieId === movie.movieId
    );
    console.log(deletedMovie)
    mainApi
      .deleteMovies(deletedMovie._id)
      .then(() => {
        const actualSavedMoviesList = savedMoviesList.filter(
          (element) => element._id !== deletedMovie._id
        );
        console.log(actualSavedMoviesList)
        setSavedMoviesList(actualSavedMoviesList);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
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
                savedMoviesList={savedMoviesList}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
                isSaveMoviesList={false}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                savedMoviesList={savedMoviesList}
                handleDeleteMovie={handleDeleteMovie}
                isSaveMoviesList={true}
              />
            }
          />
          <Route path="*" element={<ErrorPage redirect={redirect}/>} />
        </Routes>
        <InfoTooltip isOpen={isInfoTooltip} onClose={closeInfoTooltip} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
