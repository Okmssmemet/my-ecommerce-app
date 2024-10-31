const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const { tokenCheck, roleCheck } = require('../middlewares/auth');

// Tüm ürünleri getiren route
router.get('/product', ProductController.getAllProducts);
router.get("/product/:categoryId",ProductController.getAllProductByCategory);

router.post('/products', tokenCheck,roleCheck("seller"),ProductController.addProduct);

router.delete('/products/:productId', tokenCheck,roleCheck("seller"), ProductController.deleteProduct);

router.put('/products/:productId', tokenCheck,roleCheck("seller"), ProductController.updateProduct);

router.get('/products/seller', tokenCheck,roleCheck("seller"), ProductController.getProductsBySeller);

module.exports = router;
