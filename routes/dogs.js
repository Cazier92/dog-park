import { Router } from 'express'
import * as dogsCtrl from '../controllers/dogs.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', dogsCtrl.index)
router.get('/new', isLoggedIn, dogsCtrl.new)
router.get('/:id', dogsCtrl.show)
router.get('/:id/edit', isLoggedIn, dogsCtrl.edit)

router.post('/', isLoggedIn, dogsCtrl.create)

router.put('/:id', isLoggedIn, dogsCtrl.update)

router.delete('/:id', isLoggedIn, dogsCtrl.delete)

export {
  router
}