const Order = require('../models/order')
const Service = require('../models/post')

// create new order
exports.newOrder = async(req, res, next) => {

    const {

        shippingInfo,
        orderItems,
        paymentInfo,
        paidAt,
        orderStatus,
        deliveredAt,
        createdAt,
        email

    } = req.body

    const order = await Order.create({

        shippingInfo,
        orderItems,
        paymentInfo,
        paidAt,
        orderStatus,
        deliveredAt,
        createdAt,
        email

    })

    res.status(200).json({
        success: true,
        order
    })

}

// get my orders / User
exports.getSingleOrder = async(req, res, next) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(!order){
        return req.status(400).json({ error: 'No order found with this id'})
    }

    res.status(200).json({
        success: true,
        order
    })

}

// get my orders / User
exports.myOrders = async(req, res, next) => {

    const orders = await Order.find({ email: req.query.email })

    res.status(200).json({
        success: true,
        orders
    })

}

// get all orders / Admin
exports.allOrders = async(req, res, next) => {

    const allOrder = await Order.find()

    res.status(200).json({
        success: true,
        allOrder
    })

}


// update process order orderStatus
exports.updateOrderStatus = async(req, res, next) => {

    const order = await Order.findById(req.params.id)

    if(order.orderStatus === 'Done'){
        return req.status(200).json({ message: 'You have already complete this service'})
    }

    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
        order
    })

}

// Delete order
exports.deleteOrder = async(req, res, next) => {

    const order = await Order.findById(req.params.id)

    if(!order){
        return req.status(400).json({ error: 'No order found with this id'})
    }

    await order.remove()

    res.status(200).json({
        success: true
    })

}