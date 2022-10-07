const express = require('express')
const route = express.Router()
const Controller = require('../controller/controller')

route.get('/', Controller.findType)
route.post('/', Controller.createType)
route.delete('/:id', Controller.deleteType)

module.exports = route
