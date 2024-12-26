const Router = require('express')
const router = new Router()
const OrderController = require('../controllers/orderController')

router.post('/', OrderController.post)
router.get('/', OrderController.get)
router.patch('/', OrderController.update)

module.exports = router