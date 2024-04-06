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

function renderEndpoints() {
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
//Not working
function renderNewDevEndpoint(endPName, endPStatus) {
  getBugList();
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

renderEndpoints();
getBugList("App name", "testing");
