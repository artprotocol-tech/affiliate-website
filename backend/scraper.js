const axios = require('axios');
const cheerio = require('cheerio');
const Product = require('./models/Product');

const scrapeProducts = async () => {
  try {
    const { data } = await axios.get('https://shopee.co.th'); // ตัวอย่าง URL
    const $ = cheerio.load(data);

    const products = [];
    $('.product-item').each((i, element) => { // ปรับ selector
      const name = $(element).find('.product-name').text() || $(element).find('.name').text();
      const price = parseFloat($(element).find('.product-price').text().replace('฿', '') || 0);
      const image = $(element).find('img').attr('src');
      const affiliateLink = $(element).find('a').attr('href');

      if (name && price && affiliateLink) {
        products.push({ 
          name, 
          price, 
          image, 
          affiliateLink: `https://shopee.co.th${affiliateLink}`, 
          category: 'General', 
          source: 'Shopee' 
        });
      }
    });

    for (const product of products) {
      const newProduct = new Product(product);
      await newProduct.save();
    }

    console.log('Scraped and saved products:', products);
  } catch (err) {
    console.error('Scraping error:', err);
  }
};

module.exports = { scrapeProducts };