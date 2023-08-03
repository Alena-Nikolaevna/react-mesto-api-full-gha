class Api {
  constructor(setting) {
    this._baseUrl = setting.baseUrl;
    this._headers = setting.headers;
  }

  // ф-ция проверки результата
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  // загружаем информацию о пользователе с сервера
  getUserInfo() {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      }
    }).then(this._checkResponse);
  }

  // получить список всех карточек в виде массива (GET)
  // загружаем карточки с сервера
  getInitialCards() {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      }
    }).then(this._checkResponse);
  }

  // отправляем/сохраняем данные пользователя на сервер 
  // заменяем данные пользователя
  patchUserInfo(data) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/users/me/`, {
      method: "PATCH",
      // headers: this._headers,
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    }).then(this._checkResponse);
  }

  // добавление новой карточки
  createNewCard(data) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      // headers: this._headers,
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        link: data.link,
        name: data.name
      })
    }).then(this._checkResponse);
  }

  // удаление карточки
  deleteCard(cardId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      //headers: this._headers,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  // аватар
  patchUserAvatar(item) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      // headers: this._headers,
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item)
    }).then(this._checkResponse);
  }

  // лайк
  likeCard(cardId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      // headers: this._headers,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  // удаление лайка/дизлайк
  dislikeCard(cardId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      // headers: this._headers,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }


  changeLikeCardStatus(id, isLiked) {
    const token = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: isLiked ? 'PUT' : 'DELETE',
      // headers: this._headers,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(this._checkResponse);
  }

}

const api = new Api({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  baseUrl: "https://api.mesto-ank.nomoreparties.co",
  headers: {
  //  authorization: 'cb45d759-f4af-4749-b096-7ca0c6bdc881',
    'Content-Type': 'application/json'
  }
});

export default api;

/*- получить список всех карточек в виде массива (GET) +
- добавить карточку (POST)
- удалить карточку (DELETE)
- получить данные пользователя (GET) +-
- заменить данные пользователя (PATCH) +
- заменить аватар (PATCH)
- “залайкать” карточку (PUT)
- удалить лайк карточки (DELETE)*/


// если ошибка, отклоняем промис
//return Promise.reject(`Ошибка: ${res.status}`);