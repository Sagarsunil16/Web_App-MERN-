import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/User/Home";

import About from "./Pages/User/About";
import SignIn from "./Pages/User/SignIn";
import SignUp from "./Pages/User/SignUp";
import Profile from "./Pages/User/Profile";
import Navbar from "./Components/Navbar";
import PrivateRoute from "./Components/PrivateRoute"; 
import PublicRoute from "./Components/PublicRoute";
import Users from "./Pages/Admin/Users";
const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route
          path="/login"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />


        {/* Protected Routes for Regular Users */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

         {/* Admin-Only Protected Routes */}
        <Route element={<PrivateRoute adminOnly />}>
          {/* <Route path="/admin" element={<AdminHome />} /> */}
          <Route path="users" element ={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
