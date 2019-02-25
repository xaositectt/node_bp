import express from 'express'
import Article from './controllers/article_controller'
const router = express.Router()
const articleRoutes = new Article()

router.get('/article', articleRoutes.index)
router.post('/article', articleRoutes.create)

export default router
