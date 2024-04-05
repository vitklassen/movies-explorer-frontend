import { settingsMainApi } from "./settingsApi";
class MainApi {
  constructor({ url, header }) {
    this._url = url;
    this._header = header;
  }
  _sendRequest(url, options) {
    return fetch(url, options).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Что-то пошло не так...");
    });
  }
  getCurrentUser() {
    return this._sendRequest(`${this._url}users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": this._header,
      },
    });
  }
  getSavedMovies() {
    return this._sendRequest(`${this._url}movies`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": this._header,
      },
    });
  }
  updateUserInfo(name, email) {
    return this._sendRequest(`${this._url}users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": this._header,
      },
      body: JSON.stringify({ name: name, email: email }),
    });
  }
  saveMovies(movie) {
    return this._sendRequest(`${this._url}movies`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": this._header,
      },
      body: JSON.stringify({
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        director: movie.director,
        country: movie.country,
        year: movie.year,
        duration: movie.duration,
        description:movie.description,
        trailerLink: movie.trailerLink,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      }),
    });
  }
  deleteMovies(id) {
    return this._sendRequest(`${this._url}movies/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": this._header,
      },
    });
  }
}

const mainApi = new MainApi(settingsMainApi);

export default mainApi;
