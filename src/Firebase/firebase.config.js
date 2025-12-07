// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuj_sllJ9pkmclR8CUrpk6MVbMzqkX4eo",
  authDomain: "etuitionbd-e7eea.firebaseapp.com",
  projectId: "etuitionbd-e7eea",
  storageBucket: "etuitionbd-e7eea.firebasestorage.app",
  messagingSenderId: "117506185962",
  appId: "1:117506185962:web:326d8a43ae02643c7ad593"
};

// Initialize Firebase
const  app = initializeApp(firebaseConfig);

export const auth = getAuth(app);