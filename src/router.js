import express from 'express'
import { test } from './controllers/article_controller'
const router = express.Router()

router.get('/article', test)

export default router
