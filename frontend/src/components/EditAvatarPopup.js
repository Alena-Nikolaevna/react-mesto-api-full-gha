import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  // Записываем объект, возвращаемый хуком, в переменную
  const avatarRef = React.useRef();

  //Сбрасываем значения инпутов при открытии попапа
  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value /* Значение инпута, полученное с помощью рефа */
    });
  }

  return (
    <PopupWithForm name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>

      <fieldset className='popup__form-input'>
        <input id="link-avatar" className="popup__form-item popup__form-item_type_job" type='url' placeholder='Ссылка на картинку' name="link" required ref={avatarRef} />
        <span className="link-avatar-error popup__form-item-error"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;