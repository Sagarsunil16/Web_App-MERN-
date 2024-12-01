import express from 'express';
const router = express.Router();
import User from '../models/userModel.js';
import { signout} from '../controllers/authController.js';
import {deleteUser,updateUser} from '../controllers/userController.js'
import multer from 'multer';
import isAuthenticated from '../middleware/auth.js'
import { verifyToken } from '../utils/verifyUser.js';
import upload from '../config/multer.js';

// Define route to handle profile update
router.post('/update', upload.single("profilePicture"), updateUser);

router.post('/signout',isAuthenticated,signout)

router.delete('/delete/:id',deleteUser)
export default router;
