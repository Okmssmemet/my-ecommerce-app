const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/payment.controller');
const { tokenCheck, roleCheck } = require('../middlewares/auth');

// Ödeme işlemleri sadece müşteri veya ilgili ödeme sahibi tarafından erişilebilir
router.post('/', tokenCheck, roleCheck("customer"), PaymentController.createPayment);
router.get('/', tokenCheck, roleCheck("customer"), PaymentController.getPayments);
router.get('/:id', tokenCheck, roleCheck("customer"), PaymentController.getPayment);
router.put('/:id', tokenCheck, roleCheck("customer"), PaymentController.updatePayment);
router.delete('/:id', tokenCheck, roleCheck("customer"), PaymentController.deletePayment);

module.exports = router;
