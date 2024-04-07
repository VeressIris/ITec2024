import { getBugList, submitBug, submitEndpoint } from "./firebase.js";
import { database } from "./firebase.js";
import {
  get,
  child,
  ref,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const appName = document.getElementById("app-name");
appName.innerHTML = localStorage.getItem("currentApp");

const endpointsBox = document.getElementById("endpoints_box");

function renderPublicEndpoints() {
  get(child(ref(database), `apps/${appName.innerHTML}/endpoints`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          // console.log(childSnapshot);
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

function renderDevEndpoints() {
  get(child(ref(database), `apps/${appName.innerHTML}/endpoints`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          renderNewDevEndpoint(childSnapshot.key, childSnapshot.val().status);
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  if (document.getElementById("submit-endpoint") != null) {
    return;
  }
  const htmlThing = `<h2 style="margin-left: 20px">Submit an endpoint:</h2>
        <input id="endpoint-text" type="text" />
        <button id="submit-endpoint"><p>Submit</p></button>`;
  document
    .getElementById("endpoints_box")
    .insertAdjacentHTML("afterend", htmlThing);
  const submitEndpointBttn = document.getElementById("submit-endpoint");
  const endpointText = document.getElementById("endpoint-text");
  submitEndpointBttn.addEventListener("click", () => {
    submitEndpoint(appName.innerHTML, endpointText.value);
    renderEndpoints();
  });
}

// horror ce-i aici
function renderNewEndpoint(endPName, endPStatus) {
  const dashboard = document.createElement("div");
  dashboard.className = "dashboard";
  const endPointName = document.createElement("h2");
  endPointName.innerText = endPName;
  dashboard.appendChild(endPointName);
  const status = document.createElement("p");
  status.className = "section";
  status.innerText = `Status: ${endPStatus}`;
  dashboard.appendChild(status);
  const history = document.createElement("p");
  history.className = "section";
  history.innerText = "History:";
  dashboard.appendChild(history);
  const bugReports = document.createElement("div");
  bugReports.id = "bug-report";
  const bugReportTitle = document.createElement("p");
  bugReportTitle.className = "section";
  bugReportTitle.innerText = "Bug reports:";
  bugReports.appendChild(bugReportTitle);
  const bugText = document.createElement("input");
  bugText.type = "text";
  bugText.className = "bug-text";
  bugReports.appendChild(bugText);
  const submitButton = document.createElement("button");
  submitButton.className = "submit-bug";
  submitButton.innerHTML = "<p>Submit</p>";
  submitButton.addEventListener("click", () => {
    submitBug(bugText.value, appName.innerHTML, endPName);
  });
  bugReports.appendChild(submitButton);
  dashboard.appendChild(bugReports);
  endpointsBox.appendChild(dashboard);
}

async function renderNewDevEndpoint(endPName, endPStatus) {
  const dashboard = document.createElement("div");
  dashboard.className = "dashboard";
  const endPointName = document.createElement("h2");
  endPointName.innerText = endPName;
  dashboard.appendChild(endPointName);
  const status = document.createElement("p");
  status.className = "section";
  status.innerText = `Status: ${endPStatus}`;
  dashboard.appendChild(status);
  const history = document.createElement("p");
  history.className = "section";
  history.innerText = "History:";
  dashboard.appendChild(history);
  const bugListTitle = document.createElement("p");
  bugListTitle.innerHTML = "Bug list:";
  bugListTitle.className = "section";
  dashboard.appendChild(bugListTitle);
  const bugListElem = document.createElement("div");
  bugListElem.id = "bug-list";
  const bugList = await getBugList(appName.innerHTML, endPName);
  console.log(bugList);
  if (bugList.length > 0) {
    bugList.forEach((bug) => {
      const bugElem = document.createElement("p");
      bugElem.innerText = bug;
      bugListElem.appendChild(bugElem);
    });
  }
  dashboard.appendChild(bugListElem);
  endpointsBox.appendChild(dashboard);
}

function renderEndpoints() {
  get(child(ref(database), `apps/${appName.innerHTML}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const appDev = snapshot.val().developer;
      endpointsBox.innerHTML = "";
      console.log(localStorage.getItem("currentUser"));
      console.log(appDev);
      if (
        localStorage.getItem("currentUser") != "" &&
        appDev === localStorage.getItem("currentUser")
      ) {
        console.log("rendering dev endpoints");
        renderDevEndpoints();
      } else {
        console.log("rendering public endpoints");
        renderPublicEndpoints();
      }
    } else {
      console.log("No data available");
    }
  });
}

function renderDevEndpointsFromApps() {
  get(child(ref(database), `apps/${appName.innerHTML}/endpoints`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          // console.log(childSnapshot);
          if (
            currentUser ===
            child(ref(database), `apps/${appName.innerHTML}/developer`)
          ) {
            renderNewEndpoint(childSnapshot.key, childSnapshot.val().status);
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

renderEndpoints();
