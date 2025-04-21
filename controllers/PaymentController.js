// controllers/PaymentController.js
const Order = require('../models/Order');

exports.createPayment = async (req, res) => {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
        return res.status(404).send('Order not found');
    }

    // Logic để gọi API thanh toán (VNPAY, Momo, PayPal, v.v.)
    // Giả sử bạn có một hàm gọi API thanh toán
    const paymentUrl = await initiatePayment(order);
    res.json({ paymentUrl });
};

exports.paymentCallback = async (req, res) => {
    const { orderId, status } = req.body;
    // Xử lý callback từ API thanh toán
    if (status === 'success') {
        await Order.findByIdAndUpdate(orderId, { status: 'Paid' });
        res.send('Payment successful');
    } else {
        res.send('Payment failed');
    }
};

exports.paymentStatus = async (req, res) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
        return res.status(404).send('Order not found');
    }
    res.json({ status: order.status });
};