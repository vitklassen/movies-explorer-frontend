import Header from "../Header/Header.js";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
function SavedMovies(props) {
  return (
    <>
      <Header loggedIn={true} color={false} />
      <MoviesCardList cards={props.cards} saved={true}/>
      <Footer />
    </>
  );
}
export default SavedMovies;
