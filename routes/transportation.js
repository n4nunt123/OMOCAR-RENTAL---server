const express = require('express')
const route = express.Router()
const Controller = require('../controller/controller')
const authorization = require('../middlewares/authorization')

route.get('/', Controller.findAll)
route.post('/', Controller.create)
route.get('/:id', Controller.findById)
route.delete('/:id', authorization, Controller.delete)
route.put('/:id', authorization, Controller.updateTransportations)
route.patch('/:id', authorization, Controller.updateStatus)


module.exports = route
