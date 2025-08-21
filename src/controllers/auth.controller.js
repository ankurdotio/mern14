const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function register(req, res) {

    const { email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        email: email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)


    res.cookie("token", token)

    res.status(201).json({
        message: "user registered successfully",
        user
    })

}

async function login(req, res) {

    const { email, password } = req.body

    const user = await userModel.findOne({
        email
    })

    if (!user) {
        return res.status(401).json({
            message: "email invalid"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "password invalid"
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "user logged in successfully",
        user
    })

}


module.exports = {
    register, login
}