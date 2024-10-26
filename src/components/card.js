// функции создания, удаления, лайка карточки
export function creatCard(
  data,
  openPopupCardImg,
  handleLikeCard,
  myId,
  openDeleteCardOk,
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
      openDeleteCardOk(`${data["_id"]}`, evt.target.closest(".card")); // - функция которая открывает модалку при клике на кнопку удаления
    });
  }
  // проверка наличия моего лайка при создании карточки
  const booleanMyIdInArrayLikes = Boolean(data["likes"].find(element => element._id.includes(myId)))
  cardLikeButton.classList.toggle("card__like-button_is-active", booleanMyIdInArrayLikes);

  likeCounter.textContent = `${data.likes.length}`;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardLikeButton.addEventListener("click", (evt) => {
    handleLikeCard(evt, data, likeCounter);
  });
  cardImage.addEventListener("click", () => openPopupCardImg(data));
  return cardTemplateItemCopy;
}

export function deleteCardElement(element) {
  element.remove();
}

export function checkLikeCard(buttonLike) {
 return buttonLike.classList.contains("card__like-button_is-active")
}

export function likeCard(element) {
  element.classList.toggle("card__like-button_is-active");
}
