const jwt = require("jsonwebtoken")
const APIError = require("../utils/errors")
const user = require("../models/user.model")

const createToken = async (user,res) => {
    const payload = {
        sub:user.id,
        name:user.name
    }

    const token = await jwt.sign(payload,process.env.JWT_SECRET_KEY,{
        algorithm:"HS512",
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    return res.status(201).json({
        success:true,
        token,
        message:"Başarılı"
    })

}

const tokenCheck = async (req, res, next) => {
    try {
        // Authorization header'dan token'ı kontrol et
        const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ");
        if (!headerToken) {
            throw new APIError("Geçersiz Oturum Lütfen Oturum Açınız", 401);
        }

        // "Bearer" kelimesini çıkararak yalnızca token'ı al
        const token = req.headers.authorization.split(" ")[1];

        // Token'ı doğrula
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // jwt.verify artık senkron çalışacak

        // Kullanıcıyı ID'siyle veritabanında bul
        const userInfo = await user.findByPk(decoded.sub, {
            attributes: ["id", "name", "lastname", "email"]
        });

        // Kullanıcı bulunamazsa hata fırlat
        if (!userInfo) {
            throw new APIError("Geçersiz Token", 401);
        }

        // Kullanıcı bilgilerini isteğe ekle
        req.user = userInfo;
        next(); // Bir sonraki middleware'e geç

    } catch (error) {
        // Hata durumunda APIError sınıfını kullanarak hata döndür
        next(new APIError(error.message || "Geçersiz Token", 401));
    }
};

module.exports = {
    createToken,tokenCheck
}