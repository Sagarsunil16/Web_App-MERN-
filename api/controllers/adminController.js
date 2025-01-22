import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
export const getUsers = async(req,res,next)=>{
    try {
       const userData = await User.find({is_Admin:false}).sort({_id:-1}).select('-password')

       res.status(200).json({message:"Users Fetched Successfully",userData})
    } catch (error) {
        next(error)
    }
}

export const createUser = async(req,res,next)=>{
    try {
        const {email,username} = req.body
        if (!email || !username) {
            return res.status(400).json({ message: "Email and username are required." });
          }
        const password = username
        const hashedPassword = bcrypt.hashSync(password,10)
        const newUser = await User.create({
            username,
            email,
            password:hashedPassword
        })
       const {passwword,...rest} = newUser._doc
       console.log(rest)
        res.status(200).json({message:"Successfully created User",rest})
    } catch (error) {
        next(error)
    }
}
export const updateUser = async(req,res,next)=>{
    try {

        const {_id,username,email} = req.body
        const updatedUser = await User.findByIdAndUpdate(_id,{
            $set:{
                username,
                email
            }
        },{new:true})

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({message:"Updated Successfully",updatedUser})
    } catch (error) {
        next(error)
    }
}



export const deleteUser = async(req,res,next)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        const updatedUsers =  await User.find({is_Admin:false}).sort({_id:-1}).select('-password')
        res.status(200).json({message:"Deleted Successfully",updatedUsers})
    } catch (error) {
        next(error)
    }
}