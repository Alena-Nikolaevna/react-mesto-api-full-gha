import React from "react";
import { useEffect, useState } from 'react';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmDeletePopup from "./ConfirmDeletePopup.js";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from "./../utils/Auth.js";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";  // импортируем Routes
import ProtectedRoute from "./ProtectedRoute.js";
import Login from "./Login.js";
import Register from "./Register.js";

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from "../utils/api.js";
//import Card from "./Card";

function App() {

  //Переменные состояния(голубым), отвечающие за видимость четырех попапов:
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [removeCard, setRemoveCard] = useState(null);

  // Стейт, отвечающий за данные текущего пользователя ===
  //Переменная состояния - отвечающая за полученные данные из API(имя, о себе, аватар = data)
  const [currentUser, setCurrentUser] = useState({});

  //Переменная состояния для карточек (список карточек)
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Получаем данные пользователя с сервера
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => { console.log(err) });

    // Получаем карточки с сервера
    api.getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch((err) => { console.log(err) });
  }, []);

  /** обработчик авторизации пользователя */
  function handleLogin(data) {
    return auth
      .login(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setUserEmail(data.email);
        setIsLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /** обработчик регистрации пользователя */
  function handleRegister(data) {
    return auth
      .register(data)
      .then((res) => {
        setIsSuccessInfoTooltipStatus(true);
        handleInfoTooltipClick();
        navigate('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessInfoTooltipStatus(false);
        handleInfoTooltipClick(false);
      })
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate('/sign-in');
  }

  // обработчик проверки пользователяБ, есть ли токен в localStorage
  function handleCheckToken() {

    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then(({ data }) => {
          setUserEmail(data.email);
          setIsLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    handleCheckToken();
  }, []);


  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => { console.log(err) });
  }

  //Обработчик удаления своей карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => { console.log(err) });
  }

  //Обработчик сохранения данных пользователя -??
  function handleUpdateUser(data) {
    // Сохраняем данные пользователя
    api.patchUserInfo(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => { console.log(err) });
  }

  //Обработчик сохранения аватара
  function handleUpdateAvatar(item) {
    // Обновляем аватар
    api.patchUserAvatar(item)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => { console.log(err) });
  }

  //Обработчик добавления новой карточки
  function handleAddPlaceSubmit(data) {
    // Добавляем/сохраняем новую карточку
    api.createNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => { console.log(err) });
  }


  //Обработчик отображения большой картинки при клике на карточку
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //Обработчики открытия попапов
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleConfirmDeleteClick(card) {
    setIsConfirmDeletePopupOpen(true);
    setRemoveCard(card);
  }

  function handleInfoTooltipClick() {
    setIsInfoTooltipPopupOpen(true);
  }

  //Обработчик закрытия попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard(null);
    setRemoveCard(null);
    setIsInfoTooltipPopupOpen(false);
  }

  return (
    //«Внедряем» данные из currentUser с помощью провайдера контекста
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">

        <Header
          userEmail={userEmail}
          onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={
            <ProtectedRoute
              element={Main}
              loggedIn={isLoggedIn}

              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              cards={cards}
              onCardDelete={handleConfirmDeleteClick}
            />} />


          <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
          <Route path="/sign-up" element={<Register handleRegister={handleRegister} />} />

          <Route path='*' element={isLoggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />} />
        </Routes>

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />

        <ImagePopup card={selectedCard}
          onClose={closeAllPopups} />

        <ConfirmDeletePopup isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmitDelete={handleCardDelete}
          card={removeCard} />

        <InfoTooltip isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isConfirmStatus={isSuccessInfoTooltipStatus} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
