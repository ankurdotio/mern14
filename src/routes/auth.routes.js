const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post("/register", async (req, res) => {

    const { email, password } = req.body;
    const isUserAlreadyExists = await userModel.findOne({ email })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User already exists"
        })
    }

    const user = await userModel.create({ email, password })

    const token = jwt.sign({ id: user._id }, "3d02e3016491447b9aa9d0966726c331")

    res.status(201).json({
        message: "user registered successfully",
        user,
        token
    })

})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
        res.status(404).json({
            message: "User not found"
        })
    }
    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({ id: user._id }, "3d02e3016491447b9aa9d0966726c331")

    res.status(200).json({
        message: "Login successful",
        user,
        token
    })
})


module.exports = router;