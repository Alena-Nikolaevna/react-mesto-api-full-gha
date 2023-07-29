import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    function handleChangeUserName(evt) {
        setName(evt.target.value);
    }

    function handleChangeUserDescription(evt) {
        setDescription(evt.target.value);
    }

    return (
        <PopupWithForm name="edit-profile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>

            <fieldset className='popup__form-input'>
                <input id="name-input" className="popup__form-item popup__form-item_type_name" type='text' placeholder='Имя' name='name' minLength="2" maxLength="40" required autoComplete="off" value={name || ''} onChange={handleChangeUserName} />
                <span className="name-input-error popup__form-item-error"></span>
            </fieldset>

            <fieldset className='popup__form-input'>
                <input id="about-input" className="popup__form-item popup__form-item_type_job" type='text' placeholder='О себе' name='about' minLength="2" maxLength="200" required autoComplete="off" value={description || ''} onChange={handleChangeUserDescription} />
                <span className="about-input-error popup__form-item-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup;