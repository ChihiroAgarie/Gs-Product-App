// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCiAyghu3sJRDkESYFqj2P_cHPqCK4KUM",
    authDomain: "gs-product-2201.firebaseapp.com",
    projectId: "gs-product-2201",
    storageBucket: "gs-product-2201.appspot.com",
    messagingSenderId: "521751296039",
    appId: "1:521751296039:web:f788769e41de4f8fa6f602",
    measurementId: "G-EVVYB907ZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const authentication = getAuth(app);
export const db = getFirestore(app);

