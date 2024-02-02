import "./App.css";
import Main from "../Main/Main.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import { Route, Routes } from "react-router-dom";
import Movies from "../Movies/Movies.js";
import movies from "../../utils/movies.js";
import { useEffect, useState } from "react";
import ErrorPage from "../ErrorPage/ErrorPage.js";
function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Main loggedIn={loggedIn} />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/movies"
          element={<Movies loggedIn={loggedIn} cards={movies}/>}
        />
      </Routes>
    </>
  );
}

export default App;
