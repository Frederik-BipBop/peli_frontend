const BASE_URL = "http://localhost:7070/api";
const TOKEN_KEY = "jwtToken";

function handleHttpErrors(res) {
  if (!res.ok) {
    return res.json().then((err) => Promise.reject(err));
  }
  return res.json();
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}
function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
function loggedIn() {
  return getToken() !== null;
}
function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

function makeOptions(method, addToken, body) {
  const opts = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (addToken && getToken()) {
    opts.headers.Authorization = `Bearer ${getToken()}`;
  }
  if (body) opts.body = JSON.stringify(body);
  return opts;
}

async function login(username, password) {
  const options = makeOptions("POST", false, { username, password });
  const data = await fetch(BASE_URL + "/auth/login", options).then(handleHttpErrors);
  setToken(data.token);
}

function fetchData(endpoint) {
  return fetch(BASE_URL + endpoint, makeOptions("GET", true)).then(handleHttpErrors);
}

function postData(endpoint, body) {
  return fetch(BASE_URL + endpoint, makeOptions("POST", true, body)).then(handleHttpErrors);
}

function deleteData(endpoint) {
  return fetch(BASE_URL + endpoint, makeOptions("DELETE", true)).then(handleHttpErrors);
}

function getGames() {
  return fetchData("/games");
}
function getGameById(id) {
  return fetchData(`/game/${id}`);
}
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

  // http helpers
  fetchData,
  postData,
  deleteData,

  // favorites
  addFavorite,
  removeFavorite,
  getFavoritesByUserId,

  // games
  getGames,
  getGameById,

};

export default apiFacade;
