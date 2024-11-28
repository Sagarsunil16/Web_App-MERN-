import React from 'react'
import { useSelector } from 'react-redux'
const Profile = () => {
  const {currentUser} = useSelector((state)=>state.user)
  console.log(currentUser,"2")
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-10'>Profile</h1>
      <form className='flex flex-col gap-4' >
        <img className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2' src={currentUser.profilePicture} alt="profile" />
        <input placeholder='Username' type="text" id='username' name='username' defaultValue={currentUser.username} className='bg-slate-100 rounded-lg p-3' />

        <input placeholder='Email' type="email" id='email' name='email' defaultValue={currentUser.email} className='bg-slate-100 rounded-lg p-3' />

        <input placeholder='Password' type="password" id='password' name='password'  className='bg-slate-100 rounded-lg p-3' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90'>Update Details</button>
      </form>
      <div className='flex justify-between mt-2'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile
