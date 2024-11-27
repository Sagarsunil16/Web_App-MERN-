import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'

const securePaswword = (password)=>{
    return bcryptjs.hashSync(password,10)
}
export const signup = async(req,res)=>{
    try {
        const {username,email,password} = req.body
        const hashedPassword = securePaswword(password)
        const newUser = new User({username,email,password:hashedPassword})
        await newUser.save()
        res.status(201).json({message:"User Created Successfully"})
    } catch (error) {
       res.status(500).json({error}) 
    }
}