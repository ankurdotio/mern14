const mongoose = require('mongoose');


function connectDB(){
    mongoose.connect("mongodb+srv://mern14:sxRezjTG4FJmDQTe@cluster0.jzrvik1.mongodb.net/chacha")
    .then(()=>{
        console.log('MongoDB connected successfully');
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports = connectDB