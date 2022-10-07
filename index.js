if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const express = require('express')
const errorHandler = require('./middlewares/errorHandler')
const route = require('./routes/router')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(route)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Apps Listening to port ${port}`)
})

module.exports = app