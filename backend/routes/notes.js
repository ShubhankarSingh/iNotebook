const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require("../models/Note");
var fetchuser = require('../middleware/fetchuser');

// ROUTE 1: Get all the Notes using: GET "/api/auth/getuser". Login required
router.get('/fetchallnotes', fetchuser ,async (req, res)=>{

    try{
        const notes = await Note.find({user: req.user.id});
        res.json(notes)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 2: Add a new note using POST "/api/auth/addnote". Login required
router.post('/createnote', fetchuser , [
    body('title', 'Enter a valid title').isLength({ min:3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min:5 }),
] , async (req, res)=>{

    try{
        const {title, description, tag} = req.body;
        // It returns bad request and errors if user enters invalid data.
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(400).json({ errors: result.array() })
        }
    
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
    
        res.json(savedNote)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 3: Update an exisiting note using POST "/api/auth/updateNote/:id". Login required
router.put('/updatenote/:id', fetchuser , async (req, res)=>{

    try{
        const {title, description, tag} = req.body;

        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        
        let note = await Note.findById(req.params.id);
        if(!note){res.status(404).send("Not Found")}

        if(note.user.toString() != req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true});
        res.json({note});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


// ROUTE 4: Delete a note using DELETE "/api/auth/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser , async (req, res)=>{

    try{
        let note = await Note.findById(req.params.id);
        if(!note){res.status(404).send("Not Found")}

        if(note.user.toString() != req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json("Successfully Deleted Note");
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})
module.exports = router