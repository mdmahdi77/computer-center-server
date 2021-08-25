const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },

    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // },

    email: {
        type: String,
        required: true
    },

    orderItems: [
        {
            title: {
                type: String,
                
            },
            image: {
                type: String,
               
            },
            price: {
                type: Number,
                
            }
        }
    ],

    paymentInfo: {
        id: {
            type: String
        }
    },

    orderStatus: {
        type: String,
        required: true,
        default: 'Pending'
    },

    deliveredAt: {
        type: Date
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }


})

module.exports = mongoose.model('Order', orderSchema)