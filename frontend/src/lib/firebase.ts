// src/lib/firebase.ts

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // <-- ADD THIS LINE for authentication


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXLTF_XAUmG4ZHFCDSBrIgEJBNjUoj0KM",
  authDomain: "coastalert-1080c.firebaseapp.com",
  projectId: "coastalert-1080c",
  storageBucket: "coastalert-1080c.firebasestorage.app",
  messagingSenderId: "194545180844",
  appId: "1:194545180844:web:a21d3dfb90dab269043f09",
  measurementId: "G-VC5M6C8H52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app); 