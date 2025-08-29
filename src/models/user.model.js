const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    fullName: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
        }
    },
    password: String,
    role: {
        type: String,
        enum: [ "user", "seller" ],
        default: "user"
    }
})

const userModel = mongoose.model("user", userSchema)


module.exports = userModel