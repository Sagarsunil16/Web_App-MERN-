import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
const Navbar = () => {
  const {currentUser} = useSelector((state)=>state.user)
  // console.log(currentUser)
  return (
    <div className='bg-slate-300'>
     <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
      <h1  className='font-bold'>Web App</h1>
      <ul className='flex justify-between gap-5'>
        {
          currentUser?<Link to={'/'}> <li>Home</li></Link>:""
        }
        {/* <Link to={'/about'}>  <li>About</li></Link> */}
       
        {currentUser? (
           <Link to={'/profile'}><img className='h-7 w-7 rounded-full object-cover' src={currentUser.profilePicture} alt="profile" /></Link>
        )
        :(
          <Link to={'/profile'}><li>Sign In</li></Link>
        )}
        
        
      </ul>
     </div>
   
      
   
    </div>
  )
}

export default Navbar
