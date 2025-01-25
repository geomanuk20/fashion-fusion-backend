import express from 'express'
import {addToFavorites,updateFavorites,getUserFavorites} from '../controllers/favoriteController.js'
import authUser from '../middleware/authUser.js'


const favoriteRouter = express.Router()

favoriteRouter.post('/get',authUser,getUserFavorites)
favoriteRouter.post('/add',authUser,addToFavorites)
favoriteRouter.post('/update',authUser,updateFavorites)


export default favoriteRouter;