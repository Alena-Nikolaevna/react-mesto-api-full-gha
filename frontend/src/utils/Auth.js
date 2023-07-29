/*Запросы к серверу:

В папке utils рядом с файлом api.js создаем файл auth.js. В этом файле будет 3 функции, 
которые отправляют запросы и возвращают промисы:

• функция register - принимает почту и пароль, отправляет запрос регистрации на /signup

• функция login - принимает почту и пароль, отправляет запрос авторизации на /signin . 
  В ответ сервер вернет jwt, который нужно сохранить в localStorage

• функция checkToken - принимает jwt, отправляет запрос на /users/me и возвращает данные пользователя*/

export const BASE_URL = "https://auth.nomoreparties.co";

// ф-ция проверки результата
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
    .then(checkResponse)
};