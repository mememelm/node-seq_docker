const express = require('express')
const router = express.Router()

const user = require('../controllers/user-controller')
const mid = require('../midlleware/md-stripe')

router.get('/test', user.userTest)
router.post('/add', user.create)
router.get('/get-all', user.getAll)
router.put('/:id', user.update)
router.delete('/:id', user.destroy)
router.get('/stripe', mid.fnStripe)

module.exports = router
