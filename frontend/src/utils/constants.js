export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
};

export const popupEditProfile = document.querySelector(
  ".popup_type_edit-profile"
);
export const popupEditProfileAvatar =
  document.querySelector(".popup_type_avatar");
export const popupAddPlace = document.querySelector(".popup_type_places");
export const popupImages = document.querySelector(".popup_type_more");
export const popupDeletePlace = document.querySelector(".popup_type_delete");
export const buttonOpenEditProfile = document.querySelector(
  ".profile__edit-button"
);
export const buttonOpenEditProfileAvatar = document.querySelector(
  ".profile__avatar-button"
);
export const buttonOpenPopupAddPlace = document.querySelector(".profile__add");
export const formPopupAddPlace = document.querySelector(".popup__form_place");
export const nameInputeditProfile = document.querySelector(
  ".popup__input_form_name"
);
export const descriptionInputeditProfile = document.querySelector(
  ".popup__input_form_description"
);
export const authorEditProfile = document.querySelector(".profile__author");
export const avatarEditProfile = document.querySelector(".profile__avatar");
export const descriptionEditProfile = document.querySelector(
  ".profile__description"
);
export const profileElement = document.querySelector("#edit-profile");
export const cardFormElement = document.querySelector("#places");
export const avatarFormElement = document.querySelector("#avatarForm");
