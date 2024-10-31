const router = require("express").Router();
const {login,register,me,updateCustomerProfile,updateSellerProfile } = require("../controllers/auth.controller")
const authValidation = require("../middlewares/validations/auth.validation")
const { tokenCheck,roleCheck } = require("../middlewares/auth")


router.post("/login",authValidation.login,login)

router.post("/register/customer",authValidation.register,register)
router.post("/register/seller",authValidation.register,register)

// Customer profili güncelleme
router.put("/profile/customer", tokenCheck, roleCheck("customer"), updateCustomerProfile);

// Seller profili güncelleme
router.put("/profile/seller", tokenCheck, roleCheck("seller"), updateSellerProfile);

router.get("/me",tokenCheck,me)

module.exports = router