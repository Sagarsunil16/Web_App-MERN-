import User from "../models/userModel.js"
import { errorhandler } from "../utils/error.js";
import path from 'path'
export const updateUser = async (req, res, next) => {
    try {
      console.log(req.user.id,req.params.id)
      if(req.user.id!==req.params.id){
        return res.status(401).json({message:"User not Found"})
      }
      const {username, email, password } = req.body;
      // Check for a profile picture update
      let profilePicture = req.file?`http://localhost:3000/uploads/${req.file.filename}`:undefined
      console.log(profilePicture)
  
      const updateData = { username, email }; // Build the update object
  
      if (password) updateData.password = password;
      if (profilePicture) updateData.profilePicture = profilePicture;
  
      const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      next(error); // Forward error to the error handler
    }
  };
  

  export const deleteUser = async(req,res,next)=>{
    console.log(req.user.id,req.params.id)
    if(req.user.id!==req.params.id){
      return next(errorhandler(401,"You can delete only your account"))
    }
    try{
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has been Deleted')
    }catch{
      next(error);
    }
  }