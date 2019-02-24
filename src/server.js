import express from 'express'
import logger from 'morgan'
import createError from 'http-errors'
import cors from 'cors'
import router from './router'
import { timeLog, handleError } from './middleware/index'
const port = process.env.PORT || '3000'

const app = express()

app.use(timeLog)

app.use(express.json())

app.use(logger('dev'))

app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json({msg: 'welcome'})
})

app.use('/api', router)

app.use(function(req, res, next) {
  next(createError(404))
})

app.use(handleError)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
