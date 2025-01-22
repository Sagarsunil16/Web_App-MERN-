import express from 'express'
const router = express.Router()
import { verifyToken } from '../utils/verifyUser.js';
import { getUsers,updateUser,deleteUser,createUser } from '../controllers/adminController.js'


router.get('/users',getUsers)
router.post('/createuser',createUser)
router.put('/update',updateUser)
router.delete('/delete/:id',deleteUser)

export default router