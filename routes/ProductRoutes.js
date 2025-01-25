import express from 'express'
import { listProduct, addProduct, removeProduct, singleProduct, editProduct } from '../controllers/ProductController.js';
import upload from '../middleware/multer.js';
import AdminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router()

productRouter.post('/add',AdminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]), addProduct);
productRouter.post('/remove',AdminAuth,removeProduct);
productRouter.get('/single',singleProduct);
productRouter.get('/list',listProduct);
productRouter.put('/update',editProduct)

export default productRouter