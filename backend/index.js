const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // เพิ่ม cors เพื่อแก้ปัญหา CORS
const productRoutes = require('./routes/products');
const { scrapeProducts } = require('./scraper');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // อนุญาตการร้องขอจากทุก origin (เช่น http://localhost:3000)

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/affiliate')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// เส้นทางทดสอบ (ถ้ามี)
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// ใช้ routes สำหรับ /api/products
app.use('/api/products', productRoutes);

// เส้นทางสำหรับการ scrape
app.get('/scrape', async (req, res) => {
  await scrapeProducts();
  res.send('Scraping completed');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));