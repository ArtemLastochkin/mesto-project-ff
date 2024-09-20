// функции создания, удаления, лайка карточки
export function creatCard(data, deleteCard, likeCard, openPopupCardImg) {
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
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  cardDeleteButton.addEventListener("click", deleteCard);
  cardLikeButton.addEventListener("click", likeCard);
  cardImage.addEventListener("click", openPopupCardImg);
  return cardTemplateItemCopy;
}

export function deleteCard(evt) {
  const evtTarget = evt.target;
  const listItem = evtTarget.closest(".places__item");
  listItem.remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
