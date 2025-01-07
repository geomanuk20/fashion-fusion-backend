import express from 'express'
import { loginUser,registerUser,adminLogin } from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)

userRouter.post("/auth", authMiddleware, async (req, res) => {
    const { sub, name, email } = req.user;
  
    try {
      let user = await userModel.findOne({ auth0Id: sub });
  
      if (!user) {
        user = await userModel.create({ auth0Id: sub, name, email });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


export default userRouter;