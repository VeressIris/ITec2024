//BACKEND JS

import { addAppToDatabase } from "./firebase.js";
const appNameText = document.getElementById("app-name-text");
const submitApp = document.getElementById("submit-app");

// FRONTEND JS

// HTML elements
const logButtonEl = document.getElementById("login-and-logout");
const publicViewButtonEl = document.getElementById("view-public-dashboard");
const devViewButtonEl = document.getElementById("view-developer-dashboard");
const dashboardEl = document.getElementById("public_view");
const devDashboardNoLoginEl = document.getElementById("dev_view-no_login");
const devDashboardEl = document.getElementById("dev_view");

//Click handlers
const publicBtnClickHandler = () => {
  // console.log('buburubu')
  document.getElementById("submit-new").remove();
  renderApps(`/apps`);
  dashboardEl.style.display = "grid";
};
const devBtnClickHandler = () => {
  if (logButtonEl.textContent === "Login") {
    dashboardEl.innerHTML = "You must be logged in";
  } else if (logButtonEl.textContent === "Logout") {
    renderApps(`users/${localStorage.getItem("currentUser")}/apps`);
    const newAppHTML = `<div id="submit-new">
      <h2>Submit a new app:</h2>
      <input id="app-name-text" type="text" />
      <button id="submit-app"><p>Add app</p></button>
    </div>`;
    if (document.getElementById("submit-new") !== null) return;
    dashboardEl.insertAdjacentHTML("afterend", newAppHTML);
    submitApp.addEventListener("click", () => {
      const appName = appNameText.value;
      addAppToDatabase(appName);
      publicDashboardEl.innerHTML = "";
      renderApps();
    });
  } else {
    console.log(error);
  }
};
// RENDER APPS
import { database } from "./firebase.js";
import {
  get,
  child,
  ref,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
//functions

function renderApps(path) {
  dashboardEl.innerHTML = "";
  get(child(ref(database), path))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          console.log(childSnapshot.key);
          renderNewApp(childSnapshot.key, childSnapshot.val().status, 0);
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

//Render new application
const renderNewApp = (appName, appStatus, nrOfEndpoints) => {
  const newAppHTML = `
    <div class="dashboard">
      <h2>${appName}</h2>
      <p class="section">Status: ${appStatus}</p>
      <p class="section">Endpoints: ${nrOfEndpoints}</p>
      <a href="../html/endpoints.html">See more</a>
    </div>`;
  dashboardEl.insertAdjacentHTML("beforeend", newAppHTML);
};

publicViewButtonEl.addEventListener("click", publicBtnClickHandler);
devViewButtonEl.addEventListener("click", devBtnClickHandler);

renderApps(`/apps`);
