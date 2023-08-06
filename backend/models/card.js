const mongoose = require('mongoose');
const validator = require('validator');

// Поля схемы карточки
const cardSchema = new mongoose.Schema({

  name: { // name — имя карточки
    type: String,
    required: true,
    minlength: 2,
    maxLength: 30,
  },
  link: { // link — ссылка на картинку
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'Некорректная ссылка URL',
    },
  },
  owner: { // owner — ссылка на модель автора карточки
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [{ // likes — список лайкнувших пост пользователей
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: { // createdAt — дата создания
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model('card', cardSchema);
module.exports = Card;
