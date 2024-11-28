import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'
import { errorhandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'
import { now } from "mongoose"
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

export const google = async(req,res,next)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(user){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            const {password:hashedPassword,...rest} = user._doc
            const expiryDate = new Date(Date.now()+3600000) //1 hour
            res.cookie('access_token',token,{httpOnly:true,expires:expiryDate}).status(200).json(rest)
        }else{
          const password =  Math.random().toString(36).slice(-8) +  Math.random().toString(36).slice(-8)
          const hashedPassword =  bcryptjs.hashSync(password,10)
          const newUser = new User({
            username:req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random()*10000).toString(),
            email:req.body.email,
            password:hashedPassword,
            profilePicture:req.body.photo
          })
          await newUser.save()
          const token =  jwt.sign({id:newUser._id},process.env.JWT_SECRET)
          const expiryDate =  new Date(Date.now() + 3600000)
          const {password:hashedPassword1,...rest} = newUser._doc
          res.cookie('access_token',token,{httpOnly:true,expires:expiryDate}).status(200).json(rest)
        }
    } catch (error) {
        next(error)
    }
}