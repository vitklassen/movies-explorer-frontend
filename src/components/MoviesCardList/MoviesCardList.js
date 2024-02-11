import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import SearchForm from "../SearchForm/SearchForm.js";
import { findShortMovies } from "../../utils/filterMovies.js";
function MoviesCardList(props) {
  const movieArray = props.isCheckBox ? findShortMovies(props.cards) : props.cards;
  return (
    <>
      <main className="movies">
        <SearchForm
          onSubmit={props.onSubmit}
          handleChangeMovieName={props.handleChangeMovieName}
          movieName={props.movieName}
          isCheckBox={props.isCheckBox}
          handleClickCheckBox={props.handleClickCheckBox}
        />
        <ul className="movies__cards">
          {movieArray.map((card) => {
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
