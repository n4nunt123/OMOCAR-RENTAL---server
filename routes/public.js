const express = require('express')
const route = express.Router()
const authentification = require('../middlewares/authentication')
const PublicController = require('../controller/publicController')


route.post('/register', PublicController.register)
route.post('/login', PublicController.login)
route.post('/login/google', PublicController.loginGoogle)
route.get('/transportation', PublicController.findAll)
route.get('/transportation/:tranportationId', PublicController.findById)


route.use(authentification)
route.get('/wishlist', PublicController.userBookmarked)
route.post('/wishlist/:tranportationId', PublicController.bookmark)


module.exports = route