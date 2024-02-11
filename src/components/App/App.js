import "./App.css";
import Main from "../Main/Main.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Movies from "../Movies/Movies.js";
import { useEffect, useState } from "react";
import ErrorPage from "../ErrorPage/ErrorPage.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import moviesApi from "../../utils/MoviesApi.js";
import { findSuitableMovies } from "../../utils/filterMovies.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import auth from "../../utils/Auth.js";
import mainApi from "../../utils/MainApi.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [isMoviesCheckBox, setMoviesCheckBox] = useState(false);
  const [isSavedMoviesCheckBox, setSavedMoviesCheckBox] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [stateLoginErrorButton, setStateLoginErrorButton] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [stateRegisterErrorButton, setStateRegisterErrorButton] =
    useState(false);
  const navigate = useNavigate();
  const place = useLocation();
  useEffect(() => {
    checkToken();
  }, []);
  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getCurrentUser()
        .then((response) => {
          setCurrentUser({
            name: response.name,
            email: response.email,
            password: response.password,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      mainApi
        .getSavedMovies()
        .then((response) => {
          setSavedMoviesList(response);
        })
        .catch((err) => console.log(err));
      if (JSON.parse(localStorage.getItem("currentMoviesList"))) {
        setMoviesList(JSON.parse(localStorage.getItem("currentMoviesList")));
        setMoviesCheckBox(
          JSON.parse(localStorage.getItem("checkBoxMoviesState"))
        );
        setSavedMoviesCheckBox(
          JSON.parse(localStorage.getItem("checkBoxSavedMoviesState"))
        );
        setMovieName(localStorage.getItem("responseText"));
      }
    }
  }, [loggedIn]);
  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .tokenCheck(jwt)
        .then((res) => {
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleSignOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    setLoggedIn(false);
    setMoviesList([]);
    setSavedMoviesList([]);
    setMovieName("");
    setMoviesCheckBox(false);
    setSavedMoviesCheckBox(false);
    setLoginError("");
    setStateLoginErrorButton(false);
    setRegisterError("");
    setStateRegisterErrorButton(false);
    navigate("/", { replace: true });
  };
  const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((response) => {
        console.log(response.token);
        localStorage.setItem("jwt", response.token);
        setLoggedIn(true);
        setStateLoginErrorButton(false);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setLoginError(err.message);
        setStateLoginErrorButton(true);
        console.log(err);
      });
  };
  const handleRegister = ({ name, email, password }) => {
    auth
      .register(name, email, password)
      .then((response) => {
        if (response) {
          setCurrentUser({ name: name, email: email, password: password });
          handleLogin({ email, password });
          setStateRegisterErrorButton(false);
        }
      })
      .catch((err) => {
        err.status === 409
          ? setRegisterError("Пользователь с таким email уже существует.")
          : setRegisterError("При регистрации пользователя произошла ошибка.");
        setStateRegisterErrorButton(true);
      });
  };
  const handleChangeMovieName = (e) => {
    setMovieName(e);
  };
  const handleFindMoviesSubmit = () => {
    if (!JSON.parse(localStorage.getItem("fullMoviesList"))) {
      moviesApi
        .getMovies()
        .then((response) => {
          const suitableMoviesApi = findSuitableMovies(response, movieName);
          setMoviesList(suitableMoviesApi);
          localStorage.setItem(
            "currentMoviesList",
            JSON.stringify(suitableMoviesApi)
          );
          localStorage.setItem("fullMoviesList", JSON.stringify(response));
          localStorage.setItem("responseText", movieName);
          localStorage.setItem(
            "checkBoxMoviesState",
            JSON.stringify(isMoviesCheckBox)
          );
          localStorage.setItem(
            "checkBoxSavedMoviesState",
            JSON.stringify(isSavedMoviesCheckBox)
          );
        })
        .catch((err) => console.log(err));
    } else {
      const suitableMoviesLocalStorage = findSuitableMovies(
        JSON.parse(localStorage.getItem("fullMoviesList")),
        movieName
      );
      setMoviesList(suitableMoviesLocalStorage);
      localStorage.setItem(
        "currentMoviesList",
        JSON.stringify(suitableMoviesLocalStorage)
      );
      localStorage.setItem("responseText", movieName);
      localStorage.setItem(
        "checkBoxMoviesState",
        JSON.stringify(isMoviesCheckBox)
      );
      localStorage.setItem(
        "checkBoxSavedMoviesState",
        JSON.stringify(isSavedMoviesCheckBox)
      );
    }
  };
  const handleClickCheckBox = () => {
    if (place.pathname === "/movies") {
      setMoviesCheckBox(!isMoviesCheckBox);
      localStorage.setItem(
        "checkBoxMoviesState",
        JSON.stringify(!isMoviesCheckBox)
      );
    } else if (place.pathname === "/saved-movies") {
      setSavedMoviesCheckBox(!isSavedMoviesCheckBox);
      localStorage.setItem(
        "checkBoxSavedMoviesState",
        JSON.stringify(!isSavedMoviesCheckBox)
      );
    }
  };
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/signin"
            element={
              <Login
                handleLogin={handleLogin}
                loginError={loginError}
                stateLoginErrorButton={stateLoginErrorButton}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                handleRegister={handleRegister}
                registerError={registerError}
                stateRegisterErrorButton={stateRegisterErrorButton}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
                cards={moviesList}
                handleChangeMovieName={handleChangeMovieName}
                movieName={movieName}
                onSubmit={handleFindMoviesSubmit}
                isCheckBox={isMoviesCheckBox}
                handleClickCheckBox={handleClickCheckBox}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                cards={moviesList}
                isCheckBox={isSavedMoviesCheckBox}
                handleClickCheckBox={handleClickCheckBox}
                onSubmit={handleFindMoviesSubmit}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                onSignOut={handleSignOut}
              />
            }
          />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
