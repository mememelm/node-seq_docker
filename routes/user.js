const express = require('express')
const router = express.Router()

const user = require('../controller/user-controller')

// methode route
router.get('/test', user.userTest)

module.exports = router
