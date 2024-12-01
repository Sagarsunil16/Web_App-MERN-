
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'
const PrivateRoute = () => {
    const token =document.cookie.split(';').find(cookie=>cookie.trim().startsWith('access_token='))
    const {currentUser} = useSelector((state)=>state.user)
    console.log(currentUser,"1")
  return currentUser?<Outlet/>:<Navigate to='/signin'/>
  
}

export default PrivateRoute
