import "./pages/index.css";
import { creatCard, likeCard, deleteCardElement } from "./components/card";
import { closePopup, openPopup, clickOverlay } from "./components/modal";
import { enableValidation, clearValidation } from "./validation";
import {
  getDataProfileFromServ,
  getCardsFromServ,
  setDataPofileServ,
  setNewCardServ,
  deleteCard,
  setLikeCard,
  setAvatarPofileServ,
} from "./api";

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
const objectClearValidation = {
  keyIdSpanError: "__error_message",
  keyPopapInput: ".popup__input",
  keyDeleteBtn: "[type=submit]",
};

const validationSetting = {
  keyPopapInput: ".popup__input",
  keyPopupForm: ".popup__form",
  keyIdSpanError: "__error_message",
  keyDeleteBtn: "[type=submit]",
};

const objSettingForLikeCard = {
  keyPlacesItem: ".places__item",
  keylikeCounter: ".card__like-counter",
  keyHandleLikeCard: handleLikeCard,
};

const objSettingForDeleteCard = {
  keyformTypeQuestionDelete: "question-delete",
  keyPopupTypeDeleteCard: `.popup_type_delete-card`,
  keyPopupContentTypeDeleteCard: `.popup_type_delete-card .popup__content`,
  keyBtnOkPopupTypeDeleteCard: `.popup_type_delete-card [type=submit]`,
  openDeleteCardOk: (popupDeleteQuestion) => {
    document
      .querySelector(`${objSettingForDeleteCard.keyPopupContentTypeDeleteCard}`)
      .setAttribute("style", "min-height: 0px;");
    document
      .querySelector(`${objSettingForDeleteCard.keyBtnOkPopupTypeDeleteCard}`)
      .setAttribute("style", "margin-block-start: 38px;");
    document.forms[
      `${objSettingForDeleteCard.keyformTypeQuestionDelete}`
    ].setAttribute("style", "margin-block-start: 0px;");
    openPopup(popupDeleteQuestion);
  },
  idCard: "",
  popupTypeDeleteCard: "",
  keyHandleSubmitPopupQuestionDeleteCard: handleSubmitPopupQuestionDeleteCard,
};

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
function openPopupCardImg(evt) {
  imagePopupTypeImage.src = evt.target.src;
  imagePopupTypeImage.alt = evt.target.alt;
  textPopupTypeImage.textContent = evt.target.alt;
  openPopup(popupTypeImage);
}
// обработка клика по лайку
function handleLikeCard(evt) {
  const cardLike = evt.target.closest(`${objSettingForLikeCard.keyPlacesItem}`);
  const likeCounter = cardLike.querySelector(
    `${objSettingForLikeCard.keylikeCounter}`
  );
  const btnLike = evt.target;
  getCardsFromServ().then((res) => {
    // сохранили в переменную карточку на которой произошел клик по лайку
    const cardClick = res.find((element) => {
      return element._id === cardLike.id;
    });
    // сохранили в переменную значение:
    // undefind - если лайкнутая карточка не содежит мой id
    const booleanMyIdInListLike =
      cardClick["likes"].find((element) => {
        return element._id.includes(`9d69c59e21fa2ffa88579137`);
      }) !== undefined;

    if (booleanMyIdInListLike) {
      deleteCard(`likes/${cardClick._id}`).then((res) => {
        likeCard(btnLike);
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
    } else {
      setLikeCard(cardClick._id).then((res) => {
        likeCard(btnLike);
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
    }
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
}

// =======================================Функции Обработка сабмитов=======================================
// обработка submit для редактирования профиля
function editProfileFormSubmit(evt) {
  evt.preventDefault();
  setTextLoadingBtnDel(evt.target);
  setDataPofileServ(
    inputNamePopupTypeEdit.value,
    inputDescriptionPopupTypeEdit.value
  ).then(() => {
    getDataProfileFromServ().then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
}

// обработка submit для создания карточки
function addNewCardFormSubmit(evt) {
  evt.preventDefault();
  setTextLoadingBtnDel(evt.target);
  setNewCardServ(
    inputPlaceNameTypeNewCard.value,
    inputlinkTypeNewCard.value
  ).then(() => {
    getCardsFromServ().then((res) => {
      placesList.prepend(
        creatCard(
          res[0],
          openPopupCardImg,
          objSettingForDeleteCard,
          objSettingForLikeCard
        )
      );
      closePopup(popupTypeNewCard);
      inputPlaceNameTypeNewCard.value = "";
      inputlinkTypeNewCard.value = "";
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
}

// обработка submit удаления карточки
function handleSubmitPopupQuestionDeleteCard(evt) {
  evt.preventDefault();
  deleteCard(objSettingForDeleteCard.idCard).then((res) => {
    Array.from(document.querySelectorAll(".card")).forEach((i) => {
      if (i.id === objSettingForDeleteCard.idCard) {
        deleteCardElement(i);
      }
    });
    getCardsFromServ().then((res) => {
      res.forEach(function (item) {
        placesList.append(
          creatCard(
            item,

            openPopupCardImg,
            objSettingForDeleteCard,
            objSettingForLikeCard
          )
        );
      });
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
  closePopup(
    document.querySelector(`${objSettingForDeleteCard.keyPopupTypeDeleteCard}`)
  );
  document.removeEventListener(
    "submit",
    objSettingForDeleteCard.handleSubmitPopupQuestionDeleteCard
  );
}

// обработка submit нового аватара
function handleSubmitPopupNewAvatar(evt) {
  evt.preventDefault();
  setTextLoadingBtnDel(evt.target);
  const valueInputUrlPopupTypeNewAvatar = evt.target.querySelector(
    `${validationSetting.keyPopapInput}`
  ).value;
  setAvatarPofileServ(valueInputUrlPopupTypeNewAvatar).then((res) => {
    getDataProfileFromServ().then((res) => {
      profileImage.setAttribute(
        "style",
        `background-image: url(${res.avatar})`
      );
      closePopup(popupTypeNewAvatar);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
}

// ==========================================================Вызовы функций=======================================
// включить валидацию форм
enableValidation(validationSetting);

// ==========================================================Слушатели кликов=======================================
// клик на аватар
profileImage.addEventListener("click", function () {
  popupTypeNewAvatar.querySelector('.popup__content').setAttribute("style", "min-height: 0px;");
  deleteTextLoadingBtnDel(formTypeNewAvatar);
  openPopup(popupTypeNewAvatar);
  formTypeNewAvatar.addEventListener("submit", handleSubmitPopupNewAvatar);
  clearValidation(formTypeNewAvatar, objectClearValidation);
});

// клик по кнопке редактировать профиль
profileEditButton.addEventListener("click", function (evt) {
  deleteTextLoadingBtnDel(formTypeEditProfile);
  openPopup(popupTypeEdit);
  inputNamePopupTypeEdit.value = profileTitle.textContent;
  inputDescriptionPopupTypeEdit.value = profileDescription.textContent;
  clearValidation(formTypeEditProfile, objectClearValidation);
});

// клик по кнопке добавить карточку
profileAddButton.addEventListener("click", function (evt) {
  deleteTextLoadingBtnDel(formTypeNewCard);
  openPopup(popupTypeNewCard);
  clearValidation(formTypeNewCard, objectClearValidation);
});

// =========================================================Слушатели сабмит=======================================
// слушатели submit для форм редактирования профиля
formTypeEditProfile.addEventListener("submit", editProfileFormSubmit);
formTypeNewCard.addEventListener("submit", addNewCardFormSubmit);

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
Promise.all([getCardsFromServ(), getDataProfileFromServ()]).then((res) => {
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
        objSettingForLikeCard
      )
    );
  });
})
.catch((err) => {
  console.log(err); // выводим ошибку в консоль
});

