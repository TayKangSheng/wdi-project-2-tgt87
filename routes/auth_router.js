const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth_controller')

router.get('/signup', authController.signup)

router.post('/signup', authController.authSignup)

router.get('/login', authController.login)

router.post('/login', authController.authLogin)

router.get('/logout', authController.logout)

module.exports = router
