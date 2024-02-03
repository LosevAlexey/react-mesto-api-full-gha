import React from "react";

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_auth">
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        />
        <img className="popup__status" src={props.image} alt={props.message} />
        <h2 className="popup__message">{props.message}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
