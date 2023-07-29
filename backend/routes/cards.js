const cardRouter = require('express').Router();
const { createCardValidation, cardIdValidation } = require('../middlewares/validations');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRouter.post('/', createCardValidation, createCard); // POST /cards — создаёт карточку
cardRouter.get('/', getCards); // GET /cards — возвращает все карточки
cardRouter.delete('/:cardId', cardIdValidation, deleteCard); // DELETE /cards/:cardId — удаляет карточку по идентификатору
cardRouter.put('/:cardId/likes', cardIdValidation, likeCard); // PUT /cards/:cardId/likes — поставить лайк карточке
cardRouter.delete('/:cardId/likes', cardIdValidation, dislikeCard); // DELETE /cards/:cardId/likes — убрать лайк с карточки

module.exports = cardRouter;
