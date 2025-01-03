require("express-async-errors")
const express = require("express")
const app = express();
require("dotenv").config()
require("./src/db")
const port = process.env.PORT || 5001
const router = require("./src/routers")
const errorHandlerMiddleware = require("./src/middlewares/errorHandler")


//Middlewares
app.use(express.json())
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb",extended:true,parameterLimit:50000}))

app.use("/api",router)


app.get("/",(req,res) =>{
    res.json({
        message : "Hoşgeldiniz"
    })
})

app.get("healtcheck",(req,res)=>{
    res.status(200).send('ok')
})

//Hata Yakalama
app.use(errorHandlerMiddleware)

app.listen(port,()=>{
    console.log(`Server ${port} portundan çalışıyor`)
})