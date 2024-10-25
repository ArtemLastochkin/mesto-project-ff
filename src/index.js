import "./pages/index.css";
import { creatCard, likeCard, deleteCardElement } from "./components/card";
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

const objSettingForLikeCard = {
  keyHandleLikeCard: handleLikeCard,
};

const objSettingForDeleteCard = {
  keyPopupTypeDeleteCard: `.popup_type_delete-card`,
  openDeleteCardOk: () => {
    const popupDeleteQuestion = document.querySelector(
      `${objSettingForDeleteCard.keyPopupTypeDeleteCard}`
    );
    openPopup(popupDeleteQuestion);
  },
  idCard: "",
  keyElementCard: "",
  popupTypeDeleteCard: "",
  keyHandleSubmitPopupQuestionDeleteCard: handleSubmitPopupQuestionDeleteCard,
};

// =======================================Функция проверки наличия лайка=======================================
function checkMyLikeInCard(data, myId, cardLikeButton) {
  if (
    data["likes"].find((element) => {
      return element._id.includes(myId);
    }) !== undefined
  ) {
    cardLikeButton.classList.add("card__like-button_is-active");
  } else {
    cardLikeButton.classList.remove("card__like-button_is-active");
  }
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
  const btnLike = evt.target;

  if (!btnLike.classList.contains("card__like-button_is-active")) {
    setLikeCard(dataCard._id)
      .then((res) => {
        likeCard(btnLike);
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  } else if (btnLike.classList.contains("card__like-button_is-active")) {
    deleteCard(`likes/${dataCard._id}`)
      .then((res) => {
        likeCard(btnLike);
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
      deleteTextLoadingBtnDel(evt.target);
      console.log(err); // выводим ошибку в консоль
    });
}

// обработка submit для создания карточки
function addNewCardFormSubmit(evt) {
  evt.preventDefault();
  setTextLoadingBtnDel(evt.target);
  setNewCardServ(inputPlaceNameTypeNewCard.value, inputlinkTypeNewCard.value)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      placesList.prepend(
        creatCard(
          res,
          openPopupCardImg,
          objSettingForDeleteCard,
          objSettingForLikeCard,
          res[`owner`][`_id`],
          objSettingForDeleteCard.openDeleteCardOk,
          checkMyLikeInCard
        )
      );
      closePopup(popupTypeNewCard);
      inputPlaceNameTypeNewCard.value = "";
      inputlinkTypeNewCard.value = "";
    })
    .catch((err) => {
      deleteTextLoadingBtnDel(evt.target);
      console.log(err); // выводим ошибку в консоль
    });
}

// обработка submit удаления карточки
function handleSubmitPopupQuestionDeleteCard(evt) {
  evt.preventDefault();
  deleteCard(objSettingForDeleteCard.idCard)
    .then(() => {
      deleteCardElement(objSettingForDeleteCard.keyElementCard);
      closePopup(
        document.querySelector(
          `${objSettingForDeleteCard.keyPopupTypeDeleteCard}`
        )
      );
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
      deleteTextLoadingBtnDel(evt.target);
      console.log(err); // выводим ошибку в консоль
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
  deleteTextLoadingBtnDel(formTypeNewAvatar);
  clearValidation(formTypeNewAvatar, validationSetting);
  popupTypeNewAvatar
    .querySelector(".popup__content")
    .setAttribute("style", "min-height: 0px;");
  formTypeNewAvatar.addEventListener("submit", handleSubmitPopupNewAvatar);
  openPopup(popupTypeNewAvatar);
});

// клик по кнопке редактировать профиль
profileEditButton.addEventListener("click", function (evt) {
  deleteTextLoadingBtnDel(formTypeEditProfile);
  openPopup(popupTypeEdit);
  inputNamePopupTypeEdit.value = profileTitle.textContent;
  inputDescriptionPopupTypeEdit.value = profileDescription.textContent;
  clearValidation(formTypeEditProfile, validationSetting);
});

// клик по кнопке добавить карточку
profileAddButton.addEventListener("click", function (evt) {
  deleteTextLoadingBtnDel(formTypeNewCard);
  openPopup(popupTypeNewCard);
  clearValidation(formTypeNewCard, validationSetting);
});

// =========================================================Слушатели сабмит=======================================
// слушатели submit для форм редактирования профиля
formTypeEditProfile.addEventListener("submit", editProfileFormSubmit);
formTypeNewCard.addEventListener("submit", addNewCardFormSubmit);
formTypeQuestionDelete.addEventListener(
  "submit",
  objSettingForDeleteCard.keyHandleSubmitPopupQuestionDeleteCard
);

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
          objSettingForDeleteCard,
          objSettingForLikeCard,
          res[1][`_id`],
          objSettingForDeleteCard.openDeleteCardOk,
          checkMyLikeInCard
        )
      );
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
