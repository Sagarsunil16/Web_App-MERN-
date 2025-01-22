import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import bcrypt from "bcryptjs";
import axios from "axios";
import {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  signOut,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../../redux/user/userSlice";

const Profile = () => {
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email,
    password: "",
    id: currentUser?._id || "",
  });

  const [profilePicture, setProfilePicture] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProfileStart());

    const formDataWithFile = new FormData();
    formDataWithFile.append("username", formData.username || currentUser.username);
    formDataWithFile.append("email", formData.email || currentUser.email);
    formDataWithFile.append("id", formData.id || currentUser._id);

    if (formData.password) {
      const hashedPassword = bcrypt.hashSync(formData.password, 10);
      formDataWithFile.append("password", hashedPassword);
    }
    if (profilePicture) {
      formDataWithFile.append("profilePicture", profilePicture);
    }

    axios
      .post(`http://localhost:3000/api/user/update/${currentUser._id}`, formDataWithFile, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(updateProfileSuccess(res.data));
      })
      .catch((err) => {
        dispatch(updateProfileFailure());
      });
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const profileImageUrl = currentUser.profilePicture
    ? currentUser.profilePicture.startsWith("http")
      ? currentUser.profilePicture
      : `http://localhost:3000/uploads/${currentUser.profilePicture}`
    : currentUser.profilePicture;

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-8">
      <div className="p-8 max-w-lg mx-auto bg-black rounded-lg shadow-2xl w-full md:w-2/3 border border-gray-800">
        <h1 className="text-3xl font-bold text-center text-white mb-8">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Profile Image Section */}
          <div className="flex justify-center mb-6">
            <img
              className="h-32 w-32 cursor-pointer rounded-full object-cover border-4 border-indigo-500 hover:scale-110 hover:shadow-xl transition-transform duration-300 ease-in-out"
              src={profilePicture ? URL.createObjectURL(profilePicture) : profileImageUrl}
              alt="profile"
              onClick={() => imageRef.current.click()}
            />
          </div>
          <input
            name="profilePicture"
            id="profilePicture"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
            ref={imageRef}
          />

          {/* Username Input */}
          <input
            placeholder="Username"
            type="text"
            id="username"
            name="username"
            defaultValue={currentUser.username}
            className="bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder-gray-400"
            onChange={handleInputChange}
          />

          {/* Email Input */}
          <input
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            defaultValue={currentUser.email}
            className="bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder-gray-400"
            onChange={handleInputChange}
          />

          {/* Password Input */}
          <input
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            className="bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder-gray-400"
            onChange={handleInputChange}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-indigo-600 text-white p-3 rounded-lg uppercase hover:bg-indigo-700 transition duration-300"
          >
            Update Details
          </button>
        </form>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <span
            onClick={handleDeleteAccount}
            className="text-red-600 cursor-pointer hover:underline"
          >
            Delete Account
          </span>
          <span
            onClick={handleSignOut}
            className="text-red-600 cursor-pointer hover:underline"
          >
            Sign Out
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
