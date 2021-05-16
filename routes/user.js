const express = require('express')
const router = express.Router()

const user = require('../controllers/user-controller')

// methode route
router.get('/test', user.userTest)
router.post('/add', user.create)

module.exports = router
