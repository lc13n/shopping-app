// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/checkout', authenticate, OrderController.checkout);
router.get('/:orderId', authenticate, OrderController.viewOrder);
router.delete('/cancel', authenticate, OrderController.cancelOrder);

module.exports = router;