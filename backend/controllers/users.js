const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError'); // 404 ошибка
const ConflictError = require('../errors/ConflictError'); // 409
const BadRequestError = require('../errors/BadRequestError'); // 400

const SALT_ROUNDS = 10;
const { JWT_SECRET } = require('../utils/config');
// const { SECRET_KEY } = require('../utils/constant');

// создаёт пользователя
const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, SALT_ROUNDS)
    .then((hashedPassword) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hashedPassword,
      })
        .then((user) => {
          res.status(201).send({
            _id: user._id,
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким email уже существует'));
          } else if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

// возвращает всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

// возвращает пользователя по _id
const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

// обновляет профиль
const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  // обновим имя, о себе найденного по _id пользователя
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw NotFoundError('Пользователь с указанным _id не найден.');
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

// обновляет аватар
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  // обновим аватар найденного по _id пользователя
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw NotFoundError('Пользователь с указанным _id не найден.');
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

//  Проверяет полученные в теле запроса почту и пароль
const login = (req, res, next) => {
  // Получаем из запроса почту и пароль
  const { email, password } = req.body;

  // Проверяем, есть ли пользователь с такой почтой
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      // вернём токен
      res.send({ token });
    })
    .catch(next);
};

/** GET-запрос. Получить пользователя по адресу /me */
const getCurrentUserInform = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUserProfile,
  updateUserAvatar,
  login,
  getCurrentUserInform,
};
