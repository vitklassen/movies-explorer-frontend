export const findSuitableMovies = (movies, movieName) => {
  console.log(movies)
  const suitableMoviesList = movies.filter(
    (item) =>
      item.nameRU.toLowerCase().includes(movieName.toLowerCase()) ||
      item.nameEN.toLowerCase().includes(movieName.toLowerCase())
  );
  return suitableMoviesList;
};
export const findShortMovies = (moviesList) => {
  const shortMoviesList = moviesList.filter((item) => item.duration <= 40);
  return shortMoviesList;
}
export const calculateDuration = (duration) => {
  const hour = String(Math.trunc(duration / 60));
  const minute = String(duration % 60);
  return hour + "ч " + minute + "м";
};
