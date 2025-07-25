const express = require('express');
const noteModel = require("./models/note.model")

const app = express();
app.use(express.json());

app.post('/notes', async (req, res) => {
    const { title, content } = req.body

    await noteModel.create({ title, content })

    res.status(201).json({
        message: "Note created successfully"
    })
})

app.get('/notes',async (req,res)=>{
   const notes = await noteModel.find()
   res.status(200).json({
    message: "Notes fetched successfully",
    notes
   })
})



module.exports = app;