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
   const notes = await noteModel.find({   })
   res.status(200).json({
    message: "Notes fetched successfully",
    notes
   })
})

app.delete("/notes/:id",async (req,res)=>{
    const id = req.params.id
    await noteModel.findOneAndDelete({
        _id: id
    })
    res.status(200).json({
        message: "Note deleted successfully"
    })
})

app.patch('/notes/:id',async(req,res)=>{

    const id = req.params.id
    const {title} = req.body
    await noteModel.findOneAndUpdate({ _id:id },{title})
    
    res.status(200).json({
        message: "Note updated successfully"
    })
})





module.exports = app;