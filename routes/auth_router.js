const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth_controller')
const loggedIn = require('../middleware/loggedIn')

router.get('/signup', loggedIn.isLoggedIn, authController.signup)

router.post('/signup', loggedIn.isLoggedIn, authController.authSignup)

router.get('/login', loggedIn.isLoggedIn, authController.login)

router.post('/login', loggedIn.isLoggedIn, authController.authLogin)

router.get('/logout', authController.logout)

module.exports = router
