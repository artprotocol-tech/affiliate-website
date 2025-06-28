const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: String,
  affiliateLink: {
    type: String,
    required: true
  },
  category: String,
  source: String
});

module.exports = mongoose.model('Product', productSchema);