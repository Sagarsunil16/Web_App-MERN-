import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../../Components/OAuth';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/signin');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="p-12 max-w-2xl bg-gray-900 text-white rounded-2xl shadow-2xl w-full sm:w-[500px] lg:w-[600px]">
        <h1 className="text-4xl font-bold text-center mb-8 font-['Poppins', sans-serif]">Sign Up</h1>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Username Input */}
          <input
            onChange={handleChange}
            type="text"
            placeholder="Username"
            id="username"
            className="bg-gray-800 p-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
          />
          
          {/* Email Input */}
          <input
            onChange={handleChange}
            type="email"
            placeholder="Email"
            id="email"
            className="bg-gray-800 p-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
          />
          
          {/* Password Input */}
          <input
            onChange={handleChange}
            type="password"
            placeholder="Password"
            id="password"
            className="bg-gray-800 p-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
          />
          
          {/* Submit Button */}
          <button
            disabled={loading}
            className="bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition duration-300 disabled:bg-indigo-400"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

          {/* OAuth Section */}
          <OAuth />
        </form>

        {/* Sign In Link */}
        <div className="flex justify-center gap-2 mt-6">
          <p className="text-gray-400">Have an account?</p>
          <Link to="/signin">
            <span className="text-indigo-400 hover:text-indigo-500 transition duration-300">Sign in</span>
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center mt-4">
            {"Something went wrong. Please try again."}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
