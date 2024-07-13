// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoBd2xQdJdOVdESEEcfhfKHNlfmz-tYyo",
  authDomain: "barber-shop-fc206.firebaseapp.com",
  projectId: "barber-shop-fc206",
  storageBucket: "barber-shop-fc206.appspot.com",
  messagingSenderId: "136499155500",
  appId: "1:136499155500:web:d8290b26072b3f229d3789",
  measurementId: "G-9S9R5E6V27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);