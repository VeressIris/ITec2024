import { login, logout } from "./firebase.js";
const logInButton = document.getElementById("login");
logInButton.addEventListener("click", login);
const logOutButton = document.getElementById("logout");
logOutButton.addEventListener("click", logout);
