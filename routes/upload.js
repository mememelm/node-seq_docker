const express = require('express')
const router = express.Router()

const { destination, upload, uploadImage } = require('../midlleware/upload')

router.post('/image', uploadImage)
router.post('/file', destination, upload)

module.exports = router