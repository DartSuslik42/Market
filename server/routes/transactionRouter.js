const Router = require('express')
const router = new Router()
const TransactionController = require('../controllers/transactionController')

router.get('/', TransactionController.get)

module.exports = router