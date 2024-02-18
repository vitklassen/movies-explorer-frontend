import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Movies from "../Movies/Movies.js";
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
function App() {
  //состояние авторизации
  const [loggedIn, setLoggedIn] = useState(false);
  //данные текущего пользователя
  const [currentUser, setCurrentUser] = useState({});
  //состояние и текст ошибки для страницы регитсрации
  const [registerError, setRegisterError] = useState("no-error");
  const [registerStateError, setRegisterStateError] = useState(false);
  //состояние и текст ошибки для страницы авторизации
  const [loginError, setLoginError] = useState("no-error");
  const [loginStateError, setLoginStateError] = useState(false);
  //состояние и текст ошибки для страницы редактирования профиля
  const [profileEditError, setProfileEditError] = useState("no-error");
  const [profileEditStateError, setProfileEditStateError] = useState(false);
  //стейт для индикации загрузки
  const [isSending, setSending] = useState(false);
  //хук навигации
  const navigate = useNavigate();
  //хук текущего url
  //const location = useLocation();
  //функция регистрации
  const handleRegister = (name, email, password) => {
    setSending(true);
    auth
      .register(name, email, password)
      .then(() => {
        console.log("succesfully register!");
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
        console.log("succesfully login!");
        setLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        setLoginError("no-error");
        setLoginStateError(false);
        navigate("/", { replace: true });
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
      })
      .catch((err) => {
        setProfileEditError(err.message);
        setProfileEditStateError(true);
      })
      .finally(() => setSending(false));
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
    navigate("/", { replace: true });
  };
  //функция проверки токена пользователя
  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then(() => {
          setLoggedIn(true);
          navigate('/', {replace: true});
        })
        .catch((err) => console.log(err));
    }
  }
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
          setCurrentUser({ name: res.name, email: res.email });
        })
        .catch((err) => {
          console.log(err);
        });
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
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
