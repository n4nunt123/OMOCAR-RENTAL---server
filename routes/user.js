const express = require('express')
const route = express.Router()
const Controller = require('../controller/controller')

route.get('/', Controller.findUser)

module.exports = route
