import express from 'express'
import {adminLogin,registerUser,loginUser,forgotPassword,resetPassword} from '../controllers/userController.js'



const userRouter = express.Router();


userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)

userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password/:id/:token', resetPassword);


export default userRouter;