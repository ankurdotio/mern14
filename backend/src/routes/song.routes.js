const express = require('express');
const songModel = require("../models/song.model")
const router = express.Router();
const multer = require('multer');
const uploadFile = require("../services/storage.service")
const id3 = require('node-id3');

const upload = multer({ storage: multer.memoryStorage() })


router.post('/songs', upload.single('audio'), async (req, res) => {
    try {
        const buffer = req.file.buffer;
        const base64File = Buffer.from(buffer).toString("base64")

        const response = id3.read(buffer)
        const result = await uploadFile(base64File, 'hello')
        const coverImageResult = await uploadFile(Buffer.from(response.image.imageBuffer).toString("base64"), 'coverImage')

        const song = await songModel.create({
            title: response.title,
            artist: response.artist,
            album: response.album,
            releaseDate: response.year,
            audioUrl: result.url,
            coverImage: coverImageResult.url
        })

        res.status(201).json({
            message: "Song uploaded successfully",
            song
        })

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error uploading file" });
    }

})


module.exports = router;