// controllers/CartController.js
const Cart = require('../models/Cart'); // Giả sử bạn có model Cart

exports.viewCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');
    res.json(cart);
};

exports.addToCart = async (req, res) => {
    const { productId } = req.body;
    // Logic để thêm sản phẩm vào giỏ hàng
    res.send('Product added to cart');
};

exports.updateCart = async (req, res) => {
    const { productId, quantity } = req.body;
    // Logic để cập nhật số lượng sản phẩm trong giỏ hàng
    res.send('Cart updated');
};

exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;
    // Logic để xóa sản phẩm khỏi giỏ hàng
    res.send('Product removed from cart');
};

exports.clearCart = async (req, res) => {
    // Logic để xóa toàn bộ giỏ hàng
    res.send('Cart cleared');
};