// auth.js
const jwt = require("jsonwebtoken");
const APIError = require("../utils/errors");
const user = require("../models/user.model");

const createToken = async (user, res) => {
    const payload = {
        sub: user.id,
        name: user.name,
        role: user.role
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: "HS512",
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    return res.status(201).json({
        success: true,
        token,
        message: "Başarılı"
    });
}

const tokenCheck = async (req, res, next) => {
    try {
        const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ");
        if (!headerToken) {
            throw new APIError("Geçersiz Oturum Lütfen Oturum Açınız", 401);
        }

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const userInfo = await user.findByPk(decoded.sub, {
            attributes: ["id", "name", "lastname", "email", "role"] // Role de dahil edildi
        });

        if (!userInfo) {
            throw new APIError("Geçersiz Token", 401);
        }

        req.user = userInfo; // role bilgisi ile birlikte
        next();
    } catch (error) {
        next(new APIError(error.message || "Geçersiz Token", 401));
    }
};

const roleCheck = (requiredRoles) => (req, res, next) => {
    if (!requiredRoles.includes(req.user.role)) {
        return res.status(403).json({
            success: false,
            message: "Bu işlem için yetkiniz yok"
        });
    }
    next();
};


module.exports = {
    createToken, tokenCheck, roleCheck
};
