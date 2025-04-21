// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
    products: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
    total: Number,
    status: { type: String, default: 'Pending' },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;