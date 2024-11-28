import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";
import PrivateRoute from "./Components/PrivateRoute";
const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
