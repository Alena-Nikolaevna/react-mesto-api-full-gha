import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    React.useEffect(() => {
        setName("");
        setLink("");
    }, [isOpen]);

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
            name: name,
            link: link,
        });
    }

    function handleChangeCardName(evt) {
        setName(evt.target.value);
    }

    function handleChangeCardLink(evt) {
        setLink(evt.target.value);
    }

    return (
        <PopupWithForm name="add-profile"
            title="Новое место"
            buttonText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>

            <fieldset className='popup__form-input'>
                <input
                    id="title-input"
                    value={name || ''}
                    className="popup__form-item popup__form-item_type_name"
                    type='text'
                    placeholder='Название'
                    name="name"
                    minLength="2"
                    maxLength="30"
                    required
                    autoComplete="off"
                    onChange={handleChangeCardName} />
                <span className="title-input-error popup__form-item-error"></span>
            </fieldset>

            <fieldset className='popup__form-input'>
                <input id="link-input" value={link || ''} className="popup__form-item popup__form-item_type_job"
                    type='url' placeholder='Ссылка на картинку' name="link" required onChange={handleChangeCardLink} />
                <span className="link-input-error popup__form-item-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup;