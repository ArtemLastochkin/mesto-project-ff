import "./pages/index.css";
import { initialCards } from "./scripts/cards";
import { creatCard, deleteCard, likeCard } from "./components/card";
import { closePopup, openPopup, clickOverlay } from "./components/modal";

// глобал const
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

const formTypeEditProfile = document.forms["edit-profile"];
const formTypeNewCard = document.forms["new-place"];

const inputNamePopupTypeEdit = document.forms["edit-profile"].elements.name;
const inputDescriptionPopupTypeEdit =
  document.forms["edit-profile"].elements.description;
const inputPlaceNameTypeNewCard =
  document.forms["new-place"].elements["place-name"];
const inputlinkTypeNewCard = document.forms["new-place"].elements.link;

const imagePopupTypeImage = popupTypeImage.querySelector("img");
const textPopupTypeImage = popupTypeImage.querySelector(".popup__caption");

const placesList = document.querySelector(".places__list");
const popupPseudoArr = document.querySelectorAll(".popup");
const popupArr = Array.from(popupPseudoArr);

// обработчик клика по карточке
function openPopupCardImg(evt) {
  imagePopupTypeImage.src = evt.target.src;
  imagePopupTypeImage.alt = evt.target.alt;
  textPopupTypeImage.textContent = evt.target.alt;
  openPopup(popupTypeImage);
}

// обработка submit для редактирования профиля
function editProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputNamePopupTypeEdit.value;
  profileDescription.textContent = inputDescriptionPopupTypeEdit.value;
  closePopup(evt.target.closest(".popup"));
}

// обработка submit для создания карточки
function addNewCardFormSubmit(evt) {
  evt.preventDefault();
  const newObj = {
    name: `${inputPlaceNameTypeNewCard.value}`,
    link: `${inputlinkTypeNewCard.value}`,
  };
  placesList.prepend(creatCard(newObj, deleteCard, likeCard, openPopupCardImg));
  inputPlaceNameTypeNewCard.value = "";
  inputlinkTypeNewCard.value = "";
  closePopup(evt.target.closest(".popup"));
}

// клик по кнопке редактировать профиль
profileEditButton.addEventListener("click", function (evt) {
  openPopup(popupTypeEdit);
  inputNamePopupTypeEdit.value = profileTitle.textContent;
  inputDescriptionPopupTypeEdit.value = profileDescription.textContent;
});

// клик по кнопке добавить карточку
profileAddButton.addEventListener("click", (evt) =>
  openPopup(popupTypeNewCard)
);

// слушатели submit для форм редактирования профиля
formTypeEditProfile.addEventListener("submit", editProfileFormSubmit);

formTypeNewCard.addEventListener("submit", addNewCardFormSubmit);

// +класс при старте, +слушатель на кнопку крестик, +слушатель на оверлей popup
popupArr.forEach(function (item) {
  item.classList.add("popup_is-animated");
  item
    .querySelector(".popup__close")
    .addEventListener("click", (evt) => closePopup(item));
  item.addEventListener("click", clickOverlay);
});

// вывод карточек на страницу
initialCards.forEach(function (item) {
  placesList.append(creatCard(item, deleteCard, likeCard, openPopupCardImg));
});
