import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function ConfirmDeletePopup({ isOpen, onClose, onSubmitDelete, card }) {

    function handleSubmit(evt) {
        evt.preventDefault();

        onSubmitDelete(card);
    }

    return (
        <PopupWithForm name="confirm"
            title="Вы уверены?"
            buttonText="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit} />
    )
}

export default ConfirmDeletePopup;