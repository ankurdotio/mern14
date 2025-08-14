const mongoose = require('mongoose');


function connectDB() {

    mongoose.connect("mongodb://localhost:27017/mern14-auth")
        .then(() => {
            console.log("MongoDB connected successfully");
        })
        .catch((err) => {
            console.error("MongoDB connection failed", err);
        });

}

module.exports = connectDB;
