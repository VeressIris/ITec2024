//BACKEND JS

import { addAppToDatabase } from "./firebase.js";
const appNameText = document.getElementById("app-name-text");
const submitApp = document.getElementById("submit-app");

submitApp.addEventListener("click", () => {
  const appName = appNameText.value;
  addAppToDatabase(appName);
  publicDashboardEl.innerHTML = "";
  renderApps();
});

// FRONTEND JS

// HTML elements
const logButtonEl = document.getElementById("login-and-logout");
const publicViewButtonEl = document.getElementById("view-public-dashboard");
const devViewButtonEl = document.getElementById("view-developer-dashboard");
const publicDashboardEl = document.getElementById("public_view");
const devDashboardNoLoginEl = document.getElementById("dev_view-no_login");
const devDashboardEl = document.getElementById("dev_view");

// Values from HTML elements
const logStatus = logButtonEl.textContent;

//Click handlers
const publicBtnClickHandler = () => {
  // console.log('buburubu')
  publicDashboardEl.style.display = "grid";
  devDashboardNoLoginEl.classList.add("hidden");
  devDashboardEl.classList.add("hidden");
};
const devBtnClickHandler = () => {
  // console.log('mimimimimimimi mimimimi only me :D')
  publicDashboardEl.style.display = "none";
  if (logStatus === "Log in") {
    // console.log('mimimo');
    devDashboardNoLoginEl.classList.remove("hidden");
    devDashboardEl.style.display = "none";
  } else if (logStatus === "Log out") {
    devDashboardNoLoginEl.classList.add("hidden");
    devDashboardEl.style.display = "grid";
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

// function renderApps() {
//   get(child(ref(database), "apps/"))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         snapshot.forEach((childSnapshot) => {
//           renderNewApp(childSnapshot.key, childSnapshot.val().status, 0);
//         });
//       } else {
//         console.log("No data available");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
function renderApps() {
  get(child(ref(database), `users/${localStorage.getItem("currentUser")}/apps`))
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
  publicDashboardEl.insertAdjacentHTML("beforeend", newAppHTML);
};

console.log(logStatus);
publicViewButtonEl.addEventListener("click", publicBtnClickHandler);
devViewButtonEl.addEventListener("click", devBtnClickHandler);

renderApps();
