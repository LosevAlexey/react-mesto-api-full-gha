class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }



  async getInitialCards() {
    const res = await this.request(`${this._url}/cards`, {
      headers: this._headers,
    });
    return res;
  }

  async deletePlace(cardID) {
    const res = await this.request(`${this._url}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return res;
  }

  async putLike(cardId) {
    const res = await this.request(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    return res;
  }

  async deleteLike(cardID) {
    const res = await this.request(`${this._url}/cards/${cardID}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    return res;
  }

  async getUserInfo() {
    const res = await this.request(`${this._url}/users/me`, {
      headers: this._headers,
    });
    return res;
  }

  async changeUserInfo(data) {
    const res = await this.request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.description,
      }),
    });
    return res;
  }

  async changeAvatar(avatar) {
    const res = await this.request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    });
    return res;
  }

  async addCardPlace(data) {
    const res = await this.request(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return res;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }



  request(url, options) {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(url, {
      ...options,
      headers: {
        ...this._headers,
        ...options.headers,
        authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
      },
    }).then(this._handleResponse);
  }
}


const api = new Api({
  baseUrl: "https://api.alexey.nomoredomainsmonster.ru",
  headers: {
    authorization: "Bearer " + (localStorage.getItem("jwt") || ""),
    "Content-Type": "application/json",
  },
});

export default api;
