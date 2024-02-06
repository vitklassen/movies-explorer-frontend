import MoviesCard from "../MoviesCard/MoviesCard.js";
import SearchForm from "../SearchForm/SearchForm.js";
function MoviesCardList(props) {
  return (
    <>
      <main className="movies">
        <SearchForm />
        <ul className="movies__cards">
          {props.cards.map((card) => {
            return <MoviesCard name={card.name} duration={card.duration} saved={props.saved}/>;
          })}
        </ul>
        {props.children}
      </main>
    </>
  );
}
export default MoviesCardList;
