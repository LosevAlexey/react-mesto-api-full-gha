class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  async getInitialCards() {
    const res = await fetch(`${this._url}/cards`, {
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  async deletePlace(cardID) {
    const res = await fetch(`${this._url}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  async putLike(cardId) {
    const res = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  async deleteLike(cardID) {
    const res = await fetch(`${this._url}/cards/${cardID}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  async getUserInfo() {
    const res = await fetch(`${this._url}/users/me`, {
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  async changeUserInfo(data) {
    const res = await fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.description,
      }),
    });
    return this._handleResponse(res);
  }

  async changeAvatar(avatar) {
    const res = await fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    });
    return this._handleResponse(res);
  }

  async addCardPlace(data) {
    const res = await fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return this._handleResponse(res);
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}


const api = new Api({
  baseUrl: "http://api.alexey.nomoredomainsmonster.ru",
  headers: {
    authorization: "217ede58-a10f-4670-a309-daf3a817c4aa",
    "Content-Type": "application/json",
  },
});

export default api;
// другие методы работы с API
