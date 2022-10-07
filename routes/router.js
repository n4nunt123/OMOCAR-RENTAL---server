const express = require('express')
const route = express.Router()
const transportation = require('./transportation')
const user = require('./user')
const type = require('./type')
const main = require('./main')
const publicRoute = require('./public')
const authentification = require('../middlewares/authentication')

route.use('/', main)
route.use('/public', publicRoute)
route.use(authentification)
route.use('/transportations', transportation)
route.use('/types', type)
route.use('/users', user)


module.exports = route
