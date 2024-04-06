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
  child,
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
  if (appName === "") return;
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

      get(child(ref(database), `users/${auth.currentUser.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log("User already exists in the database");
          } else {
            addUserToDatabase(user);
            console.log("User added to the database");
          }
          localStorage.setItem("currentUser", user.uid);
          location.reload();
        })
        .catch((error) => {
          console.error("Error checking user existence:", error);
        });
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
      localStorage.setItem("currentUser", "");
      console.log("signed out");
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getBugList(appName, endpoint) {
  let bugList = [];
  get(child(ref(database), `apps/${appName}/endpoints/${endpoint}/bugs`)).then(
    (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          // console.log(childSnapshot.key);
          bugList.push(childSnapshot.key);
        });
      } else {
        console.log("No data available");
      }
    }
  );
  return bugList;
}

export function submitBug(text, app, endpoint) {
  if (text === "") return;
  set(ref(database, `apps/${app}/endpoints/${endpoint}/bugs/${text}`), {
    solved: false,
  });
}

export function submitEndpoint(appName, endpointName) {
  if (endpointName === "") return;
  //set public endpoint
  set(ref(database, `apps/${appName}/endpoints/${endpointName}`), {
    solved: false,
    status: "stable",
  });
  //set dev endpoint
  set(
    ref(
      database,
      `users/${auth.currentUser.uid}/apps/${appName}/endpoints/${endpointName}`
    ),
    {
      solved: false,
      status: "stable",
    }
  );
}
