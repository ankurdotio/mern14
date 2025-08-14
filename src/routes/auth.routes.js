const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const router = express.Router();


/* POST /api/auth/register */
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const isUserAlreadyExists = await userModel.findOne({ email })
    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const user = await userModel.create({
        email, password
    })

    const token = jwt.sign({
        email: user.email,
        id: user._id
    }, "7e435152c166330df2e0e62c8e42881f")

    res.status(201).json({
        message: "User created successfully",
        user,
        token
    })

})



module.exports = router;