const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ดึงรายการสินค้าทั้งหมด
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// เพิ่มสินค้าใหม่
router.post('/', async (req, res) => {
  // ตรวจสอบข้อมูลที่จำเป็น
  if (!req.body.name || !req.body.price || !req.body.affiliateLink) {
    return res.status(400).json({ message: 'Missing required fields (name, price, affiliateLink)' });
  }

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    affiliateLink: req.body.affiliateLink,
    category: req.body.category,
    source: req.body.source
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;