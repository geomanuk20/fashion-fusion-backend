import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import upload from '../middleware/multer.js'
import { adsproduct, listAdd, removeAds } from '../controllers/adsController.js'


const adsRouter = express.Router()

adsRouter.post('/add',adminAuth,upload.fields([{name:"ads",maxCount:1}]),adsproduct)
adsRouter.get('/list',listAdd)
adsRouter.post('/remove',adminAuth,removeAds);
export default adsRouter