import Header from "../Header/Header.js";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
function Movies(props) {
  return (
    <>
      <Header loggedIn={true} color={false} />
      <MoviesCardList
        cards={props.cards}
        handleChangeMovieName={props.handleChangeMovieName}
        movieName={props.movieName}
        onSubmit={props.onSubmit}
        children={<button className="movies__button">Ещё</button>}
      />
      <Footer />
    </>
  );
}
export default Movies;
