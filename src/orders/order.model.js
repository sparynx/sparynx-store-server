const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        zipcode: {
            type: Number,
            required: true,
        }
    },
    phone: {
        type: Number,
        required: true
    },
    productIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
}, {
    timestamps: true,
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;