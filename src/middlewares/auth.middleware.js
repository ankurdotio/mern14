const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

async function authSeller(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id)

        if (user.role !== "seller") {
            return res.status(403).json({
                message: "Forbidden, you do not have the required role"
            })
        }

        req.seller = user

        next()
    } catch (err) {

        console.log(err)
        res.status(401).json({
            message: "Unauthorized"
        })

    }


}


module.exports = {
    authSeller
}