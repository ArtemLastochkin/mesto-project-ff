// функции popup: карточки, добавления карточки, редактирования профиля, закрыть popup 
export function openPopupAddCard(evt) {
  const popupPseudoArr = document.querySelectorAll(".popup");
  const popupArr = Array.from(popupPseudoArr);

  for (let i = 0; i < popupArr.length; i += 1) {
    const popupsElement = popupArr[i];
    const placeClick = evt.target;
    if (
      placeClick.classList.contains("profile__add-button") &&
      popupsElement.className.includes("popup_type_new-card")
    ) {
      popupsElement.classList.add("popup_is-animated");
      setTimeout(() => {
        popupsElement.classList.add("popup_is-opened");
      }, 0);
    }

    document.addEventListener("keydown", closingPopup);
    popupsElement.addEventListener("click", closingPopup);
  }
}

export function openPopupEditProfile(evt) {
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
  const popupPseudoArr = document.querySelectorAll(".popup");
  const popupArr = Array.from(popupPseudoArr);
  for (let i = 0; i < popupArr.length; i += 1) {
    let popupsElement = popupArr[i];
    let placeClick = evt.target;
    if (
      placeClick.classList.contains("profile__edit-button") &&
      popupsElement.className.includes("popup_type_edit")
    ) {
      inputName.value = profileTitle.textContent;
      inputDescription.value = profileDescription.textContent;
      popupsElement.classList.add("popup_is-animated");
      setTimeout(() => {
        popupsElement.classList.add("popup_is-opened");
      }, 0);
    }

    document.addEventListener("keydown", closingPopup);
    popupsElement.addEventListener("click", closingPopup);
  }
}

export function openPopupCardImg(evt) {
  const popupPseudoArr = document.querySelectorAll(".popup");
  const popupArr = Array.from(popupPseudoArr);
  for (let i = 0; i < popupArr.length; i += 1) {
    let popupsElement = popupArr[i];
    let placeClick = evt.target;
    if (
      placeClick.classList.contains("card__image") &&
      popupsElement.className.includes("popup_type_image")
    ) {
      popupsElement.classList.add("popup_is-animated");
      setTimeout(() => {
        popupsElement.classList.add("popup_is-opened");
      }, 0);
      let popupImage = popupsElement.querySelector(".popup__image");
      let popupCaption = popupsElement.querySelector(".popup__caption");
      popupImage.src = placeClick.src;
      popupCaption.textContent = placeClick.alt;
    }
    document.addEventListener("keydown", closingPopup);
    popupsElement.addEventListener("click", closingPopup);
  }
}

export function closingPopup(evt) {
  const placeClick = evt.target;
  const popupsElementFlex = document.querySelector(
    ".popup_is-animated.popup_is-opened"
  );
  if (
    placeClick.classList.contains("popup") ||
    placeClick.classList.contains("popup__close") ||
    evt.key === "Escape"
  ) {
    popupsElementFlex.classList.remove("popup_is-opened");
  }
  placeClick.removeEventListener("click", closingPopup);
  document.removeEventListener("keydown", closingPopup);
}
