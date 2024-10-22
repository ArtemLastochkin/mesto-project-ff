// функции создания, удаления, лайка карточки
export function creatCard(
  data,
  openPopupCardImg,
  objSettingForDeleteCard,
  objSettingForLikeCard
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardTemplateItem = cardTemplate.querySelector(".places__item");
  const cardTemplateItemCopy = cardTemplateItem.cloneNode(true);
  const cardImage = cardTemplateItemCopy.querySelector(".card__image");
  const cardTitle = cardTemplateItemCopy.querySelector(".card__title");
  const cardDeleteButton = cardTemplateItemCopy.querySelector(
    ".card__delete-button"
  );
  const cardLikeButton =
    cardTemplateItemCopy.querySelector(".card__like-button");
  cardTemplateItemCopy.setAttribute("id", `${data["_id"]}`);

  // проверка на собственной карточки
  if (data["owner"]["_id"] !== "9d69c59e21fa2ffa88579137") {
    cardDeleteButton.setAttribute("disabled", ""); // выключаем кнопки удаления если не наша карточка
    cardDeleteButton.setAttribute("style", "display: none"); // выключаем кнопки удаления если не наша карточка
  } else {
    // если карточка моя вещаем на кнопку удаления слушатель клика
    cardDeleteButton.addEventListener("click", (evt) => {
      objSettingForDeleteCard.openDeleteCardOk(
        document.querySelector(
          `${objSettingForDeleteCard.keyPopupTypeDeleteCard}`
        )
      ); // - функция которая открывает модалку при клике на кнопку удаления
      objSettingForDeleteCard.idCard = `${data["_id"]}`; // - перезаписали id в свойстве нашего объекта в index
      document.forms[
        `${objSettingForDeleteCard.keyformTypeQuestionDelete}`
      ].addEventListener(
        "submit",
        objSettingForDeleteCard.keyHandleSubmitPopupQuestionDeleteCard
      ); // при клике на кнопку удаления вещаем слушатель Сабмит на форму
    });
  }
  // проверка наличия моего лайка при создании карточки
  if (
    data["likes"].find((element) => {
      return element._id.includes(`9d69c59e21fa2ffa88579137`);
    }) !== undefined
  ) {
    cardLikeButton.classList.add("card__like-button_is-active");
  } else {
    cardLikeButton.classList.remove("card__like-button_is-active");
  }
  
  cardTemplateItemCopy
    .querySelector(`${objSettingForLikeCard.keylikeCounter}`)
    .setAttribute("style", "display: block; text-align: center;");
  cardTemplateItemCopy.querySelector(
    `${objSettingForLikeCard.keylikeCounter}`
  ).textContent = `${data.likes.length}`;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardLikeButton.addEventListener(
    "click",
    objSettingForLikeCard.keyHandleLikeCard
  );
  cardImage.addEventListener("click", openPopupCardImg);
  return cardTemplateItemCopy;
}

export function deleteCardElement(element) {
  element.remove();
}

export function likeCard(element) {
  element.classList.toggle("card__like-button_is-active");
}
