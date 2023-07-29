import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardDelete, onCardLike }) {

    // Подписываемся на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Далее в разметке используем переменную для условного рендеринга
    //{isOwn && <button className='button_del' onClick={handleDeleteClick} />} 

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `card__like-bt ${isLiked && 'card__like-bt_active'}`
    );;

    //Код, чтобы в обработчик handleCardClick задавалось нужное значение с данными карточки 
    function handleClick() {
        onCardClick(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    return (
        <article className="card">

            <img className="card__image" src={card.link} alt={currentUser.name} onClick={handleClick} />

            {isOwn && <button className="card__delete-bt" type="button" aria-label="Удалить карточку" onClick={handleDeleteClick}></button>}
            <div className="card__container">
                <h2 className="card__title">{card.name}</h2>
                <button className={cardLikeButtonClassName} type="button" aria-label="Поставить лайк" onClick={handleLikeClick}></button>
                <p className="card__count-like">{card.likes.length}</p>
            </div>
        </article>
    )
}

export default Card;

