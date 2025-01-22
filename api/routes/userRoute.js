import express from 'express';
const router = express.Router();
import { signout} from '../controllers/authController.js';
import {deleteUser,updateUser} from '../controllers/userController.js'
import { verifyToken } from '../utils/verifyUser.js';
import upload from '../config/multer.js';

// Define route to handle profile update
router.post('/update/:id', upload.single("profilePicture"),verifyToken, updateUser);

router.post('/signout',signout)

router.delete('/delete/:id',verifyToken,deleteUser)
export default router;
