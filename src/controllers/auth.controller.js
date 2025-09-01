const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


async function registerUser(req, res) {

    const { username, email, fullName: { firstName, lastName }, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [ { username }, { email } ]
    })

    if (isUserAlreadyExists) {
        return res.status(422).json({
            message: isUserAlreadyExists.username == username ? "username already exists" : "email already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        fullName: {
            firstName,
            lastName
        },
        password: hash,
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "user registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName
        }
    })

}

async function loginUser(req, res) {

    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [ { username }, { email } ]
    })

    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)


    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "user logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName
        }
    })


}

async function registerSeller(req, res) {

    const { username, email, fullName: { firstName, lastName }, password } = req.body


    const isSellerAlreadyExists = await userModel.findOne({
        $or: [ { username }, { email } ]
    })

    if (isSellerAlreadyExists) {
        return res.status(422).json({
            message: isSellerAlreadyExists.username == username ? "username already exists" : "email already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const seller = await userModel.create({
        username,
        email,
        fullName: {
            firstName,
            lastName
        },
        password: hash,
        role: "seller"
    })

    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "seller registered successfully",
        seller: {
            id: seller._id,
            username: seller.username,
            email: seller.email,
            fullName: seller.fullName
        }
    })

}

async function loginSeller(req, res) {

    const { username, email, password } = req.body

    const seller = await userModel.findOne({
        $or: [ { username }, { email } ]
    })

    if (!seller) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, seller.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET)


    res.cookie("token", token)

    res.status(200).json({
        message: "seller logged in successfully",
        seller: {
            id: seller._id,
            username: seller.username,
            email: seller.email,
            fullName: seller.fullName
        }
    })

}


module.exports = {
    registerUser,
    loginUser,
    registerSeller,
    loginSeller
}