import { Router } from 'express'
import * as blogsCtrl from '../controllers/blogs.js'

const router = Router()

router.get('/', blogsCtrl.index)

export {
  router
}