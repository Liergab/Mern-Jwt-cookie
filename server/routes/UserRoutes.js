import express from 'express'
import * as controller from '../controller/UserController.js'
import protect from '../middleware/Protect.js'
const router = express.Router()

router.post('/user/login', controller.login)
router.post('/user/register', controller.register)
router.post('/user/logout', controller.logout)
router.get('/user/getCur',protect, controller.getUser)
router.put('/user/profile',protect, controller.updateUser)

export default router