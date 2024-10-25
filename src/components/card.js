// функции создания, удаления, лайка карточки
export function creatCard(
  data,
  openPopupCardImg,
  objSettingForDeleteCard,
  objSettingForLikeCard,
  myId,
  openDeleteCardOk,
  checkMyLikeInCard
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
  const likeCounter = cardTemplateItemCopy.querySelector(
    ".card__like-button__counter"
  );

  // проверка на собственной карточки
  if (data["owner"]["_id"] !== myId) {
    cardDeleteButton.setAttribute("disabled", ""); // выключаем кнопки удаления если не наша карточка
    cardDeleteButton.classList.remove("card__delete-button_is-active"); // отобразили кнопку удаления
  } else {
    cardDeleteButton.classList.add("card__delete-button_is-active"); // скрыли кнопку удаления
    // если карточка моя вещаем на кнопку удаления слушатель клика
    cardDeleteButton.addEventListener("click", (evt) => {
      openDeleteCardOk(); // - функция которая открывает модалку при клике на кнопку удаления
      objSettingForDeleteCard.idCard = `${data["_id"]}`; // - перезаписали id в свойстве нашего объекта в index
      objSettingForDeleteCard.keyElementCard = evt.target.closest(".card"); // записали элемент в свойство объекта
    });
  }
  // проверка наличия моего лайка при создании карточки
  checkMyLikeInCard(data, myId, cardLikeButton);

  likeCounter.textContent = `${data.likes.length}`;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardLikeButton.addEventListener("click", (evt) => {
    objSettingForLikeCard.keyHandleLikeCard(evt, data, likeCounter);
  });
  cardImage.addEventListener("click", () => openPopupCardImg(data));
  return cardTemplateItemCopy;
}

export function deleteCardElement(element) {
  element.remove();
}

export function likeCard(element) {
  element.classList.toggle("card__like-button_is-active");
}
