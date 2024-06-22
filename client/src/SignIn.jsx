import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store the token in localStorage
      localStorage.setItem('token', data.token);

      console.log('Login successful:', data);
      // Redirect to the admin page upon successful login
      navigate('/admin');
    } catch (error) {
      console.error('There was an error logging in the user:', error.message);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#242424]">
      <div className="bg-[#424242] p-8 rounded-lg shadow-md w-full max-w-72 sm:max-w-lg md:mt-10">
        <div className="flex justify-center mb-4">
          <img src={"/logo.svg"} alt="Fuelemy" className="w-16 absolute top-3 left-3" />
        </div>
        <h2 className="text-2xl font-semibold text-white text-start mb-4">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-[#2c2d2c] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" 
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-[#2c2d2c] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-yellow-500 text-gray-900 p-3 rounded font-semibold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
          >
            Sign In
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="mt-4 text-center text-gray-300">
          New user? <Link to="/signup" className="text-yellow-500 hover:underline">Create an account!</Link>
        </div>
        <div className="mt-6 border-t border-[#424242] pt-4">
          <button className="w-full flex items-center justify-center p-3 bg-[#424242] text-white rounded hover:bg-gray-600">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" className="mr-2" />
            Sign in with Google
          </button>
          <button className="w-full flex items-center justify-center p-3 mt-2 bg-[#424242] text-white rounded hover:bg-gray-600">
            <img src="https://img.icons8.com/ios-filled/16/ffffff/mac-os.png" alt="Apple" className="mr-2" />
            Sign in with Apple
          </button>
        </div>
      </div>
    </div>
  );
}
