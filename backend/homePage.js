//BACKEND JS

import { addAppToDatabase } from "./firebase.js";

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
    const submitApp = document.getElementById("submit-app");
    submitApp.addEventListener("click", () => {
      const appName = document.getElementById("app-name-text").value;
      addAppToDatabase(appName);
      dashboardEl.innerHTML = "";
      renderApps(`users/${localStorage.getItem("currentUser")}/apps`);
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
  const dashboardDiv = document.createElement("div");
  dashboardDiv.classList.add("dashboard");
  const heading = document.createElement("h2");
  heading.textContent = appName;
  const statusParagraph = document.createElement("p");
  statusParagraph.classList.add("section");
  statusParagraph.textContent = `Status: ${appStatus}`;
  const endpointsParagraph = document.createElement("p");
  endpointsParagraph.classList.add("section");
  endpointsParagraph.textContent = `Endpoints: ${nrOfEndpoints}`;
  const seeMoreLink = document.createElement("a");
  seeMoreLink.textContent = "See more";
  seeMoreLink.href = "../html/endpoints.html";
  seeMoreLink.onclick = () => setCurrentApp(appName);

  dashboardDiv.appendChild(heading);
  dashboardDiv.appendChild(statusParagraph);
  dashboardDiv.appendChild(endpointsParagraph);
  dashboardDiv.appendChild(seeMoreLink);

  dashboardEl.appendChild(dashboardDiv);
};

function setCurrentApp(appName) {
  localStorage.setItem("currentApp", appName);
}

publicViewButtonEl.addEventListener("click", publicBtnClickHandler);
devViewButtonEl.addEventListener("click", devBtnClickHandler);

renderApps(`/apps`);
