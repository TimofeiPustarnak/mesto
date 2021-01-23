export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._headers.authorization
      },
    })
    .then(res => this._check(res))
    .then(data => data);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
    .then(res => this._check(res));
  }

  patchUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(res => this._check(res));
  }
  
  editAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => this._check(res));
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(res => this._check(res));
  }

  like(id, baseUrl, authorization) {
    return fetch(`${baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: {authorization: authorization}
    }).then(res => res.json());
  }

  unLike(id, baseUrl, authorization) {
    return fetch(`${baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: {authorization: authorization}
    }).then(res => res.json());
  }

  deleteCard(id, baseUrl, authorization) {
    return fetch(`${baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {authorization: authorization}
    }).then(res => res.json());
  }

  _check(res) {
    if (res.ok) {
      return res.json();
    }
    console.log(`Ошибка: ${res.status}`);
  }
}