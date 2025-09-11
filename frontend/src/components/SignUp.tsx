// src/components/SignUp.tsx

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom'; // We only need this hook

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // This creates the user in Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      // On success, immediately send them to the dashboard
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Error signing up:", error);
      // A simple alert is perfect for demo feedback
      alert("Sign Up Failed: " + error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
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
          placeholder="Create a password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;