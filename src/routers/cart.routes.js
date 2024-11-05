const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart.controller');
const { tokenCheck, roleCheck } = require('../middlewares/auth');

// Sadece müşteri için sepet işlemleri
router.post('/', tokenCheck, roleCheck("customer"), CartController.createCart);
router.post('/product', tokenCheck, roleCheck("customer"), CartController.addProductToCart);
router.get('/', tokenCheck, roleCheck("customer"), CartController.getCart);

module.exports = router;
    