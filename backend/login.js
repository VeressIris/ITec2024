import { login, logout } from "./firebase.js";
const logInButton = document.getElementById("login");
const logOutButton = document.getElementById("logout");
logInButton.addEventListener("click", login);
logOutButton.addEventListener("click", logout);
