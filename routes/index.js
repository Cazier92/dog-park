import { Router } from 'express'
import { randomDog } from '../controllers/api.js'


const router = Router()

// router.get('/', function (req, res) {
//   res.render('index', { title: 'Home Page' })
// }, randomDog)

router.get('/', randomDog)

export {
  router
}
