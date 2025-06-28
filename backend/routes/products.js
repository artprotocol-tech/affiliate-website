const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, price, image, affiliateLink, category, source } = req.body;
  if (!name || !price || !affiliateLink) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // ตรวจสอบซ้ำตาม name และ price
  const existingProduct = await Product.findOne({ name, price });
  if (existingProduct) {
    return res.status(400).json({ message: 'Product already exists' });
  }

  const product = new Product({ name, price, image, affiliateLink, category, source });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;