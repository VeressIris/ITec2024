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
endpointSubmit.addEventListener("click", () => {
  console.log("adding endpoint");
  submitEndpoint(appName.innerHTML, endpointText.value);
});

initBugButtons();
