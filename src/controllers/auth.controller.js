const user = require("../models/user.model")
const Customer = require("../models/customer.model");
const Seller = require("../models/seller.model");
const bcrypt = require("bcrypt")
const APIError = require("../utils/errors")
const Response = require("../utils/response")
const { createToken } = require("../middlewares/auth")

const login = async (req,res) => {
    console.log("Şuanda logine girdim");
    
    const {email,password} = req.body
    const userInfo = await user.findOne({ where: { email } });
    console.log(userInfo)
    if (!userInfo) {
        throw new APIError("Email Veya Şifre Hatalıdır",401)
    }

    const comparePassword = await bcrypt.compare(password,userInfo.password)

    if (!comparePassword) throw new APIError("Email Veya Şifre Hatalıdır",401)

    createToken(userInfo,res)
}

const register = async (req, res) => {
    const { email } = req.body;
    const userCheck = await user.findOne({ where: { email } });
    if (userCheck) {
        throw new APIError("Girmiş olduğunuz mail adresi kullanılmaktadır !", 401);
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);

    if (req.path.includes("customer")) {
        req.body.role = "customer";
    } else if (req.path.includes("seller")) {
        req.body.role = "seller";
    }

    const userSave = new user(req.body);
    await userSave.save()
        .then(async (data) => {
            // Rol kontrolü ve profil oluşturma
            if (req.body.role === "customer") {
                await Customer.create({ userId: data.id, address: "", phone: "" });
            } else if (req.body.role === "seller") {
                await Seller.create({ userId: data.id, companyName: "", companyAddress: "", taxNumber: "" });
            }

            return new Response(data, "Kayıt Başarıyla Eklendi").created(res);
        })
        .catch((err) => {
            throw new APIError("Kullanıcı Kayıt Edilemedi", 400);
        });

    console.log(req.body);
};

const me = async (req,res) => {
    console.log("Me içerisinde");
    return new Response(req.user).success(res)
}

const updateCustomerProfile = async (req, res) => {
    const { address, phone } = req.body;
    await Customer.update({ address, phone }, { where: { userId: req.user.id } });
    return new Response(null, "Profil Güncellendi").success(res);
};

const updateSellerProfile = async (req, res) => {
    const { companyName, companyAddress, taxNumber } = req.body;
    await Seller.update({ companyName, companyAddress, taxNumber }, { where: { userId: req.user.id } });
    return new Response(null, "Profil Güncellendi").success(res);
};

module.exports = {
    login,register,me,updateCustomerProfile,updateSellerProfile
}