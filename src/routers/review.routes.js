const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/review.controller');
const { tokenCheck, roleCheck } = require('../middlewares/auth');

// Yorum ekleme - yalnızca müşteri
router.post('/', tokenCheck, roleCheck("customer"), ReviewController.createReview);

// Yorumları listeleme - satıcı ve müşteri
router.get('/', tokenCheck, roleCheck(["customer", "seller"]), ReviewController.getReviews);
router.get('/:id', tokenCheck, roleCheck(["customer", "seller"]), ReviewController.getReview);

// Yorum güncelleme ve silme işlemleri - yalnızca müşteri
router.put('/:id', tokenCheck, roleCheck("customer"), ReviewController.updateReview);
router.delete('/:id', tokenCheck, roleCheck("customer"), ReviewController.deleteReview);

module.exports = router;
