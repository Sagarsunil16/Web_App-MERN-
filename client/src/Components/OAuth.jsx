import {GoogleAuthProvider,signInWithPopup,getAuth} from "firebase/auth"
import { app } from "../firebase"
import { useDispatch } from "react-redux"
import { signInSuccess } from "../redux/user/userSlice"
import {useNavigate} from 'react-router-dom'
const OAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async()=>{
        try {
            const Provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth,Provider)
            const res = await fetch('/api/auth/google',{
                method:"POST",
                headers:{
                    'Content-type':'Application/json'
                },
                body:JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL
                })
            })
            const data = await res.json()
            console.log(data)
            dispatch(signInSuccess(data))
            navigate("/")
        } catch (error) {
            console.log("Couldnt able to sign in through Google",error)
        }
    }
  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-60'>
        Continue With Google
    </button>
  )
}

export default OAuth
