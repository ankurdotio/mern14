const express = require('express');
const songRoutes = require("./routes/song.routes")
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

app.use("/", songRoutes)



module.exports = app;