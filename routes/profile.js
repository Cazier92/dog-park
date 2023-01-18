import { Router } from 'express'
import * as profileCtrl from '../controllers/profile.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/:id', profileCtrl.show)
router.get('/:id/edit', isLoggedIn, profileCtrl.edit)
router.get('/:id/new', isLoggedIn, profileCtrl.new)
router.get('/:id/friendCode', isLoggedIn, profileCtrl.friendCode)
router.get('/:id/friendRequests', isLoggedIn, profileCtrl.friendRequests)

router.post('/:id/dogs', isLoggedIn, profileCtrl.createDog)

router.put('/:id/dogs/:dogsId', isLoggedIn, profileCtrl.updateDogs)

router.patch('/:id/sendFriendRequest', isLoggedIn, profileCtrl.sendFriendRequest)

export {
  router
}