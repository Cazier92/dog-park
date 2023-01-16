import { Router } from 'express'
import * as blogsCtrl from '../controllers/blogs.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', blogsCtrl.index)
router.get('/new', isLoggedIn, blogsCtrl.new)

router.post('/blogs', isLoggedIn, blogsCtrl.create)


export {
  router
}