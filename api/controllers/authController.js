import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'
import { errorhandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'
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

export const signin = async(req,res,next)=>{
    try {
        const {email,password} = req.body
        const validUser = await User.findOne({email:email})
        if(!validUser){
            return  next(errorhandler(404,"User not found"))
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword){
            return next(errorhandler(401,"Wrong Credentials"))
        }
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const{password:hashedPassword,...rest} = validUser._doc

        const expiryDate = new Date(Date.now()+3600000) //for 1-hour
        res.cookie('access_token',token,{httpOnly:true,expires:expiryDate,}).status(200).json(rest)
    } catch (error) {
        next(error)
    }
}