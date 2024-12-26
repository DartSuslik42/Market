const Router = require('express')
const router = new Router()
const BlockController = require('../controllers/blockController')

router.get('/', BlockController.get)

module.exports = router