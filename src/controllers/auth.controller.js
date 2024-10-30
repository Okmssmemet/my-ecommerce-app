const user = require("../models/user.model")
const bcrypt = require("bcrypt")
const APIError = require("../utils/errors")
const Response = require("../utils/response")
const { createToken } = require("../middlewares/auth")

const login = async (req,res) => {
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

const register = async (req,res) => {
    const {email} = req.body
    const userCheck = await user.findOne({ where: { email } });
    if (userCheck) {
        throw new APIError("Girmiş olduğunuz mail adresi kullanılmaktadır !",401)
    }
    req.body.password = await bcrypt.hash(req.body.password,10)
    console.log("Hash Şifre:",req.body.password)

    const userSave = new user(req.body)
    await userSave.save()
        .then((data)=>{
            return new Response(data,"Kayıt Başarıyla Eklendi").created(res)
        })
        .catch((err)=>{
            throw new APIError("Kullanıcı Kayıt Edilemedi",400)
        })

    console.log(req.body)
}

const me = async (req,res) => {
    console.log("Me içerisinde");
    return new Response(req.user).success(res)
}

module.exports = {
    login,register,me
}