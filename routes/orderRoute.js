import express from 'express'
import {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders , userOrders, updateStatus,verifyStripe,verifyRazorpay} from '../controllers/orderController.js'
//import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/authUser.js'

const orderRouter = express.Router()

// admin features
orderRouter.post('/list',allOrders)
orderRouter.post('/status',updateStatus)

// payment features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

// user features
orderRouter.post('/userorders',authUser,userOrders)

//verify payment
orderRouter.post('/verifyStripe',verifyStripe)
orderRouter.post('/verifyRazorpay',verifyRazorpay)

export default orderRouter