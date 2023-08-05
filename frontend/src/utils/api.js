class Api {
  constructor(setting) {
    this._address = setting.baseUrl;
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
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // получить список всех карточек в виде массива (GET)
  // загружаем карточки с сервера
  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // отправляем/сохраняем данные пользователя на сервер 
  // заменяем данные пользователя
  patchUserInfo(data) {
    return fetch(`${this._address}/users/me/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    }).then(this._checkResponse);
  }

  // добавление новой карточки
  createNewCard(data) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
        // name: data.name
      })
    }).then(this._checkResponse);
  }

  // удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // аватар
  patchUserAvatar(item) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(item)
    }).then(this._checkResponse);
  }

  // лайк
  likeCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // удаление лайка/дизлайк
  dislikeCard(cardId) {
    // const token = localStorage.getItem('token');
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
     /* headers: {
        authorization: `Bearer ${token}`,
      },*/
    }).then(this._checkResponse);
  }


  changeLikeCardStatus(id, isLiked) {
    // const token = localStorage.getItem('token');
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
       headers: this._headers,
    })
      .then(this._checkResponse);
  }

}

const api = new Api({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  baseUrl: "https://api.mesto-ank.nomoreparties.co",
  headers: {
  //  authorization: 'cb45d759-f4af-4749-b096-7ca0c6bdc881',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
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