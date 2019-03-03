import express from 'express'
import { article } from '../controllers/index'
const router = express.Router()

router.get('/article', article.index)
router.get('/article/:id', article.get)
router.post('/article', article.create)
router.put('/article/:id', article.update)
router.delete('/article/:id', article.remove)

export default router
