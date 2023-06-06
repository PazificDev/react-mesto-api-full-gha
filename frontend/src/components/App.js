import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as Auth from "../utils/Auth";
import "../index.css";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isIfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState();
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  });
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  };

  const handleRegister = (password, email) => {
    Auth.register(password, email)
      .then(() => {
        setIsSuccess(true);
        handleInfoPopupOpen();
        navigate("/sign-in", { replace: true });
      })
      .catch(() => {
        setIsSuccess(false);
        handleInfoPopupOpen();
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(formValue.email);

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleCheckLogin = (e) => {
    e.preventDefault();
    const { password, email } = formValue;
    Auth.login(password, email)
      .then((data) => {
        if (data.token) {
          setFormValue({ password: "", email: "" });
          handleLogin(e);
          navigate("/main", { replace: true });
        }
      })
      .catch(() => {
        setIsSuccess(false);
        handleInfoPopupOpen();
      });
  };

  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => {
          alert(err);
        });
    }
    // eslint-disable-next-line
  }, [loggedIn]);

  function handleLogin(e) {
    e.preventDefault();
    setLoggedIn(true);
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            navigate("/main", { replace: true });
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleInfoPopupOpen() {
    setIsInfoPopupOpen(true);
  }

  function handleOpenPicture(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setSelectedCard(null);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoPopupOpen(false);
    setIsSuccess(null);
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isIfoPopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        alert(err);
      });
  }

  function handleUpdateUser(dataSet) {
    setIsLoading(true);
    api
      .patchUserInfo(dataSet)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(dataSet) {
    setIsLoading(true);
    api
      .patchUserPhoto(dataSet)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(dataSet) {
    setIsLoading(true);
    api
      .postNewCard(dataSet)
      .then((data) => {
        setCards([data, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Login
              handleLogin={handleLogin}
              setEmail={setEmail}
              onChange={handleChange}
              onLogin={handleCheckLogin}
              setIsSuccess={setIsSuccess}
              handleInfoPopupOpen={handleInfoPopupOpen}
            />
          }
        />
        <Route
          path="/sign-up"
          element={<Register onRegister={handleRegister} />}
        />
        <Route
          path="/"
          element={
            loggedIn ? (
              <Navigate to="/main" replace />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />
        <Route
          path="/main"
          element={
            <ProtectedRoute
              path="/main"
              loggedIn={loggedIn}
              element={Main}
              email={email}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
              onCardClick={handleOpenPicture}
              onSignOut={signOut}
            />
          }
        />
      </Routes>

      {loggedIn && <Footer />}

      <EditProfilePopup
        isLoading={isLoading}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isLoading={isLoading}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup
        isLoading={isLoading}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <PopupWithForm name="deleteCard" title="Вы уверены?" btnText="Да" />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <InfoToolTip
        onClose={closeAllPopups}
        isSuccess={isSuccess}
        isOpen={isIfoPopupOpen}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
