// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB4QNFJCPeOENAJuZ_zyRxpKdfJRvJ6VU",
  authDomain: "bubblewomen-4c225.firebaseapp.com",
  projectId: "bubblewomen-4c225",
  storageBucket: "bubblewomen-4c225.appspot.com",
  messagingSenderId: "663319799822",
  appId: "1:663319799822:web:90b425d92c5222bcf4f45f",
  measurementId: "G-7ER43TP9CW",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
