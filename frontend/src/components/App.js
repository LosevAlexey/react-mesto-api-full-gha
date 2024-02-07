import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import {
  HashRouter,
  Route,
  Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth.js";
import red from "../images/red.svg";
import black from "../images/black.png";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [tooltipImage, setTooltipImage] = React.useState("");
  const [tooltipTitle, setTooltipTitle] = React.useState("");
  const [tooltipInfo, setTooltipInfo] = React.useState(false);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState(null);

  React.useEffect(() => {
    if (!loggedIn) return;

    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo.data);
        setCards(initialCards);
      })
      .catch((error) => console.error(`Ошибка - ${error}`));
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    if (!isLiked) {
      api
        .putLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard.data : c))
          );
        })
        .catch((error) => console.error(`Ошибка - ${error}`));
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard.data : c))
          );
        })
        .catch((error) => console.error(`Ошибка - ${error}`));
    }
  }

  function handleCardDelete(card) {
    api
      .deletePlace(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => console.error(`Ошибка - ${error}`));
  }

  function handleUpdateUser(name, description) {
    api
      .changeUserInfo(name, description)
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка - ${error}`));
  }

  function handleUpdateAvatar(link) {
    api
      .changeAvatar(link)
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка - ${error}`));
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .addCardPlace(name, link)
      .then((newCard) => {
        console.log(newCard);
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка - ${error}`));
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleTooltipInfo() {
    setTooltipInfo(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setTooltipInfo(false);
  }

  function onRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setTooltipImage(black);
        setTooltipTitle("Вы успешно зарегистрировались!");
        navigate("/sign-in", { replace: true });
      })
      .catch(() => {
        setTooltipImage(red);
        setTooltipTitle("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(handleTooltipInfo);
  }

  function onLogin(email, password) {
    auth
      .login(email, password)

      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setEmail(email);
        navigate("/", { replace: true });
      })
      .catch(() => {
        setTooltipImage(red);
        setTooltipTitle("Что-то пошло не так! Попробуйте ещё раз.");
        handleTooltipInfo();
      });
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
          }
        })
        .catch((error) => console.error(`Ошибка - ${error}`));
    }
  }, []);

  React.useEffect(() => {
    if (loggedIn === true) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  function onSignOut() {
    setLoggedIn(false);
    setEmail(null);
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} email={email} onClick={onSignOut} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onClose={closeAllPopups}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={onRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={onLogin} />} />
        </Routes>

        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <InfoTooltip
          message={tooltipTitle}
          image={tooltipImage}
          isOpen={tooltipInfo}
          onClose={closeAllPopups}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
