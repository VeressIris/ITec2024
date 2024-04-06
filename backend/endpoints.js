import { getBugList, submitBug, submitEndpoint } from "./firebase.js";

const appName = document.getElementById("app-name");
const endpoints = document.getElementsByClassName("endpoint-name");
const endpointBugSubmit = document.getElementsByClassName("submit-bug");
const endpointBugText = document.getElementsByClassName("bug-text");

function initBugButtons() {
  for (let i = 0; i < endpoints.length; i++) {
    endpointBugSubmit[i].addEventListener("click", () => {
      submitBug(
        endpointBugText[i].value,
        appName.innerHTML,
        endpoints[i].innerText
      );
    });
  }
}

import { database } from "./firebase.js";
import {
  get,
  child,
  ref,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
const endpointText = document.getElementById("endpoint-text");
const endpointSubmit = document.getElementById("submit-endpoint");

function renderEndpoints() {
  get(child(ref(database), `apps/${appName.innerHTML}/endpoints`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          console.log(childSnapshot);
          renderNewEndpoint(childSnapshot.key, childSnapshot.val().status);
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
// PUBLIC
function renderNewEndpoint(endPName, endPStatus) {
  const newEndpointHTML = `<div class="dashboard">
    <h2 class="endpoint-name">${endPName}</h2>
    <p class="section">Status: ${endPStatus}</p>
    <p class="section">History: </p>
    <div id="bug-report">
      <p class="section">Bug reports:</p>
      <input class="bug-text" type="text" />
      <button class="submit-bug"><p>Submit</p></button>
    </div>
    </div>`;
  document
    .getElementById("endpoints_box")
    .insertAdjacentHTML("beforeend", newEndpointHTML);
}

//DEV

//Not done - GETBUGS

const bugHistoryEl = document.getElementById("bug_history");

function renderBugs(path) {
  dashboardEl.innerHTML = "";
  get(child(ref(database), path))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          console.log(childSnapshot.key);
          childSnapshot.key, childSnapshot.val().status, 0;
        });
      } else {
        console.log("No bugs!");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

renderBugs(
  `users/${localStorage.getItem("currentUser")}/apps${
    appName.innerHTML
  }/endpoints/bugs`
);
//Not working
function renderNewDevEndpoint(endPName, endPStatus) {
  renderBugs();
  let bugListDb;
  let bugListEl = document.getElementById("bugList");
  for (i = 0; i < bugListDb.length; ++i) {
    let liAux = document.createElement("li");
    liAux.innerHTML = `<li><label><input type="checkbox">${bugListDb[i]}</label></li>`;
    bugListEl.appendChild(li);
  }
}

endpointSubmit.addEventListener("click", () => {
  console.log("adding endpoint");
  submitEndpoint(appName.innerHTML, endpointText.value);
});

initBugButtons();
renderEndpoints();
