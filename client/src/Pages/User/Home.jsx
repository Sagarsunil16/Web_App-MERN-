import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { startGetUsers, successGetUsers, failureGetUsers } from '../../redux/admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserManagement = async (e) => {
    e.preventDefault();
    dispatch(startGetUsers());
    try {
      const res = await axios.get('http://localhost:3000/api/admin/users');
      dispatch(successGetUsers(res.data));
      navigate('/users');
    } catch (err) {
      console.error("Error fetching users:", err.response ? err.response.data : err.message);
      dispatch(failureGetUsers(err));
    }
  };

  return (
    <div className="bg-black min-h-screen text-slate-900 flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto p-8">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-6 tracking-wide">
          Welcome {currentUser.is_Admin ? "Admin" : ""}
        </h1>
        <h2 className="text-4xl font-extrabold text-pink-700 mb-6 tracking-wide">
          {currentUser.username?.toUpperCase()}
        </h2>
        <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
          We're so glad you're here. Explore the amazing features and enjoy your stay!
        </p>

        <div className="flex justify-center">
          {currentUser.is_Admin ? (
            <div className="flex gap-4 flex-wrap">
              <Link to="/profile">
                <button
                  type="button"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                >
                  Profile
                </button>
              </Link>
              <button
                onClick={handleUserManagement}
                type="button"
                className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
              >
                Manage Users
              </button>
            </div>
          ) : (
            <Link to="/profile">
              <button
                type="button"
                className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
              >
                Profile
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
