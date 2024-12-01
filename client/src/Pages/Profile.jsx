import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useRef } from "react";
import bcrypt from 'bcryptjs'
import axios from 'axios'
import {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  signOut,
  deleteUserFailure,deleteUserStart,deleteUserSuccess
} from "../redux/user/userSlice";

const Profile = () => {
  const imageRef = useRef(null);
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user);
 

  const [formData,setFormData] = useState({
    username:currentUser?.username||"",
    email:currentUser?.email,
    password:"",
    id:currentUser?._id || "",
  })
  const [profilePicture, setProfilePicture] = useState(null); // state for the selected image

  const handleInputChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
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
    console.log(formDataWithFile,"formData");
    axios.post("http://localhost:3000/api/user/update",formDataWithFile)
    .then(res=>{
      dispatch(updateProfileSuccess(res.data))
    })
    .catch((err)=>{console.log(err)
    dispatch(updateProfileFailure)})
      
  };
  
  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
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
  }
  const profileImageUrl = currentUser.profilePicture 
  ? `http://localhost:3000/uploads/${currentUser.profilePicture}` 
  : '/default-profile.png'
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-10">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="profilePicture" id="profilePicture"  type="file"  accept="image/*" onChange={handleFileChange} hidden ref={imageRef} />
        <img
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          src={profileImageUrl}
          alt="profile"
          onClick={()=>imageRef.current.click()}
        />
        <input
          placeholder="Username"
          type="text"
          id="username"
          name="username"
          defaultValue={currentUser.username}
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleInputChange}
        />

        <input
          placeholder="Email"
          type="email"
          id="email"
          name="email"
          defaultValue={currentUser.email}
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleInputChange}
        />

        <input
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleInputChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90">
          Update Details
        </button>
      </form>
      <div className="flex justify-between mt-2">
        <span onClick={handleDeleteAccount} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
