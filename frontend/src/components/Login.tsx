// src/components/Login.tsx

import { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom'; // We only need this hook

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the navigate hook

  // Function to handle standard email and password login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // On success, navigate to the dashboard
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Error logging in:", error);
      // A simple alert is great for a hackathon
      alert("Login Failed: " + error.message);
    }
  };

  // Function to handle Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // On success, also navigate to the dashboard
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Error with Google sign-in:", error);
      alert("Google Sign-In Failed: " + error.message);
    }
  };

  // This is the UI for the login form
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <hr />
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;