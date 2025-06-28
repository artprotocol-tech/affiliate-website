const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/affiliate')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// เส้นทางทดสอบ
app.get('/', (req, res) => {
  res.send('Backend is running');
});

const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

const { scrapeProducts } = require('./scraper');
app.get('/scrape', async (req, res) => {
  await scrapeProducts();
  res.send('Scraping completed');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));