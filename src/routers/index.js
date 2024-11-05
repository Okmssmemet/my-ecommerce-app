const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const productRoutes = require('./product.routes');
const cartRoutes = require('./cart.routes');
const reviewRoutes = require('./review.routes');
const orderRoutes = require('./order.routes');
const paymentRoutes = require('./payment.routes');

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/reviews', reviewRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);

module.exports = router;
