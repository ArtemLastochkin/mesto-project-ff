// включение валидации
export function enableValidation(obj) {
  Array.from(document.querySelectorAll(`${obj.keyPopapInput}`)).forEach(
    (item) => {
      item.addEventListener("input", (evt) => {
        const formActive = evt.target.closest(`${obj.keyPopupForm}`);
        const activeInputEvent = evt.target;
        checkValidate(formActive, obj, activeInputEvent);
      });
    }
  );
}

// ФУНКЦИЯ проверки валидации поля
function checkValidate(form, obj, activeInputEvent) {
  const booleanArrayInpitsAllValid = Array.from(
    form.querySelectorAll(`${obj.keyPopapInput}`)
  ).every((i) => i.validity.valid);
  if (!activeInputEvent.validity.valid) {
    showError(form, obj, activeInputEvent);
  } else {
    clearError(form, obj, activeInputEvent, booleanArrayInpitsAllValid);
  }
}

// ФУНКЦИЯ показа ошибки
function showError(form, obj, activeInputEvent) {
  inactiveBtnSubmit(form.querySelector(`${obj.keyDeleteBtn}`));
  const spanErrorNotValidInput = form.querySelector(
    `#${activeInputEvent.id + obj.keyIdSpanError}`
  );
  activeInputEvent.classList.add("popup__input-error");
  spanErrorNotValidInput.classList.add("popup__error-message");

  if (activeInputEvent.validity.patternMismatch) {
    spanErrorNotValidInput.textContent = activeInputEvent.dataset.errorMessage;
  } else {
    spanErrorNotValidInput.textContent = activeInputEvent.validationMessage;
  }
}

// ФУНКЦИЯ очистки ошибки
function clearError(form, obj, activeInputEvent, booleanArrayInpitsAllValid) {
  if (booleanArrayInpitsAllValid) {
    // сделать кнопку активной если все инпуты валидны
    activeBtnSubmit(form.querySelector(`${obj.keyDeleteBtn}`));
  }
  activeInputEvent.classList.remove("popup__input-error");
  form.querySelector(
    `#${activeInputEvent.id + obj.keyIdSpanError}`
  ).textContent = "";
}

// ФУНКЦИЯ сделать неактивной кнопку отправки
function inactiveBtnSubmit(elm) {
  elm.classList.add("popup__button__no-active");
  elm.setAttribute("disabled", "");
}

// ФУНКЦИЯ сделать активной кнопку отправки
function activeBtnSubmit(elm) {
  elm.classList.remove("popup__button__no-active");
  elm.removeAttribute("disabled");
}

// Очистка валидации при открытии модал
export function clearValidation(form, obj) {
  const booleanArrayInpitsAllValid = Array.from(
    form.querySelectorAll(`${obj.keyPopapInput}`)
  ).every((i) => i.validity.valid);
  Array.from(form.querySelectorAll(`${obj.keyPopapInput}`)).forEach((i) => {
    clearError(form, obj, i, booleanArrayInpitsAllValid);
  });
  inactiveBtnSubmit(form.querySelector(`${obj.keyDeleteBtn}`));
}
