export const findSuitableMovies = (movies, movieName) => {
  const suitableMovies = [];
  movies.forEach((movie) => {
    if (
      movie.nameRU.toLowerCase().includes(movieName.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(movieName.toLowerCase())
    ) {
      suitableMovies.push(movie);
    }
  });
  return suitableMovies;
};
export const findShortMovies = (currentMoviesList) => {
  const shortMovies = [];
    currentMoviesList.forEach((movie) => {
      if(movie.duration <= 40) {
        console.log(movie);
        shortMovies.push(movie);
      }
    });
    return shortMovies;
}