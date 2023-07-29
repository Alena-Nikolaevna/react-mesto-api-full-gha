const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError'); // 401

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'Некорректная ссылка URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email), // поле email пользователя валидируется -
      message: 'Некорректый адрес email', // на соответствие паттерну почты
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // теперь API не будет возвращать хеш пароля
  },
});

// добавим метод findUserByCredentials схеме пользователя
// у него будет два параметра — почта и пароль
userSchema.statics.findUserByCredentials = function (email, password) {
  // попытаемся найти пользователя по почте
  return this.findOne({ email }) // this — это модель User
    .select('+password') // в случае аутентификации хеш пароля нужен, поэтому добавляем: .select('+password')
    .then((user) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          return user; // теперь user доступен
        });
    });
};

const User = mongoose.model('user', userSchema);

module.exports = User;
