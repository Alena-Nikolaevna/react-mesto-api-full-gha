import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_type_image ${card ? "popup_opened" : ""}`}>

      <div className="popup__content">
        <button className="popup__button-close popup__button-close_type_image" type="button" onClick={onClose}></button>
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <h2 className="popup__title">{card?.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;