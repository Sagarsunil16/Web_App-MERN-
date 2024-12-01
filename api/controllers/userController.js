import User from "../models/userModel.js"
import { errorhandler } from "../utils/error.js";
import path from 'path'
export const updateUser = async (req, res, next) => {
    try {
      
      const { id, username, email, password } = req.body;
      
      // Check for a profile picture update
      let profilePicture = req.file.filename
      
  
      const updateData = { username, email }; // Build the update object
  
      if (password) updateData.password = password;
      if (profilePicture) updateData.profilePicture = profilePicture; // Update if provided
  
      console.log("Update Data:", updateData); // Debug update data
  
      const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      next(error); // Forward error to the error handler
    }
  };
  

  export const deleteUser = async(req,res,next)=>{
    // if(req.user._id!==req.params.id){
    //   return next(errorhandler(401,"You can delete only your account"))
    // }
    try{
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has been Deleted')
    }catch{
      next(error);
    }
  }