import MoviesCard from "../MoviesCard/MoviesCard.js";
import SearchForm from "../SearchForm/SearchForm.js";
function MoviesCardList(props) {
  return (
    <>
      <main className="movies">
        <SearchForm
          onSubmit={props.onSubmit}
          handleChangeMovieName={props.handleChangeMovieName}
          movieName={props.movieName}
        />
        <ul className="movies__cards">
          {props.cards.map((card) => {
            return (
              <MoviesCard
                key={card.id}
                image={`https://api.nomoreparties.co${card.image.url}`}
                name={card.nameRU}
                duration={card.duration}
                saved={props.saved}
              />
            );
          })}
        </ul>
        {props.children}
      </main>
    </>
  );
}
export default MoviesCardList;
