import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../../Components/OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        withCredentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.success) {
        dispatch(signInFailure(data.message || "Invalid credentials."));
        return;
      }

      dispatch(signInSuccess(data.user));
      navigate("/");
    } catch (error) {
      console.error("Network Error:", error);
      dispatch(signInFailure("Network error. Please try again."));
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="p-12 max-w-2xl bg-gray-900 text-white rounded-2xl shadow-2xl w-full sm:w-[500px] lg:w-[600px]">
        <h1 className="text-4xl font-bold text-center mb-8 font-['Poppins', sans-serif]">Sign In</h1>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
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
            {loading ? "Loading..." : "Sign In"}
          </button>

          {/* OAuth Section */}
          <OAuth />
        </form>

        {/* Sign Up Link */}
        <div className="flex justify-center gap-2 mt-6">
          <p className="text-gray-400">Don't have an account?</p>
          <Link to="/signup">
            <span className="text-indigo-400 hover:text-indigo-500 transition duration-300">Sign up</span>
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center mt-4">
            {error || "Something went wrong"}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
