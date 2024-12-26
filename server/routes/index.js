const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const blockRouter = require('./blockRouter')
const deliveryRouter = require('./deliveryRouter')
const orderRouter = require('./orderRouter')
const transactionRouter = require('./transactionRouter')


router.use('/user', userRouter)
router.use('/delivery', deliveryRouter)
router.use('/order', orderRouter)
router.use('/transaction', transactionRouter)
router.use('/block', blockRouter)

module.exports = router