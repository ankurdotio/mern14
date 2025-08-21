const express = require("express");
const userController = require("../controllers/user.controller")
const jwt = require("jsonwebtoken");


const router = express.Router();


router.get('/profile',

    (req, res, next) => {

        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized, no token provided"
            })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded
            next()
        } catch (err) {
            return res.status(401).json({
                message: "Unauthorized, invalid token"
            })
        }

    }

    , userController.profile)


module.exports = router