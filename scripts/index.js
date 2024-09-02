// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const cardTemplateItem = cardTemplate.querySelector(".places__item");

// @todo: Функция создания карточки
const creatCard = (arr, deleteCard) => {
  // создаем клон темплейта
  const cardTemplateItemCopy = cardTemplateItem.cloneNode(true);
  cardImage = cardTemplateItemCopy.querySelector(".card__image");
  cardTitle = cardTemplateItemCopy.querySelector(".card__title");
  cardDeleteButton = cardTemplateItemCopy.querySelector(".card__delete-button");
  // меняем значение свойств (добавляем данные из массива в свйства)
  cardImage.src = arr.link;
  cardImage.alt = arr.name;
  cardTitle.textContent = arr.name;
  // функция удаления по клику на кнопку удаления
  cardDeleteButton.addEventListener("click", deleteCard);
  // вернули созданную карточку
  return cardTemplateItemCopy;
};

// @todo: Функция удаления карточки
const deleteCard = (evt) => {
  // находим при помощи event кнопку на которую нажимаем
  const evtTarget = evt.target;
  // находим ближайшего родителя элемента на который нажимаем
  const listItem = evtTarget.closest(".places__item");
  // удалили ближайшего родителя элемента на который нажимаем (тем самым удалив элемент списка целиком)
  listItem.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  placesList.append(creatCard(item, deleteCard));
});
