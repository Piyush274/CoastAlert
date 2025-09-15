// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;

