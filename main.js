(()=>{"use strict";function e(e,t,n,o,r){var c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),a=c.querySelector(".card__image"),i=c.querySelector(".card__title"),u=c.querySelector(".card__delete-button"),l=c.querySelector(".card__like-button"),s=c.querySelector(".card__like-button__counter");e.owner._id!==o?(u.setAttribute("disabled",""),u.classList.remove("card__delete-button_is-active")):(u.classList.add("card__delete-button_is-active"),u.addEventListener("click",(function(t){r("".concat(e._id),t.target.closest(".card"))})));var d=Boolean(e.likes.find((function(e){return e._id.includes(o)})));return l.classList.toggle("card__like-button_is-active",d),s.textContent="".concat(e.likes.length),a.src=e.link,a.alt=e.name,i.textContent=e.name,l.addEventListener("click",(function(t){n(t,e,s)})),a.addEventListener("click",(function(){return t(e)})),c}function t(e){e.classList.toggle("card__like-button_is-active")}function n(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c)}function o(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c)}function r(e){e.target.classList.contains("popup")&&o(e.target)}function c(e){"Escape"===e.key&&o(document.querySelector(".popup_is-opened"))}function a(e,t,n,o){var r;o&&((r=e.querySelector("".concat(t.keyDeleteBtn))).classList.remove("popup__button__no-active"),r.removeAttribute("disabled")),n.classList.remove("popup__input-error"),e.querySelector("#".concat(n.id+t.keyIdSpanError)).textContent=""}function i(e){e.classList.add("popup__button__no-active"),e.setAttribute("disabled","")}function u(e,t){var n=Array.from(e.querySelectorAll("".concat(t.keyPopapInput))).every((function(e){return e.validity.valid}));Array.from(e.querySelectorAll("".concat(t.keyPopapInput))).forEach((function(o){a(e,t,o,n)})),i(e.querySelector("".concat(t.keyDeleteBtn)))}var l={homeUrl:"https://nomoreparties.co/v1/wff-cohort-24",headersAuthorization:"020c57ef-afc5-4efb-96e2-9de924c090b7",contentType:{applicationJson:"application/json"}},s=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function d(e){return fetch("".concat(l.homeUrl,"/cards/").concat(e),{method:"DELETE",headers:{authorization:l.headersAuthorization}}).then((function(e){return s(e)}))}var p,f=document.querySelector(".profile__title"),m=document.querySelector(".profile__description"),y=document.querySelector(".profile__image"),_=document.querySelector(".profile__edit-button"),h=document.querySelector(".profile__add-button"),v=document.querySelector(".popup_type_edit"),k=document.querySelector(".popup_type_new-card"),g=document.querySelector(".popup_type_image"),S=document.querySelector(".popup_type_new-avatar"),q=document.querySelector(".popup_type_delete-card"),b=document.forms["edit-profile"],L=document.forms["new-place"],E=document.forms["new-avatar"],C=document.forms["question-delete"],A=document.forms["edit-profile"].elements.name,x=document.forms["edit-profile"].elements.description,z=document.forms["new-place"].elements["place-name"],P=document.forms["new-place"].elements.link,T=g.querySelector("img"),w=g.querySelector(".popup__caption"),D=document.querySelector(".places__list"),I=document.querySelectorAll(".popup"),U=Array.from(I),B={keyPopapInput:".popup__input",keyPopupForm:".popup__form",keyIdSpanError:"__error_message",keyDeleteBtn:"[type=submit]"},J={idCard:"",keyElementCard:""};function j(e,t){J.idCard=e,J.keyElementCard=t,n(q)}function N(e){e.querySelector("".concat(B.keyDeleteBtn)).textContent="Сохранение..."}function O(e){e.querySelector("".concat(B.keyDeleteBtn)).textContent="Сохранить"}function M(e){T.src=e.link,T.alt=e.name,w.textContent=e.name,n(g)}function F(e,n,o){var r;e.target.classList.contains("card__like-button_is-active")?d("likes/".concat(n._id)).then((function(n){t(e.target),o.textContent=n.likes.length})).catch((function(e){console.log(e)})):(r=n._id,fetch("".concat(l.homeUrl,"/cards/likes/").concat(r),{method:"PUT",headers:{authorization:l.headersAuthorization}}).then((function(e){return s(e)}))).then((function(n){t(e.target),o.textContent=n.likes.length})).catch((function(e){console.log(e)}))}function H(e){var t;e.preventDefault(),N(e.target),(t=e.target.querySelector("".concat(B.keyPopapInput)).value,fetch("".concat(l.homeUrl,"/users/me/avatar"),{method:"PATCH",headers:{authorization:l.headersAuthorization,"Content-Type":l.contentType.applicationJson},body:JSON.stringify({avatar:t})})).then((function(e){return e.json()})).then((function(e){y.setAttribute("style","background-image: url(".concat(e.avatar,")")),o(S)})).catch((function(e){console.log(e)})).finally((function(){O(e.target)}))}p=B,Array.from(document.querySelectorAll("".concat(p.keyPopapInput))).forEach((function(e){e.addEventListener("input",(function(e){var t=e.target.closest("".concat(p.keyPopupForm)),n=e.target;!function(e,t,n){var o=Array.from(e.querySelectorAll("".concat(t.keyPopapInput))).every((function(e){return e.validity.valid}));n.validity.valid?a(e,t,n,o):function(e,t,n){i(e.querySelector("".concat(t.keyDeleteBtn)));var o=e.querySelector("#".concat(n.id+t.keyIdSpanError));n.classList.add("popup__input-error"),o.classList.add("popup__error-message"),n.validity.patternMismatch?o.textContent=n.dataset.errorMessage:o.textContent=n.validationMessage}(e,t,n)}(t,p,n)}))})),y.addEventListener("click",(function(){E.querySelector("".concat(B.keyPopapInput)).value="",u(E,B),E.addEventListener("submit",H),n(S)})),_.addEventListener("click",(function(e){n(v),A.value=f.textContent,x.value=m.textContent,u(b,B)})),h.addEventListener("click",(function(e){n(k),u(L,B)})),b.addEventListener("submit",(function(e){var t,n;e.preventDefault(),N(e.target),(t=A.value,n=x.value,fetch("".concat(l.homeUrl,"/users/me"),{method:"PATCH",headers:{authorization:l.headersAuthorization,"Content-Type":l.contentType.applicationJson},body:JSON.stringify({name:t,about:n})})).then((function(e){return e.json()})).then((function(e){f.textContent=e.name,m.textContent=e.about,o(v)})).catch((function(e){console.log(e)})).finally((function(){O(e.target)}))})),L.addEventListener("submit",(function(t){var n,r;t.preventDefault(),N(t.target),(n=z.value,r=P.value,fetch("".concat(l.homeUrl,"/cards"),{method:"POST",headers:{authorization:l.headersAuthorization,"Content-Type":l.contentType.applicationJson},body:JSON.stringify({name:n,link:r})}).then((function(e){return s(e)}))).then((function(t){D.prepend(e(t,M,F,t.owner._id,j)),o(k),z.value="",P.value=""})).catch((function(e){console.log(e)})).finally((function(){O(t.target)}))})),C.addEventListener("submit",(function(e){!function(e,t,n){e.preventDefault(),d(t).then((function(){!function(e){e.remove()}(n),o(q)})).catch((function(e){console.log(e)}))}(e,J.idCard,J.keyElementCard)})),U.forEach((function(e){e.classList.add("popup_is-animated"),e.querySelector(".popup__close").addEventListener("click",(function(t){return o(e)})),e.addEventListener("click",r)})),Promise.all([fetch("".concat(l.homeUrl,"/cards"),{headers:{authorization:l.headersAuthorization}}).then((function(e){return s(e)})),fetch("".concat(l.homeUrl,"/users/me"),{headers:{authorization:l.headersAuthorization}}).then((function(e){return s(e)}))]).then((function(t){f.textContent=t[1].name,m.textContent=t[1].about,y.setAttribute("style","background-image: url(".concat(t[1].avatar,")")),t[0].forEach((function(n){D.append(e(n,M,F,t[1]._id,j))}))})).catch((function(e){console.log(e)}))})();
//# sourceMappingURL=main.js.map