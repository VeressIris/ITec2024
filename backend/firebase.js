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
const database = getDatabase(app);
const provider = new GoogleAuthProvider();

function addUserToDatabase(user) {
  set(ref(database, "users/" + user.uid), {
    name: user.displayName,
    email: user.email,
  });
}

export async function addAppToDatabase(appName) {
  const userUid = auth.currentUser.uid;
  const userRef = ref(database, "users/" + userUid);
  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      //add to dev apps
      const userData = snapshot.val();
      const currentApps = userData.apps || [];
      const updatedApps = [...currentApps, appName];
      await set(userRef, { ...userData, apps: updatedApps });

      console.log(`Added ${appName} to apps`);
    } else {
      console.error(`User ${userUid} does not exist`);
    }
  } catch (error) {
    console.error(`Error adding ${appName} to the apps array:`, error);
  }

  set(ref(database, "apps/" + appName), {
    developer: userUid,
  });
}

const auth = getAuth();
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

export function addAppsToDatabase(appName) {}
