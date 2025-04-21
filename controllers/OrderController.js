// controllers/OrderController.js
const Order = require('../models/Order');
const Cart = require('../models/Cart'); // Giả sử bạn có model Cart

exports.checkout = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart || cart.products.length === 0) {
        return res.status(400).send('Cart is empty');
    }

    const total = cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const order = new Order({ user: req.user.id, products: cart.products, total });
    await order.save();

    // Xóa giỏ hàng sau khi đặt hàng
    await Cart.findOneAndDelete({ user: req.user.id });

    res.status(201).send('Order placed successfully');
};

exports.placeOrder = async (req, res) => {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
        return res.status(404).send('Order not found');
    }
    res.json(order);
};

exports.viewOrder = async (req, res) => {
    const order = await Order.findById(req.params.orderId).populate('products.product');
    if (!order) {
        return res.status(404).send('Order not found');
    }
    res.json(order);
};

exports.cancelOrder = async (req, res) => {
    const { orderId } = req.body;
    await Order.findByIdAndDelete(orderId);
    res.send('Order canceled');
};