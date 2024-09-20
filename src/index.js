import "./pages/index.css";
import { initialCards } from "./scripts/cards";
import { creatCard, deleteCard, likeCard } from "./components/card";
import {
  openPopupAddCard,
  closingPopup,
  openPopupCardImg,
  openPopupEditProfile,
} from "./components/modal";

// глобал const
const formElementEditProfile = document.querySelector(
  '.popup__form[name="edit-profile"]'
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const inputName = formElementEditProfile.querySelector(
  ".popup__input_type_name"
);
const inputDescription = formElementEditProfile.querySelector(
  ".popup__input_type_description"
);
const formElementNewPlace = document.querySelector(
  '.popup__form[name="new-place"]'
);
const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

// обработка submit
function handleFormSubmit(evt) {
  evt.preventDefault();

  let inputPlaceName = formElementNewPlace.querySelector(
    ".popup__input_type_card-name"
  );
  let inputLink = formElementNewPlace.querySelector(".popup__input_type_url");
  let elementSubmit = evt.target;
  if (elementSubmit.closest(".popup_type_edit")) {
    let inputNameValue = inputName.value;
    let inputDescriptionValue = inputDescription.value;
    profileTitle.textContent = inputNameValue;
    profileDescription.textContent = inputDescriptionValue;
    elementSubmit
      .closest(".popup_type_edit")
      .classList.remove("popup_is-opened");
  } else if (elementSubmit.closest(".popup_type_new-card")) {
    const obj = {
      name: `${inputPlaceName.value}`,
      link: `${inputLink.value}`,
    };
    placesList.prepend(creatCard(obj, deleteCard, likeCard, openPopupCardImg));
    inputPlaceName.value = "";
    inputLink.value = "";
    elementSubmit
      .closest(".popup_type_new-card")
      .classList.remove("popup_is-opened");
  }
}

// вызовы слушателей
formElementEditProfile.addEventListener("submit", handleFormSubmit);

formElementNewPlace.addEventListener("submit", handleFormSubmit);

profileEditButton.addEventListener("click", openPopupEditProfile);

profileAddButton.addEventListener("click", openPopupAddCard);

// вывод карточек на страницу 
initialCards.forEach(function (item) {
  placesList.append(creatCard(item, deleteCard, likeCard, openPopupCardImg));
});
