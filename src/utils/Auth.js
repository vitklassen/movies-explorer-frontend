import { settingsMainApi } from "./settingsApi";
class Auth {
  constructor({ url, header }) {
    this._url = url;
    this._header = header;
  }
  _sendRequest(url, options) {
    return fetch(url, options).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Что-то пошло не так. Ошибка ${response.status}`);
    });
  }
  register(name, email, password) {
    return this._sendRequest(`${this._url}signup`, {
      method: "POST",
      headers: {
        "Content-Type": this._header,
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    });
  }

  authorize(email, password) {
    return this._sendRequest(`${this._url}signin`, {
      method: "POST",
      headers: {
        "Content-Type": this._header,
      },
      body: JSON.stringify({ email: email, password: password }),
    });
  }

  checkToken(token) {
    return this._sendRequest(`${this._url}users/me`, {
      method: "GET",
      headers: {
        "Content-Type": this._header,
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const auth = new Auth(settingsMainApi);

export default auth;