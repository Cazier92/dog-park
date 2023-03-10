import { Router } from 'express'
import * as blogsCtrl from '../controllers/blogs.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', blogsCtrl.index)
router.get('/new', isLoggedIn, blogsCtrl.new)
router.get('/:id', blogsCtrl.show)
router.get('/:id/edit', isLoggedIn, blogsCtrl.edit)
router.get('/:blogId/comments/:commentId', isLoggedIn, blogsCtrl.editComment)

router.post('/', isLoggedIn, blogsCtrl.create)
router.post('/:id/comments', isLoggedIn, blogsCtrl.addComment)

router.put('/:id', isLoggedIn, blogsCtrl.update)
router.put('/:blogId/comments/:commentId', isLoggedIn, blogsCtrl.updateComment)

router.delete('/:id', isLoggedIn, blogsCtrl.delete)
router.delete('/:blogId/comments/:commentId', isLoggedIn, blogsCtrl.deleteComment)

export {
  router
}