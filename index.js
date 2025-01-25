import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongodb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/ProductRoutes.js';
import adsRouter from './routes/adsRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import bodyParser from 'body-parser';
import favoriteRouter from './routes/favoriteRoutes.js';
import orderRouter from './routes/orderRoute.js';



// Initialize app
const app = express();
const port = process.env.PORT || 4000;


// Connect to databases
mongodb();
connectCloudinary();

// Apply middlewares
app.use(express.json());
app.use(cors());

// Apply routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/ads', adsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/favorite', favoriteRouter);
app.use('/api/order',orderRouter)

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());


// Test route
app.get('/', (req, res) => {
  res.send('API is working');
});

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
