// функции popup: карточки, добавления карточки, редактирования профиля, закрыть popup
export function openPopup(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", (evt) => clickEscape(evt, element));
}

export function closePopup(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", (evt) => clickEscape(evt, element));
}

export function clickOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

function clickEscape(evt, element) {
  if (evt.key === "Escape") {
    closePopup(element);
  }
}
