const router = require("express").Router();
const {
  login,
  register,
  me,
  updateCustomerProfile,
  updateSellerProfile,
} = require("../controllers/auth.controller");
const authValidation = require("../middlewares/validations/auth.validation");
const { tokenCheck, roleCheck } = require("../middlewares/auth");

// Tüm kullanıcılar için
router.post("/login", authValidation.login, login);

// Sadece müşteri veya satıcı kaydı için
router.post("/register/customer", authValidation.register, register);
router.post("/register/seller", authValidation.register, register);

// Profil güncellemeleri sadece ilgili rol için
router.put("/profile/customer", tokenCheck, roleCheck("customer"), updateCustomerProfile);
router.put("/profile/seller", tokenCheck, roleCheck("seller"), updateSellerProfile);

// Kendi profilini görmek isteyen herkes
router.get("/me", tokenCheck, me);

module.exports = router;
