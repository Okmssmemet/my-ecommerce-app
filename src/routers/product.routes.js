const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const { tokenCheck, roleCheck } = require('../middlewares/auth');

// Ürün listeleme (herkes görebilir)
router.get('/', ProductController.getAllProducts);
router.get('/:categoryId', ProductController.getAllProductByCategory);

// Sadece satıcılar için ürün yönetimi
router.post('/', tokenCheck, roleCheck("seller"), ProductController.addProduct);
router.put('/:productId', tokenCheck, roleCheck("seller"), ProductController.updateProduct);
router.delete('/:productId', tokenCheck, roleCheck("seller"), ProductController.deleteProduct);

// Satıcının kendi ürünlerini listeleme
router.get('/seller', tokenCheck, roleCheck("seller"), ProductController.getProductsBySeller);

module.exports = router;
