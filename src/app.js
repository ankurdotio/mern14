const express = require('express');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require("./routes/user.routes")


const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.body)
    console.log("this is a middleware")

    req.body = {}

    next()

})

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)


module.exports = app;