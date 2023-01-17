import { Router } from 'express'
import * as profileCtrl from '../controllers/profile.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/:id', profileCtrl.show)
router.get('/:id/edit', isLoggedIn, profileCtrl.edit)

router.post('/:id/dogs', isLoggedIn, profileCtrl.createDog)

router.put('/:id', isLoggedIn, profileCtrl.updateDogs)

export {
  router
}