const APIError = require("../utils/errors")

const errorHandlerMiddleware = (err,req,res,next) => {
    if (err instanceof APIError) {
        return res.status(err.statusCode || 400)
            .json({
                success:false,
                message: err.message
            })
    }
    return res.status(500).json({
            success:false,
            message:"Bir hata oluştu lütfen api'yi kontrol ediniz"
    })
}

module.exports = errorHandlerMiddleware