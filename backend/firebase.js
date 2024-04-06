import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCs4-IwaOHyaIW_hUt_M15gagI1d9ZP5QQ",
  authDomain: "itec2024-e4088.firebaseapp.com",
  projectId: "itec2024-e4088",
  storageBucket: "itec2024-e4088.appspot.com",
  messagingSenderId: "1069553225031",
  appId: "1:1069553225031:web:60a42d99a42791e0ff1062",
  measurementId: "G-F2SMHC8Z2D",
  databaseURL:
    "https://itec2024-e4088-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
const provider = new GoogleAuthProvider();

function addUserToDatabase(user) {
  //TODO: Check if user already exists (help mentor)
  set(ref(database, "users/" + user.uid), {
    name: user.displayName,
    email: user.email,
  });
}


export function addAppToDatabase(appName) {
  const userUid = auth.currentUser.uid;
  set(ref(database, `users/${userUid}/apps/${appName}`), {
    developer: userUid,
    status: "stable",
  });

  //add public app
  set(ref(database, "apps/" + appName), {
    developer: userUid,
    status: "stable",
  });
}

export const auth = getAuth();

export function login() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      addUserToDatabase(user);
      // IdP data available using getAdditionalUserInfo(result)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

export function logout() {
  signOut(auth)
    .then(() => {
      localStorage.setItem("user", "");
      console.log("signed out");
    })
    .catch((error) => {
      console.log(error);
    });
}

export function submitBug(text, app, endpoint) {
  set(ref(database, `apps/${app}/endpoints/${endpoint}`), {
    bug: text,
    solved: false,
  });
}

// READ NEW ITEM

export function readFromDb(path){
  get(child(database, path)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    return snapshot.val();
  } else {
    console.log("No data available");
    return null;
  }
  }).catch((error) => {
    console.error(error);
    return null;
  });
}