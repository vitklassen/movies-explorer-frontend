import "./App.css";
import Main from "../Main/Main.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import { Route, Routes } from "react-router-dom";
import Movies from "../Movies/Movies.js";
import { useEffect, useState } from "react";
import ErrorPage from "../ErrorPage/ErrorPage.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import moviesApi from "../../utils/MoviesApi.js";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [movieName, setMovieName] = useState("");
  const handleChangeMovieName = (e) => {
    setMovieName(e);
  };
  const handleFindMoviesSubmit = () => {
    moviesApi
      .getMovies()
      .then((response) => {
        setMoviesList(findSuitableMovies(response));
      })
      .catch((err) => console.log(err));
  };
  const findSuitableMovies = (movies) => {
    const suitableMovies = [];
    movies.forEach((movie) => {
      if(movie.nameRU.includes(movieName) || movie.nameEN.includes(movieName)) {
        suitableMovies.push(movie);
      }
    });
    console.log(suitableMovies);
    return suitableMovies;
  }
  return (
    <>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Main loggedIn={loggedIn} />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/movies"
          element={
            <Movies
              loggedIn={loggedIn}
              cards={moviesList}
              handleChangeMovieName={handleChangeMovieName}
              movieName={movieName}
              onSubmit={handleFindMoviesSubmit}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <SavedMovies
              loggedIn={loggedIn}
              cards={moviesList}
              onSubmit={handleFindMoviesSubmit}
            />
          }
        />
        <Route path="/profile" element={<Profile loggedIn={loggedIn} />} />
      </Routes>
    </>
  );
}

export default App;
