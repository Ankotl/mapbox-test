class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status} - ${res.statusText}`);
    }
  }

  getPlots() {
    return fetch(`${this._baseUrl}`, {
      method: "GET",
    }).then(this._checkResponse);
  }

  addPlots(data) {
    return fetch(`${this._baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: `http://localhost:1337/api/plots?populate=*`,
});

export default api;
