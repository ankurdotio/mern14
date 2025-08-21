const userModel = require("../models/user.model")


async function profile(req, res) {

    const user = await userModel.findOne({
        _id: req.user.id
    })

    res.status(200).json({
        message: "Profile fetched successfully",
        user
    })

}


module.exports = { profile }