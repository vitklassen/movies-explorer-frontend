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
  updateUserInfo() {
    
  }
}

const mainApi = new MainApi(settingsMainApi);

export default mainApi;
