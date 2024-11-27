import React, { useState } from 'react'

const SignIn = () => {
  const [formData,setFormData] = useState({})
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' >
        <input onChange={handleChange} type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' />
        <input onChange={handleChange} type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' />
        <button className='bg-red-700 p-3 rounded-lg hover:opacity-90'>Sign In</button>
      </form>
    </div>
  )
}

export default SignIn
