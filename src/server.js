const express = require('express')
const port = process.env.PORT || '3000'
const logger = require('morgan')
const createError = require('http-errors')
const cors = require('cors')
const router = require('./router')
const timeLog = require('./middleware/time_log')
const handleError = require('./middleware/error')

const app = express()

app.use(timeLog)

app.use(express.json())

app.use(logger('dev'))

app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json({msg: 'hi there'})
})

app.use('/api', router)

app.use(function(req, res, next) {
  next(createError(404))
})

app.use(handleError)

export default app
