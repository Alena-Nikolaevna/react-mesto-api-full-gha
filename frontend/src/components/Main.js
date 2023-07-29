import React from "react";
import peroAvatar from "../images/Vector-pero.svg";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
//import avatar from "../images/Avatar.png";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {

  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">

      <section className="profile">
        <div className="profile__container">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватарка" onClick={onEditAvatar} />
          <img className="profile__avatar-redact" src={peroAvatar} alt="Редактировать аватар" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" aria-label="Редактировать" className="profile__edit-button" onClick={onEditProfile}></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button type="button" aria-label="Добавить" className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        {cards.map((card) => <Card card={card}
          key={card._id}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />)}
      </section>

    </main>
  );
}

export default Main;
