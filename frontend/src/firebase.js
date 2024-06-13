// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "event-management-app-e7420.firebaseapp.com",
  projectId: "event-management-app-e7420",
  storageBucket: "event-management-app-e7420.appspot.com",
  messagingSenderId: "549120109310",
  appId: "1:549120109310:web:795cbc3e3f95eee428d3af"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);