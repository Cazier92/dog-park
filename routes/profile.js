import { Router } from 'express'
import * as profileCtrl from '../controllers/profile.js'

const router = Router()

router.get('/', profileCtrl.index)

export {
  router
}