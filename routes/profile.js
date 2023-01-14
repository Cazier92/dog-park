import { Router } from 'express'
import * as profileCtrl from '../controllers/profile.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/:id', profileCtrl.show)
router.get('/:id/edit', profileCtrl.edit)

router.post('/:id/dogs', profileCtrl.createDog)

export {
  router
}