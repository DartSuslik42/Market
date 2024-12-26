const Router = require('express')
const router = new Router()
const DeliveryController = require('../controllers/deliveryController')

router.post('/', DeliveryController.post)
router.get('/', DeliveryController.get)
router.patch('/', DeliveryController.update)

module.exports = router