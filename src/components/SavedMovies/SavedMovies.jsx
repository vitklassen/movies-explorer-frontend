import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
function SavedMovies({
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
  saveMoviesList,
}) {
  return (
    <>
      <Header loggedIn={loggedIn} color={false} />
      <MoviesCardList
        movies={movies}
        onSubmit={onSubmit}
        isCheckBox={isCheckBox}
        handleClickCheckBox={handleClickCheckBox}
        error={error}
        stateError={stateError}
        isSending={isSending}
        currentMovieName={currentMovieName}
        isSaveMoviesList={true}
        handleClickMovieCardButton={handleClickMovieCardButton}
        saveMoviesList={saveMoviesList}
      />
      <Footer />
    </>
  );
}
export default SavedMovies;
