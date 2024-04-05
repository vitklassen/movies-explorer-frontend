import { settingsMoviesApi } from "./settingsApi";
class MoviesApi {
    constructor({url, header}) {
        this._url = url;
        this._header = header;
    }
    _sendRequest(url, options) {
        return fetch(url, options)
        .then((response) => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Что-то пошло не так...');
        })
        .catch((err) => {
            console.log(err);
        })
    }
    getMovies() {
        return this._sendRequest(`${this._url}`, {
            method: 'GET',
            headers: {
                'Content-Type': this._header
            }
        })
    }
}
const moviesApi = new MoviesApi(settingsMoviesApi);
export default moviesApi;