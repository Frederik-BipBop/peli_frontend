
const BASE_URL = "http://localhost:7070/api";
const LOGIN_ENDPOINT = "/auth/login";

const TOKEN_KEY = "jwtToken";

function handleHttpErrors(res) {
  if (!res.ok) {
    // Returnér både status + body så du kan vise fejlbesked i UI
    return res.json().then((fullError) => Promise.reject({ status: res.status, fullError }));
  }
  // Nogle endpoints returnerer ikke JSON (204). Beskyt mod crash:
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  return null;
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function loggedIn() {
  return getToken() != null;
}

function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

// Minimal JWT decode (uden eksterne libs). Bruges fx til roles/username.
function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function getUserFromToken() {
  const token = getToken();
  if (!token) return null;
  return decodeToken(token);
}

function getRoles() {
  const user = getUserFromToken();
  // afhænger af backend: nogle bruger "roles", andre "authorities" eller "role"
  return user?.roles || user?.authorities || user?.role || [];
}

function makeOptions(method, addToken, body) {
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  if (addToken) {
    const token = getToken();
    if (token) {
      opts.headers.Authorization = `Bearer ${token}`;
    }
  }

  if (body !== undefined && body !== null) {
    opts.body = JSON.stringify(body);
  }

  return opts;
}

async function login(username, password) {
  const options = makeOptions("POST", false, { username, password });
  const data = await fetch(BASE_URL + LOGIN_ENDPOINT, options).then(handleHttpErrors);

  // backend kan hedde token / jwt / accessToken — vi prøver de typiske
  const token = data?.token || data?.jwt || data?.accessToken;
  if (!token) {
    throw new Error("Login lykkedes, men der kom ingen token tilbage fra serveren.");
  }

  setToken(token);
  return getUserFromToken(); // praktisk til UI
}

function fetchData(endpoint) {
  const options = makeOptions("GET", true);
  return fetch(BASE_URL + endpoint, options).then(handleHttpErrors);
}

function postData(endpoint, body) {
  const options = makeOptions("POST", true, body);
  return fetch(BASE_URL + endpoint, options).then(handleHttpErrors);
}

function putData(endpoint, body) {
  const options = makeOptions("PUT", true, body);
  return fetch(BASE_URL + endpoint, options).then(handleHttpErrors);
}

function deleteData(endpoint) {
  const options = makeOptions("DELETE", true);
  return fetch(BASE_URL + endpoint, options).then(handleHttpErrors);
}

//  Favorites helpers 

function getFavoritesByUserId(userId) {
  return fetchData(`/user/${userId}/favorites`);
}

function addFavorite(gameId) {
  return postData(`/games/${gameId}/favorite`, {});
}

function removeFavorite(gameId) {
  return deleteData(`/games/${gameId}/favorite`);
}




const apiFacade = {
  // auth
  login,
  logout,
  loggedIn,
  getToken,
  getUserFromToken,
  getRoles,

  // http helpers
  fetchData,
  postData,
  putData,
  deleteData,

  // favorites
  addFavorite,
  removeFavorite,
  getFavoritesByUserId,
};

export default apiFacade;
