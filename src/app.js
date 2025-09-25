const express = require("express")
const cookieParser = require("cookie-parser")

const authRoutes = require("./routes/auth.routes")
const productRoutes = require("./routes/product.routes")


const app = express()




app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)



module.exports = app
