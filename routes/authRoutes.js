const express = require('express')
const router = express.Router()

//import controllers method
const { registerUser, loginUser, logoutUser } = require('../controllers/authControllers')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)

module.exports = router