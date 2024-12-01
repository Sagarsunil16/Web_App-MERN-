import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="bg-white min-h-screen text-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-black mb-8">
          Welcome
        </h1>
        <p className="text-lg text-slate-700 mb-4">
          We're so glad you're here. Explore and enjoy your stay!
        </p>
        <div className="flex justify-center">
          <Link to={'/profile'}><button type='button' className="bg-slate-100 text-slate-900 px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-slate-300 transition">
            Get Started
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
