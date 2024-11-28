
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'
const PrivateRoute = () => {
    const {currentUser} = useSelector((state)=>state.user)
    console.log(currentUser,"1")
  return currentUser?<Outlet/>:<Navigate to='/signin'/>
  
}

export default PrivateRoute
