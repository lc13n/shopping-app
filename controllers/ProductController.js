// controllers/ProductController.js
const Product = require('../models/Product');

exports.index = async (req, res) => {
    const products = await Product.find().populate('category');
    res.json(products);
};

exports.show = async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
        return res.status(404).send('Product not found');
    }
    res.json(product);
};

exports.search = async (req, res) => {
    const query = req.query.q;
    const products = await Product.find({ name: new RegExp(query, 'i') });
    res.json(products);
};

exports.filterByCategory = async (req, res) => {
    const categoryId = req.query.category;
    const products = await Product.find({ category: categoryId });
    res.json(products);
};

exports.filterByPrice = async (req, res) => {
    const { min, max } = req.query;
    const products = await Product.find({ price: { $gte: min, $lte: max } });
    res.json(products);
};