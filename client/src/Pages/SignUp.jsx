import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const SignUp = () => {
  const [formData,setFormData] = useState({})
  const [loading,setLoading] =useState(false)
  const [error,setError] = useState(false)
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value
  })
}

const handleSubmit = async(e)=>{
  e.preventDefault()
  try {
    setLoading(true)
    setError(false)
    const res = await fetch("/api/auth/signup",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    });
    const data = await res.json()
    setLoading(false)
    if(data.success===false){
      setError(true)
      return
    }
  } catch (error) {
    setLoading(false)
    setError(true)
  }
}

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={handleChange} type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' />
        <input onChange={handleChange} type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' />
        <input onChange={handleChange} type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-60'>{loading?"loading...":"Sign Up"}</button>
        <button className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-60'>Continue With Google</button>
      </form>
      <div className='flex gap-1 mt-2'>
        <p>Have an account?</p>
        <Link to={'/signin'}><span className='text-blue-500'>Sign in</span></Link>
      </div>
      <div className='text-red-500'>
        {error && "Something went Wrong"}
      </div>
    </div>
  )
}

export default SignUp
