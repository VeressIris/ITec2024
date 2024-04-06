import { getBugList, submitBug, submitEndpoint } from "./firebase.js";
import { database } from "./firebase.js";
import {
  get,
  child,
  ref,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const appName = document.getElementById("app-name");

const endpointText = document.getElementById("endpoint-text");
const endpointSubmit = document.getElementById("submit-endpoint");

function renderEndpoints(path) {
  get(child(ref(database), path))
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
  document.getElementById("endpoints_box").appendChild(dashboard);
}
function renderNewDevEndpoint(endPName, endPStatus) {
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
  const bugListElem = document.createElement("div");
  bugListElem.id = "bug-list";
  const bugList = getBugList(appName.innerHTML, endPName);
  bugList.forEach((bug) => {
    const bugElem = document.createElement("p");
    bugElem.innerText = bug;
    bugListElem.appendChild(bugElem);
  });
  dashboard.appendChild(bugListElem);
}

//Not working
function renderDevEndpoints(endPName, endPStatus) {
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

endpointSubmit.addEventListener("click", () => {
  console.log("adding endpoint");
  submitEndpoint(appName.innerHTML, endpointText.value);
});

//public
// renderEndpoints(`apps/${appName.innerHTML}/endpoints`);
//dev
renderEndpoints(
  `users/${localStorage.getItem("currentUser")}/${appName.innerHTML}/endpoints`
);
