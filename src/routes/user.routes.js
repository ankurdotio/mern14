const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

/* GET /api/user/profile [protected] */
router.get('/profile', async (req, res) => {

    const { token } = req.body || {}

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized, no token provided"
        })
    }

    try {
        const decoded = jwt.verify(token, "3d02e3016491447b9aa9d0966726c331")

        console.log(decoded)

        const user = await userModel.findOne({
            _id: decoded.id
        })

        res.status(200).json({
            message: "User profile fetched successfully",
            user
        })

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

})


module.exports = router;