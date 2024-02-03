import React from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup(props) {

    const avatarRef = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });

      } 

    React.useEffect(() => {
        avatarRef.current.value = '';
      }, [props.isOpen]); 

  return (
    <PopupWithForm
  name='avatar'
  title='Обновить аватар'
  submit='Сохранить'
  isOpen={props.isOpen}
  onClose={props.onClose}
  onSubmit={handleSubmit}
  >
    <input ref={avatarRef} id="avatar" type="url" name="avatar" className="popup__input popup__input_avatar" placeholder="Ссылка на картинку" required autoComplete="off"/>
    <span id="error-avatar" className="popup__error"></span>
  </PopupWithForm>
  );
}

export default EditAvatarPopup;
