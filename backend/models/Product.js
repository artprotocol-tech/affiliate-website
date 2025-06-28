const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  affiliateLink: { type: String, required: true },
  category: { type: String },
  source: { type: String }
});

module.exports = mongoose.model('Product', productSchema);