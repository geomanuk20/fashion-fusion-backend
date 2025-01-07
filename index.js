import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongodb from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/ProductRoutes.js'
import adsRouter from './routes/adsRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'
import userModel from './models/UserModel.js'

//app
 const app = express()
 const port = process.env.PORT || 4000
 mongodb()
 connectCloudinary()


 //middlewares
 app.use(express.json())
 app.use(cors())

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/ads',adsRouter)

app.get('/api/protected', authMiddleware, async (req, res) => {
    const { sub, email, name } = req.user;
  
    // Find or create user in MongoDB
    let user = await userModel.findOne({ auth0Id: sub });
    if (!user) {
      user = await userModel.create({ auth0Id: sub, email, name });
    }
  
    res.json({ message: "Access granted", user });
  });
  

app.get('/',(req,res)=>{
    res.send('api working')
})
 app.listen(port,()=> console.log('server start'))