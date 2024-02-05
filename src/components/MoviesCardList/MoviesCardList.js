import MoviesCard from "../MoviesCard/MoviesCard.js";
import SearchForm from "../SearchForm/SearchForm.js";
function MoviesCardList(props) {
  return (
    <>
      <section className="movies">
        <SearchForm />
        <div className="movies__cards">
          {props.cards.map((card) => {
            return <MoviesCard name={card.name} duration={card.duration} saved={props.saved}/>;
          })}
        </div>
        {props.children}
      </section>
    </>
  );
}
export default MoviesCardList;
