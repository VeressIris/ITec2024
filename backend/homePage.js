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
  console.log("buburubu");
  // console.log(document.getElementById("submit-new").innerText);
  renderApps(`/apps`);
  document.getElementById("submit-new").remove();
  dashboardEl.style.display = "grid";
};

const devBtnClickHandler = () => {
  if (logButtonEl.textContent === "Login") {
    dashboardEl.innerHTML = "You must be logged in";
  } else if (logButtonEl.textContent === "Logout") {
    renderDevApps();
    const newAppHTML = `<div id="submit-new">
      <h2>Submit a new app:</h2>
      <h3>App name:</h3>
      <input id="app-name-text" type="text" />
      <h3>App link:</h3>
      <input id="app-link-text" type="text" />
      <button id="submit-app"><p>Add app</p></button>
    </div>`;
    if (document.getElementById("submit-new") !== null) return;
    dashboardEl.insertAdjacentHTML("afterend", newAppHTML);
    const submitApp = document.getElementById("submit-app");
    submitApp.addEventListener("click", () => {
      const appName = document.getElementById("app-name-text").value;
      const appLink = document.getElementById("app-link-text").value;
      addAppToDatabase(appName, appLink);
      dashboardEl.innerHTML = "";
      renderDevApps();
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
          renderNewApp(
            childSnapshot.key,
            childSnapshot.val().link,
            childSnapshot.val().status,
            Object.keys(childSnapshot.val().endpoints).length
          );
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
function renderDevApps() {
  dashboardEl.innerHTML = "";
  get(child(ref(database), `apps/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          console.log(childSnapshot.val().developer);
          if (
            localStorage.getItem("currentUser") ===
            childSnapshot.val().developer
          ) {
            // console.log(Object.keys(childSnapshot.val().endpoints).length);
            renderNewApp(
              childSnapshot.key,
              childSnapshot.val().link,
              childSnapshot.val().status,
              Object.keys(childSnapshot.val().endpoints).length
            );
          }
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
const renderNewApp = (appName, appLink, appStatus, nrOfEndpoints) => {
  const dashboardDiv = document.createElement("div");
  dashboardDiv.classList.add("dashboard");
  const heading = document.createElement("h2");
  heading.textContent = appName;
  dashboardDiv.appendChild(heading);
  const link = document.createElement("p");
  link.classList.add("section");
  link.textContent = appLink;
  dashboardDiv.appendChild(link);
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

/*Set app status code*/