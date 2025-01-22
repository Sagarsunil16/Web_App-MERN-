import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-black shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4 py-3">
        <h1 className="text-white text-3xl font-bold tracking-wider hover:text-indigo-400 transition duration-300">
          Web App
        </h1>
        <ul className="flex items-center space-x-6">
          {currentUser && (
            <Link to="/" className="text-white text-lg font-medium hover:text-indigo-400 transition duration-300">
              <li>Home</li>
            </Link>
          )}

          {currentUser ? (
            <Link to="/profile">
              <img
                className="h-10 w-10 rounded-full border-2 border-white shadow-lg hover:border-indigo-400 transition duration-300"
                src={currentUser.profilePicture}
                alt="profile"
              />
            </Link>
          ) : (
            <Link to="/profile" className="text-white text-lg font-medium hover:text-indigo-400 transition duration-300">
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
