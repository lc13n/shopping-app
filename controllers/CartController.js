const Cart = require('../models/Cart'); 

exports.viewCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');
    res.json(cart);
};

exports.addToCart = async (req, res) => {
    const { productId } = req.body;
    res.send('Product added to cart');
};

exports.updateCart = async (req, res) => {
    const { productId, quantity } = req.body;
    res.send('Cart updated');
};

exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;
    res.send('Product removed from cart');
};

exports.clearCart = async (req, res) => {
    res.send('Cart cleared');
};
