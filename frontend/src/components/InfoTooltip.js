import React from "react";
import success from "../images/success.svg";
import error from "../images/error.svg";

function InfoTooltip(props) {

  return (
    <section className={`popup ${props.isOpen ? "popup_opened" : ""}`} >

      <div className="popup__edit popup__edit-tooltip">
        <button className="popup__button-close popup__button-close_type_edit" type="button" onClick={props.onClose}></button>

        <img className="popup__status" src={props.isConfirmStatus ? success : error}
          alt={props.isConfirmStatus ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз"} />

        <p className="popup__message">{props.isConfirmStatus
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте еще раз."}</p>

      </div>
    </section>
  );
}

export default InfoTooltip;