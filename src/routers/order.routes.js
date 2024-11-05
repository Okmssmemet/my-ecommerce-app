const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order.controller');
const { tokenCheck, roleCheck } = require('../middlewares/auth');

// Sipariş oluşturma - sadece müşteriler
router.post('/', tokenCheck, roleCheck("customer"), OrderController.createOrder);

// Satıcı için kendi ürünlerine ait siparişleri görüntüleme
router.get('/seller', tokenCheck, roleCheck("seller"), OrderController.getSellerOrders);

// Kullanıcının tüm siparişleri - müşteri ve satıcı sadece kendi siparişlerini görebilir
router.get('/user', tokenCheck, roleCheck(["customer", "seller"]), OrderController.getUserOrders);

// Belirli bir siparişin görüntülenmesi (müşteri veya satıcıya ait olmalı)
router.get('/:orderId', tokenCheck, OrderController.getOrderById);

// Sipariş durumu güncelleme (sadece satıcı)
router.put('/:orderId/status', tokenCheck, roleCheck("seller"), OrderController.updateOrderStatus);

module.exports = router;
