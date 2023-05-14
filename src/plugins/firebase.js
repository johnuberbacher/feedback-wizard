// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDvkFD5kj4y1WOxe5vsyXVVhyxvnqjRXuY",
    authDomain: "feedback-wizard.firebaseapp.com",
    projectId: "feedback-wizard",
    storageBucket: "feedback-wizard.appspot.com",
    messagingSenderId: "240727461487",
    appId: "1:240727461487:web:e168c3c32af3710f43c79a",
    measurementId: "G-4C4V12Q0HN"
};

// Initialize Firebase
const fb = initializeApp(firebaseConfig);
const analytics = getAnalytics(fb);

export {fb, analytics}