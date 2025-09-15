Implement full stack auth functionality (also login/signup with google) using firebase
Create a login and signup page linked to Sigup and Login Button


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3qZ0T5s_otk5It1VsGzau9Cpp8dtRDgE",
  authDomain: "coastalert-afee4.firebaseapp.com",
  projectId: "coastalert-afee4",
  storageBucket: "coastalert-afee4.firebasestorage.app",
  messagingSenderId: "160166334673",
  appId: "1:160166334673:web:9a1f27edfe28cf57b835f0",
  measurementId: "G-32E7V21R8X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
