const objSettingForRequest = {
  homeUrl: "https://nomoreparties.co/v1/wff-cohort-24",
  headersAuthorization: `020c57ef-afc5-4efb-96e2-9de924c090b7`,
  contentType: {
    applicationJson: "application/json",
  },
};
// ==================================== Запросы GET на СЕРВЕР ================================ \\
export function getDataProfileFromServ() {
  return fetch(`${objSettingForRequest.homeUrl}/users/me`, {
    headers: {
      authorization: objSettingForRequest.headersAuthorization,
    },
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function getCardsFromServ() {
  return fetch(`${objSettingForRequest.homeUrl}/cards`, {
    headers: {
      authorization: objSettingForRequest.headersAuthorization,
    },
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// ==================================== Запросы PATCH на СЕРВЕР ================================ \\
export function setDataPofileServ(name, about) {
  return fetch(`${objSettingForRequest.homeUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: objSettingForRequest.headersAuthorization,
      "Content-Type": objSettingForRequest.contentType.applicationJson,
    },
    body: JSON.stringify({
      name,
      about,
    }),
  });
}

export function setAvatarPofileServ(avatar) {
  return fetch(`${objSettingForRequest.homeUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: objSettingForRequest.headersAuthorization,
      "Content-Type": objSettingForRequest.contentType.applicationJson,
    },
    body: JSON.stringify({
      avatar,
    }),
  });
}

// ==================================== Запросы POST на СЕРВЕР ================================ \\
export function setNewCardServ(dataName, dataLink) {
  return fetch(`${objSettingForRequest.homeUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: objSettingForRequest.headersAuthorization,
      "Content-Type": objSettingForRequest.contentType.applicationJson,
    },
    body: JSON.stringify({
      name: dataName,
      link: dataLink,
    }),
  });
}

// ==================================== Запросы PUT на СЕРВЕР ================================ \\
export function setLikeCard(id) {
  return fetch(`${objSettingForRequest.homeUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: {
      authorization: objSettingForRequest.headersAuthorization,
    },
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// ==================================== Запросы DELETE на СЕРВЕР ================================ \\
export function deleteCard(id) {
  return fetch(`${objSettingForRequest.homeUrl}/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: objSettingForRequest.headersAuthorization,
    },
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
