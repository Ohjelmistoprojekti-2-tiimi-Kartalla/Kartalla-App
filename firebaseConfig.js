// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "kartalla-98347.firebaseapp.com",
    databaseURL: "https://kartalla-98347-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "kartalla-98347",
    storageBucket: "kartalla-98347.firebasestorage.app",
    messagingSenderId: "100206373287",
    appId: "1:100206373287:web:a9c31e5753d84d5c3cee82",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);