import { Router } from 'express'
import * as profileCtrl from '../controllers/profile.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/:id', profileCtrl.show)
router.get('/:id/edit', isLoggedIn, profileCtrl.edit)
router.get('/:id/new', isLoggedIn, profileCtrl.new)
router.get('/:id/friendCode', isLoggedIn, profileCtrl.friendCode)
router.get('/:id/friendRequests', isLoggedIn, profileCtrl.friendRequests)
router.get('/:id/friends', isLoggedIn, profileCtrl.showFriends)
// router.get('/:id/messages', isLoggedIn, profileCtrl.showMessages)

router.post('/:id/dogs', isLoggedIn, profileCtrl.createDog)

router.put('/:id/dogs/:dogsId', isLoggedIn, profileCtrl.updateDogs)

router.patch('/:id/sendFriendRequest', isLoggedIn, profileCtrl.sendFriendRequest)
router.patch('/:userId/profile/:globalProfileId', isLoggedIn, profileCtrl.addFriend)
router.patch('/:userId/profile/:globalProfileId/denyRequest', isLoggedIn, profileCtrl.denyRequest)
router.patch('/:id/addFriendByCode', isLoggedIn, profileCtrl.addFriendByCode)

export {
  router
}