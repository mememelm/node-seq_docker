const express = require('express')
const router = express.Router()

const userRouter = require('./user')
const imageRouter = require('./upload')

// router by element => middleware
router.use('/user', userRouter)
router.use('/upload', imageRouter)

module.exports = router
