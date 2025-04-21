const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/', authenticate, CartController.viewCart);
router.post('/add', authenticate, CartController.addToCart);
router.put('/update', authenticate, CartController.updateCart);
router.delete('/remove', authenticate, CartController.removeFromCart);
router.delete('/clear', authenticate, CartController.clearCart);

module.exports = router;