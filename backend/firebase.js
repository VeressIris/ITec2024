import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
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
