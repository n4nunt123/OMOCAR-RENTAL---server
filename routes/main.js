const express = require('express')
const route = express.Router()
const Controller = require('../controller/controller')

route.post('/register', Controller.register)
route.post('/login', Controller.login)
route.post('/login/google', Controller.loginGoogle)
route.get('/histories', Controller.history)

module.exports = route
