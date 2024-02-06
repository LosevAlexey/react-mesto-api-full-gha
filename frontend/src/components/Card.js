import React from "react";
import Main from "../components/Main.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `places__like ${
    isLiked && "places__like_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="places__block">
      {isOwn && (
        <button
          type="button"
          className="places__trash places__trash_active"
          id="trashBotton"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="places__image"
        onClick={handleClick}
        src={props.image}
        alt={props.name}
      />
      <div className="places__place">
        <h2 className="places__title">{props.name}</h2>
        <div>
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <h2 className="places__number ">{props.likes}</h2>
        </div>
      </div>
    </div>
  );
}

export default Card;
