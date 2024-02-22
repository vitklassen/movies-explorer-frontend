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
  if(suitableMovies.length === 0) {
    return undefined
  }
  return suitableMovies;
};
export const findShortMovies = (currentMoviesList) => {
  const shortMovies = [];
  if(!currentMoviesList) {
    return undefined;
  }
    currentMoviesList.forEach((movie) => {
      if(movie.duration <= 40) {
        shortMovies.push(movie);
      }
    });
    return shortMovies;
}
export const calculateDuration = (duration) => {
  const hour = String(Math.trunc(duration / 60));
  const minute = String(duration % 60);
  return hour + 'ч ' + minute + 'м';
}
