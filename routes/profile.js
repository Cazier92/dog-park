import { Router } from 'express'
import * as profileCtrl from '../controllers/profile.js'

const router = Router()

router.get('/:id', profileCtrl.index)

export {
  router
}