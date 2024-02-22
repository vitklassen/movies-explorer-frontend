import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import Preloader from "../Preloader/Preloader.jsx";
function MoviesCardList({
  isCheckBox,
  movies,
  onSubmit,
  handleClickCheckBox,
  children,
  error,
  stateError,
  isSending,
  currentMovieName,
  handleClickMovieCardButton,
  isSaveMoviesList,
  saveMoviesList,
}) {
  return (
    <>
      <main className="movies">
        <SearchForm
          onSubmit={onSubmit}
          isCheckBox={isCheckBox}
          handleClickCheckBox={handleClickCheckBox}
          currentMovieName={currentMovieName}
        />
        {isSending ? (
          <Preloader />
        ) : stateError ? (
          <h2 className="movies__error">{error}</h2>
        ) : (
          <>
            <ul className="movies__cards">
              {movies.map((movie) => {
                return (
                  <MoviesCard
                    key={movie.id || movie._id}
                    movie={movie}
                    handleClickMovieCardButton={handleClickMovieCardButton}
                    isSaveMoviesList={isSaveMoviesList}
                    saveMoviesList={saveMoviesList}
                  />
                );
              })}
            </ul>
            {children}
          </>
        )}
      </main>
    </>
  );
}
export default MoviesCardList;
