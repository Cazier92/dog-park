import { Router } from 'express'
import * as convoCtrl from '../controllers/convo.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/:id', isLoggedIn, convoCtrl.index)
router.get('/:userId/messages/:friendId', isLoggedIn, convoCtrl.show)
// router.get('/:convoId', isLoggedIn, convoCtrl.show)

router.post('/:userId/messages/:friendId', isLoggedIn, convoCtrl.create)

export {
  router
}