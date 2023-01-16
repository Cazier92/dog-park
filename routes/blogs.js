import { Router } from 'express'
import * as blogsCtrl from '../controllers/blogs.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', blogsCtrl.index)
router.get('/new', isLoggedIn, blogsCtrl.new)
router.get('/:id', blogsCtrl.show)

router.post('/', isLoggedIn, blogsCtrl.create)


export {
  router
}