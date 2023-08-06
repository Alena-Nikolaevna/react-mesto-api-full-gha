const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError'); // 404 ошибка
const ForbiddenError = require('../errors/ForbiddenError'); // 403 ошибка
const BadRequestError = require('../errors/BadRequestError'); // 400 ошибка

// создаёт карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

// возвращает все карточки
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

// удаляет карточку по идентификатору
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('В доступе отказано. Удалить чужую карточку нельзя.');
      } else {
        Card.deleteOne()
          .then(() => {
            res.send({ message: 'Карточка удалена.' });
          })
          .catch(next);
      }
    })
    .catch(next);
};

// поставить лайк карточке
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      } else {
        res.send(card);
      }
    })
    .catch(next);
};

// убрать лайк с карточки
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      } else {
        res.send(card);
      }
    })
    .catch(next);
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
