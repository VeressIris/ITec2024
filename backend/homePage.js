//BACKEND JS

import { addAppToDatabase } from "./firebase.js";
const appNameText = document.getElementById("app-name-text");
const submitApp = document.getElementById("submit-app");

submitApp.addEventListener("click", () => {
  const appName = appNameText.value;
  addAppToDatabase(appName);
});

// FRONTEND JS

const logInButton = document.getElementById('');
