// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.get('/', ProductController.index);
router.get('/:id', ProductController.show);
router.get('/search', ProductController.search);
router.get('/filter/category', ProductController.filterByCategory);
router.get('/filter/price', ProductController.filterByPrice);

module.exports = router;