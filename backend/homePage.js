//BACKEND JS

import { addAppToDatabase } from "./firebase.js";
const appNameText = document.getElementById("app-name-text");
const submitApp = document.getElementById("submit-app");

submitApp.addEventListener("click", () => {
  const appName = appNameText.value;
  addAppToDatabase(appName);
});

// FRONTEND JS

// HTML elements
const logButtonEl = document.getElementById('login-and-logout');
const publicViewButtonEl = document.getElementById('view-public-dashboard');
const devViewButtonEl = document.getElementById('view-developer-dashboard');
const publicDashboardEl = document.getElementById('public_view');
const devDashboardNoLoginEl = document.getElementById('dev_view-no_login');
const devDashboardEl = document.getElementById('dev_view');

// Values from HTML elements
const logStatus = logButtonEl.textContent;

//Click handlers
const publicBtnClickHandler = () => {
    // console.log('buburubu')
    publicDashboardEl.style.display = 'grid';
    devDashboardNoLoginEl.classList.add('hidden');
    devDashboardEl.classList.add('hidden');
}
const devBtnClickHandler = () => {
    // console.log('mimimimimimimi mimimimi only me :D')
    publicDashboardEl.style.display = 'none';
    if (logStatus === 'Log in'){
      // console.log('mimimo');
      devDashboardNoLoginEl.classList.remove('hidden');
      devDashboardEl.style.display='none';
    }
    else if (logStatus === 'Log out'){
      devDashboardNoLoginEl.classList.add('hidden');
      devDashboardEl.style.display='grid';
    }
    else{
      console.log(error);
    }
}
// RENDER APPS
import { userUid , readFromDb } from "./firebase.js";
//functions
console.log(userUid)
// const userApps = readFromDb(`users/${auth.currentUser.uid}/apps`);
// console.log(userApps)
//Render new application
const renderNewApp = () => {
  
  const newAppHTML=`
    <div class="dashboard">
      <h2>${appName}</h2>
      <p class="section">Status: ${appStatus}</p>
      <p class="section">Endpoints: ${nrOfEndpoints}</p>
      <a href="../html/endpoints.html">See more</a>
    </div>`;
  }

console.log(logStatus);
publicViewButtonEl.addEventListener('click', publicBtnClickHandler);
devViewButtonEl.addEventListener('click', devBtnClickHandler);
