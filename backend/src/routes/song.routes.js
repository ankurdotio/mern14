const express = require('express');
const multer = require('multer');
const id3 = require("node-id3")
const uploadFile = require("../services/storage.service")
const songModel = require("../models/song.model");


const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/songs', upload.single("audio"), async (req, res) => {
    const file = req.file;

    const tags = id3.read(file.buffer)

    const audio = await uploadFile(file.buffer, "audio")
    const coverImage = await uploadFile(tags.image.imageBuffer, "coverImage")

    const song = await songModel.create({
        title: tags.title,
        artist: tags.artist,
        album: tags.album,
        releaseDate: tags.year,
        audioUrl: audio.url,
        coverImage: coverImage.url
    })

    res.status(201).json({
        message: "Song created successfully",
        song
    });
})


router.get('/songs', async (req, res) => {

    const songs = await songModel.find();

    res.status(200).json({
        message: "Songs fetched successfully",
        songs
    });

})

module.exports = router;