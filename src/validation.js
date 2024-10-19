// import { Array } from "core-js";
// включение валидации
export function enableValidation(obj) {
  Array.from(document.querySelectorAll(`${obj.keyPopupForm}`)).forEach(
    (item) => {
      item.addEventListener("input", (evt) => {
        checkValidate(item, obj);
      });
    }
  );
}

function checkValidate(form, obj) {
  // массив не валидных инпутов
  const arrInpitNotValid = Array.from(
    form.querySelectorAll(`${obj.keyPopapInput}`)
  ).filter((i) => !i.validity.valid || i.validity.patternMismatch);
  // массив валидных инпутов
  const arrInpitValid = Array.from(
    form.querySelectorAll(`${obj.keyPopapInput}`)
  ).filter((i) => i.validity.valid);
  // проверка все элементы валидны
  const booleanArrInpitAllValid = Array.from(
    form.querySelectorAll(`${obj.keyPopapInput}`)
  ).every((i) => i.validity.valid);

  showError(form, obj, arrInpitNotValid);
  clearError(form, obj, arrInpitValid, booleanArrInpitAllValid);
}

// ФУНКЦИЯ показа ошибки
function showError(form, obj, arrInpitNotValid) {
  // отключили кнопку
  inactiveBtnSubmit(form.querySelector(`${obj.keyDeleteBtn}`));

  arrInpitNotValid.forEach(function (i) {
    const spanErrorNotValidInput = form.querySelector(
      `#${i.id + obj.keyIdSpanError}`
    );
    // дали красную нижнюю границу каждому НЕвалидному инпуту
    i.setAttribute("style", "border-bottom: 1px solid red");
    // дали стили spanu под невалидным инпутом
    spanErrorNotValidInput.setAttribute(
      "style",
      "display: flex; font-family: Inter; color: rgba(255, 0, 0, 1); font-size: 10px; font-weight: 400; position: absolute;"
    );
    if (i.validity.patternMismatch) {
      spanErrorNotValidInput.textContent = i.dataset.errorMessage;
    } else {
      spanErrorNotValidInput.textContent = i.validationMessage;
    }
  });
}

// ФУНКЦИЯ очистки ошибки
function clearError(form, obj, arrInpitValid, booleanArrInpitAllValid) {
  if (booleanArrInpitAllValid) {
    // сделать кнопку активной если все инпуты валидны
    activeBtnSubmit(form.querySelector(`${obj.keyDeleteBtn}`));
  }
  arrInpitValid.forEach((i) => {
    i.removeAttribute("style");
    form.querySelector(`#${i.id + obj.keyIdSpanError}`).textContent = "";
  });
}

// ФУНКЦИЯ сделать неактивной кнопку отправки
function inactiveBtnSubmit(elm) {
  elm.setAttribute(
    "style",
    "background: none; color: rgba(0, 0, 0, 0.2); border: solid 1px rgba(0, 0, 0, 0.2)"
  );
  elm.setAttribute("disabled", "");
}

// ФУНКЦИЯ сделать активной кнопку отправки
function activeBtnSubmit(elm) {
  elm.removeAttribute("style");
  elm.removeAttribute("disabled");
}

// Очистка валидации при открытии модал
export function clearValidation(form, obj) {
 Array.from(form.querySelectorAll(`${obj.keyPopapInput}`)).forEach((i) => {
  const spanError = form.querySelector(`#${i.id + obj.keyIdSpanError}`)
  i.removeAttribute('style')
  spanError.textContent = ''
 });  
  inactiveBtnSubmit(form.querySelector(`${obj.keyDeleteBtn}`));
}
