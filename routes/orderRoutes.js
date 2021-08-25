const express = require('express');
const router = express.Router()

const { newOrder, allOrders,getSingleOrder, myOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController')

router.route('/order/new').post(newOrder)
router.route('/all/orders').get(allOrders)
router.route('/order/:id').get(getSingleOrder)
router.route('/orders').get(myOrders)
router.route('/order/update/:id').put(updateOrderStatus)
router.route('/order/delete/:id').delete(deleteOrder)

module.exports = router