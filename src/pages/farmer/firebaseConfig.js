// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCBpputcaLlDMR5iEe8LWcBI9eF7ikXvUM",
    authDomain: "agri-demand.firebaseapp.com",
    projectId: "agri-demand",
    storageBucket: "agri-demand.appspot.com",
    messagingSenderId: "676406462111",
    appId: "1:676406462111:web:2d14d798ff1bc8213444aa",
    measurementId: "G-RVZV0N9NV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase storage reference
const storage = getStorage(app);
export default storage;