// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
// const db = getFirestore(app);
export const authentication = getAuth(app);

// async function getCities(db) {
//     const citiesCol = collection(db, 'cities');
//     const citySnapshot = await getDocs(citiesCol);
//     const cityList = citySnapshot.docs.map(doc => doc.data());
//     return cityList;
// }