import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? `popup_opened`: ""}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <form className={`popup__close_${props.name}`} onSubmit={props.onSubmit}>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button className="popup__button" type="submit">{props.submit}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
