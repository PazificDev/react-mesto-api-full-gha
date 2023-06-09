export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then((res) => this._handleResponse(res));
  }

  postNewCard(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    })
      .then((res) => this._handleResponse(res))
      .then((data) => {
        return data;
      });
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then((res) => this._handleResponse(res))
      .then((data) => {
        return data;
      });
  }

  patchUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then((res) => this._handleResponse(res))
      .then((data) => {
        return data;
      });
  }

  patchUserPhoto(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then((res) => this._handleResponse(res))
      .then((data) => {
        return data;
      });
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: {
          'authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
      })
        .then((res) => this._handleResponse(res))
        .then((data) => {
          return data;
        });
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: {
          'authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
      })
        .then((res) => this._handleResponse(res))
        .then((data) => {
          return data;
        });
    }
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then((res) => this._handleResponse(res));
  }
}

const api = new Api({
  baseUrl: "https://api.pazificdev.mesto.nomoredomains.rocks",
});

export default api;
