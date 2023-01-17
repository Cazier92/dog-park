import { Router } from 'express'
import * as dogsCtrl from '../controllers/dogs.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', dogsCtrl.index)
router.get('/new', isLoggedIn, dogsCtrl.new)
router.get('/:id', dogsCtrl.show)

router.post('/', isLoggedIn, dogsCtrl.create)

export {
  router
}