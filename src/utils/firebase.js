// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflix-gpt-19842.firebaseapp.com",
  projectId: "netflix-gpt-19842",
  storageBucket: "netflix-gpt-19842.firebasestorage.app",
  messagingSenderId: "618136851288",
  appId: "1:618136851288:web:c71ba644a04a5205f90b2d",
  measurementId: "G-TS62VZKQTH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();