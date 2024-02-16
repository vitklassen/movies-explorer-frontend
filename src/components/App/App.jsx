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
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [registerError, setRegisterError] = useState("no-error");
  const [registerStateError, setRegisterStateError] = useState(false);
  const [loginError, setLoginError] = useState("no-error");
  const [loginStateError, setLoginStateError] = useState(false);
  const [isSending, setSending] = useState(false);
  const navigate = useNavigate();
  //функция регистрации
  const handleRegister = (name, email, password) => {
    setSending(true);
    auth
      .register(name, email, password)
      .then(() => {
        console.log("succesfully register!");
        navigate('/sign-in', {replace: true});
        handleLogin(name, email, password);
        setRegisterError('no-error');
        setRegisterStateError(false);
      })
      .catch((err) => {
        setRegisterError(err.message);
        setRegisterStateError(true);
      })
      .finally(() => setSending(false));
  };
  //функция авторизации 
  const handleLogin = (name, email, password) => {
    setSending(true);
    auth.authorize(email, password).then((res) => {
      console.log("succesfully login!");
      setLoggedIn(true);
      setCurrentUser({ name: name, email: email });
      localStorage.setItem("jwt", res.token);
      setLoginError('no-error');
      setLoginStateError(false);
      navigate('/', {replace: true});
    })
    .catch((err) => {
      setLoginError(err.message);
      setLoginStateError(true);
    })
    .finally(() => setSending(false));
  };
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
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
