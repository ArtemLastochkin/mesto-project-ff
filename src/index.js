import "./pages/index.css";
import { creatCard, likeCard, deleteCardElement, checkLikeCard } from "./components/card";
import { closePopup, openPopup, clickOverlay } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import {
  getDataProfileFromServ,
  getCardsFromServ,
  setDataPofileServ,
  setNewCardServ,
  deleteCard,
  setLikeCard,
  setAvatarPofileServ,
} from "./components/api";

// =======================================Константы=======================================
// глобал const
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileImage = document.querySelector(".profile__image");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeNewAvatar = document.querySelector(".popup_type_new-avatar");
const popupDeleteQuestion = document.querySelector(".popup_type_delete-card");

const formTypeEditProfile = document.forms["edit-profile"];
const formTypeNewCard = document.forms["new-place"];
const formTypeNewAvatar = document.forms["new-avatar"];
const formTypeQuestionDelete = document.forms["question-delete"];

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

// =======================================Объекты настроек=======================================
// глобал объекты настроек

const validationSetting = {
  keyPopapInput: ".popup__input",
  keyPopupForm: ".popup__form",
  keyIdSpanError: "__error_message",
  keyDeleteBtn: "[type=submit]",
};

const objSettingForDeleteCard = {
  idCard: "",
  keyElementCard: "",
};

// =======================================Функция открыть окно подтверждения=======================================
function openDeleteCardOk(id, element) {
  objSettingForDeleteCard.idCard = id;
  objSettingForDeleteCard.keyElementCard = element;
  openPopup(popupDeleteQuestion);
}

// =======================================Функции изменения текста во время загрузки=======================================
function setTextLoadingBtnDel(form) {
  form.querySelector(`${validationSetting.keyDeleteBtn}`).textContent =
    "Сохранение...";
}

function deleteTextLoadingBtnDel(form) {
  form.querySelector(`${validationSetting.keyDeleteBtn}`).textContent =
    "Сохранить";
}

// =======================================Функции Обработка кликов=======================================
// обработчик клика по карточке
function openPopupCardImg(data) {
  imagePopupTypeImage.src = data.link;
  imagePopupTypeImage.alt = data.name;
  textPopupTypeImage.textContent = data.name;
  openPopup(popupTypeImage);
}

// обработка поставить лайк
function handleLikeCard(evt, dataCard, likeCounter) {
  if (!checkLikeCard(evt.target)) {
    setLikeCard(dataCard._id)
      .then((res) => {
        likeCard(evt.target);
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  } else {
    deleteCard(`likes/${dataCard._id}`)
      .then((res) => {
        likeCard(evt.target);
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  }
}

// =======================================Функции Обработка сабмитов=======================================
// обработка submit для редактирования профиля
function editProfileFormSubmit(evt) {
  evt.preventDefault();
  setTextLoadingBtnDel(evt.target);
  setDataPofileServ(
    inputNamePopupTypeEdit.value,
    inputDescriptionPopupTypeEdit.value
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(function () {
      deleteTextLoadingBtnDel(evt.target);
    });
}

// обработка submit для создания карточки
function addNewCardFormSubmit(evt) {
  evt.preventDefault();
  setTextLoadingBtnDel(evt.target);
  setNewCardServ(inputPlaceNameTypeNewCard.value, inputlinkTypeNewCard.value)
    .then((res) => {
      placesList.prepend(
        creatCard(
          res,
          openPopupCardImg,
          handleLikeCard,
          res[`owner`][`_id`],
          openDeleteCardOk
        )
      );
      closePopup(popupTypeNewCard);
      inputPlaceNameTypeNewCard.value = "";
      inputlinkTypeNewCard.value = "";
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(function () {
      deleteTextLoadingBtnDel(evt.target);
    });
}

// обработка submit удаления карточки
function handleSubmitPopupQuestionDeleteCard(evt, id, element) {
  evt.preventDefault();
  deleteCard(id)
    .then(() => {
      deleteCardElement(element);
      closePopup(popupDeleteQuestion);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

// обработка submit нового аватара
function handleSubmitPopupNewAvatar(evt) {
  evt.preventDefault();
  setTextLoadingBtnDel(evt.target);
  const valueInputUrlPopupTypeNewAvatar = evt.target.querySelector(
    `${validationSetting.keyPopapInput}`
  ).value;
  setAvatarPofileServ(valueInputUrlPopupTypeNewAvatar)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      profileImage.setAttribute(
        "style",
        `background-image: url(${res.avatar})`
      );
      closePopup(popupTypeNewAvatar);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(function () {
      deleteTextLoadingBtnDel(evt.target);
    });
}

// ==========================================================Вызовы функций=======================================
// включить валидацию форм
enableValidation(validationSetting);

// ==========================================================Слушатели кликов=======================================
// клик на аватар
profileImage.addEventListener("click", function () {
  formTypeNewAvatar.querySelector(
    `${validationSetting.keyPopapInput}`
  ).value = ``;
  clearValidation(formTypeNewAvatar, validationSetting);
  formTypeNewAvatar.addEventListener("submit", handleSubmitPopupNewAvatar);
  openPopup(popupTypeNewAvatar);
});

// клик по кнопке редактировать профиль
profileEditButton.addEventListener("click", function (evt) {
  openPopup(popupTypeEdit);
  inputNamePopupTypeEdit.value = profileTitle.textContent;
  inputDescriptionPopupTypeEdit.value = profileDescription.textContent;
  clearValidation(formTypeEditProfile, validationSetting);
});

// клик по кнопке добавить карточку
profileAddButton.addEventListener("click", function (evt) {
  openPopup(popupTypeNewCard);
  clearValidation(formTypeNewCard, validationSetting);
});

// =========================================================Слушатели сабмит=======================================
// слушатели submit для форм редактирования профиля
formTypeEditProfile.addEventListener("submit", editProfileFormSubmit);
formTypeNewCard.addEventListener("submit", addNewCardFormSubmit);
formTypeQuestionDelete.addEventListener("submit", function (evt) {
  handleSubmitPopupQuestionDeleteCard(
    evt,
    objSettingForDeleteCard.idCard,
    objSettingForDeleteCard.keyElementCard
  );
});

// =======================================Вызовы при старте страницы=======================================
// +класс при старте, +слушатель на кнопку крестик, +слушатель на оверлей popup
popupArr.forEach(function (item) {
  item.classList.add("popup_is-animated");
  item
    .querySelector(".popup__close")
    .addEventListener("click", (evt) => closePopup(item));
  item.addEventListener("click", clickOverlay);
});

// ОТОБРАЖЕНИЕ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
Promise.all([getCardsFromServ(), getDataProfileFromServ()])
  .then((res) => {
    // Вписали данные от сервера в профиль и вывели на страницу
    profileTitle.textContent = res[1]["name"];
    profileDescription.textContent = res[1]["about"];
    profileImage.setAttribute(
      "style",
      `background-image: url(${res[1]["avatar"]})`
    );

    // Вывод карточек на страницу
    res[0].forEach(function (item) {
      placesList.append(
        creatCard(
          item,
          openPopupCardImg,
          handleLikeCard,
          res[1][`_id`],
          openDeleteCardOk
        )
      );
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
