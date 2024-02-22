import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
const Movies = ({
  loggedIn,
  movies,
  onSubmit,
  isCheckBox,
  handleClickCheckBox,
  error,
  stateError,
  isSending,
  currentMovieName,
  handleClickMovieCardButton,
  saveMoviesList
}) => {
  return (
    <>
      <Header loggedIn={loggedIn} color={false} />
      <MoviesCardList
        movies={movies}
        onSubmit={onSubmit}
        children={<button className="movies__button">Ещё</button>}
        isCheckBox={isCheckBox}
        handleClickCheckBox={handleClickCheckBox}
        error={error}
        stateError={stateError}
        isSending={isSending}
        currentMovieName={currentMovieName}
        handleClickMovieCardButton={handleClickMovieCardButton}
        isSaveMoviesList={false}
        saveMoviesList={saveMoviesList}
      />
      <Footer />
    </>
  );
}
export default Movies;
