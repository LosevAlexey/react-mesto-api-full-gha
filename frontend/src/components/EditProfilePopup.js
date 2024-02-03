import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, props.isOpen]); 

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
        name: name,
        description: description,
    });
  } 

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      submit="Сохранить"
    >
      <input
        onChange={handleNameChange}
        value={name || ''}
        id="name"
        type="text"
        name="name"
        className="popup__input popup__input_form_name"
        required
        minLength="2"
        maxLength="40"
        autoComplete="off"
      />
      <span id="error-name" className="popup__error"></span>
      <input
        onChange={handleDescriptionChange}
        value={description || ''}
        id="description"
        type="text"
        name="description"
        className="popup__input popup__input_form_description"
        required
        minLength="2"
        maxLength="200"
        autoComplete="off"
      />
      <span id="error-description" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
