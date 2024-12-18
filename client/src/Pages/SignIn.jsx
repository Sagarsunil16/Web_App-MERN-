import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../Components/OAuth'
const SignIn = () => {
  const [formData,setFormData] = useState({})
  const {loading,error} = useSelector((state)=>state.user)
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      console.log("Response Data:", data); // Debugging
  
      if (!data.success) {
        dispatch(signInFailure(data.message || "Invalid credentials."));
        return;
      }
  
      dispatch(signInSuccess(data.user));
      Navigate("/");
    } catch (error) {
      console.error("Network Error:", error);
      dispatch(signInFailure("Network error. Please try again."));
    }
  };
  
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
        <input onChange={handleChange} type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' />
        <input onChange={handleChange} type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' />
        <button disabled={loading} className='bg-slate-700 text-white uppercase p-3 rounded-lg hover:opacity-90'>{loading?"Loading...":"Sign In"}</button>
        
        <OAuth/>
      </form>
      <div className='flex gap-1 mt-2'>
        <p>Don't have an account?</p>
        <Link to={'/signup'}><span className='text-blue-500'>Sign up</span></Link>
      </div>
      <div className='text-red-500'>
        {error? error || "Something went Wrong" :""}
      </div>
    </div>
  )
}

export default SignIn
