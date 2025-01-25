import express from 'express'
import upload from '../middleware/multer.js'
import { adsproduct, listAdd, removeAds } from '../controllers/adsController.js'


const adsRouter = express.Router()

adsRouter.post('/add',upload.fields([{name:"ads",maxCount:1}]),adsproduct)
adsRouter.get('/list',listAdd)
adsRouter.post('/remove',removeAds);
export default adsRouter