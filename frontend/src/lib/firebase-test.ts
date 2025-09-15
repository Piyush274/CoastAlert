// Firebase connection test
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3qZ0T5s_otk5It1VsGzau9Cpp8dtRDgE",
  authDomain: "coastalert-afee4.firebaseapp.com",
  projectId: "coastalert-afee4",
  storageBucket: "coastalert-afee4.firebasestorage.app",
  messagingSenderId: "160166334673",
  appId: "1:160166334673:web:9a1f27edfe28cf57b835f0",
  measurementId: "G-32E7V21R8X"
};

// Test Firebase initialization
export const testFirebaseConnection = async () => {
  try {
    console.log("Testing Firebase connection...");
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    console.log("✅ Firebase initialized successfully");
    console.log("Auth domain:", auth.config.authDomain);
    return { success: true, app, auth };
  } catch (error) {
    console.error("❌ Firebase initialization failed:", error);
    return { success: false, error };
  }
};
