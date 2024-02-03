import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="places"
      title="Новое место"
      submit="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleNameChange}
        value={name}
        id="place-description"
        type="text"
        name="name"
        className="popup__input popup__input_place_description"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        autoComplete="off"
      />
      <span id="error-place-description" className="popup__error"></span>
      <input
        onChange={handleLinkChange}
        value={link}
        id="link"
        type="url"
        name="link"
        className="popup__input popup__input_place_link"
        placeholder="Ссылка на картинку"
        required
        autoComplete="off"
      />
      <span id="error-link" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
