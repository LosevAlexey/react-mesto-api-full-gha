import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_more ${
        props.card ? `popup_opened` : ""
      }`}
    >
      <div className="popup__container popup__container_type_more">
        <button
          type="button"
          className="popup__close popup__close_type_more"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__image"
          src={props.card ? props.card.link : ""}
          alt={props.card ? props.card.name : ""}
        />
        <h2 className="popup__description">
          {props.card ? props.card.name : ""}
        </h2>
      </div>
    </div>
  );
}

export default ImagePopup;
