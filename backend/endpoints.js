import { submitBug, submitEndpoint } from "./firebase.js";

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

const endpointText = document.getElementById("endpoint-text");
const endpointSubmit = document.getElementById("submit-endpoint");
function renderNewEndpoint(endP_name, endP_status) {
  const newEndpointHTML = `<div class="dashboard">
    <h2 class="endpoint-name">${endP_name}</h2>
    <p class="section">Status: ${endP_status}</p>
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
endpointSubmit.addEventListener("click", () => {
  console.log("adding endpoint");
  submitEndpoint(appName.innerHTML, endpointText.value);
});

initBugButtons();
