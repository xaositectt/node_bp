import express from 'express'
import Article from '../controllers/article_controller'
const router = express.Router()
const articleRoutes = new Article()

router.get('/article', articleRoutes.index)
router.get('/article/:id', articleRoutes.get)
router.post('/article', articleRoutes.create)
router.put('/article/:id', articleRoutes.update)
router.delete('/article/:id', articleRoutes.delete)

export default router
