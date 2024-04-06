import { submitBug } from "./firebase.js";

const appName = document.getElementById("app-name");
const endpoints = document.getElementsByClassName("endpoint-name");
const endpointBugSubmit = document.getElementByClassName("submit-bug");
const endpointBugText = document.getElementByClassName("bug-text");

for (let i = 0; i < endpoints.length; i++) {
  endpointBugSubmit[i].addEventListener("click", () => {
    submitBug(endpointBugText.value, appName.innerHTML, endpoints[i].innerText);
  });
}
