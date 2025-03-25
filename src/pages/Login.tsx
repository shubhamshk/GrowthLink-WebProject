import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  // State to store user email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Toggle between sign-up and sign-in mode
  const [isSignUp, setIsSignUp] = useState(false);
  // Store any authentication errors
  const [error, setError] = useState('');
  // Hook to navigate between pages
  const navigate = useNavigate();

  // Function to handle form submission (sign-in or sign-up)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload
    setError(''); // Reset error message before making a request

    try {
      if (isSignUp) {
        // If user is signing up, create a new account
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // If user is signing in, authenticate with email and password
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/'); // Redirect to the home page after successful login/signup
    } catch (error: any) {
      setError(error.message); // Display error message if login/signup fails
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background image */}
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/f669a8f4-de1e-49d7-bb56-c9bd1f4a9069/d4f217b2-4001-4df5-b363-27a31d3a1169/US-en-20221031-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      
      {/* Login/signup form container */}
      <div className="relative z-10 bg-black bg-opacity-75 p-16 rounded-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-8">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h1>
        
        {/* Display error message if authentication fails */}
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {/* Form for email and password input */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              className="w-full p-4 rounded bg-gray-700 text-white"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="12345678"
              className="w-full p-4 rounded bg-gray-700 text-white"
              required
            />
          </div>
          
          {/* Submit button for sign-in or sign-up */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-4 rounded font-semibold hover:bg-red-700 transition"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        
        {/* Toggle between sign-in and sign-up */}
        <div className="mt-4 text-gray-400">
          {isSignUp ? "Already have an account?" : "New to Netflix?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-white hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
