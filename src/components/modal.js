// функции popup: карточки, добавления карточки, редактирования профиля, закрыть popup
export function openPopup(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", clickEscape);
}

export function closePopup(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", clickEscape);
}

export function clickOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

function clickEscape(evt) {
  if (evt.key === "Escape") {
    const popupIsOpened = document.querySelector(".popup_is-opened");
    closePopup(popupIsOpened);
  }
}
