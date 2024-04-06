import { login, logout, auth } from "./firebase.js";
const logInButton = document.getElementById("login-and-logout");
auth.onAuthStateChanged((user) => {
  if (user) {
    logInButton.innerHTML = "Logout";
    logInButton.onclick = logout;
  } else {
    logInButton.innerHTML = "Login";
    logInButton.onclick = login;
  }
});
