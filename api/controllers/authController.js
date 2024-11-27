import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'
import { errorhandler } from "../utils/error.js"

const securePaswword = (password)=>{
    return bcryptjs.hashSync(password,10)
}
export const signup = async(req,res,next)=>{
    try {
        const {username,email,password} = req.body
        const hashedPassword = securePaswword(password)
        const newUser = new User({username,email,password:hashedPassword})
        await newUser.save()
        res.status(201).json({message:"User Created Successfully"})
    } catch (error) {
      next(error)
    }
}