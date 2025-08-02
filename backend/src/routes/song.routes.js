const express = require('express');
const songModel = require("../models/song.model")
const router = express.Router();
const multer = require('multer');
const uploadFile = require("../services/storage.service")

const upload = multer({ storage: multer.memoryStorage() })


router.post('/songs', upload.single('audio'), async (req, res) => {

    const buffer = req.file.buffer;
    const base64File = Buffer.from(buffer).toString("base64")
    const result = await uploadFile(base64File, 'hello')

    console.log(result);

})


module.exports = router;