import React from "react";
import api from "../utils/api.js";
import Card from "../components/Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt="Фото автора"
        />
        <button
          className="profile__avatar-button"
          type="button"
          onClick={props.onEditAvatar}
        ></button>
        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__author">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              id="editBotton"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section>
        <ul className="places">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              name={card.name}
              likes={card.likes.length}
              image={card.link}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
