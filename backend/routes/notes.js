const express = require('express');
const router= express.Router();
var fetchuser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { query, validationResult, body } = require('express-validator');


//Route 1
// Get all notes of logged in user
// GET "api/notes/fetchallnotes"
//Login required
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try {
        const notes= await Note.find({user: req.user.id});
        res.json(notes)  ;

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server error occured");
    }
        
})


//Route 2
// Add notes
// POST "api/auth/addnote"
//Login required
router.post('/addnote',fetchuser,[
    body('title','Enter a valid Title').isLength({min:3}),
    body('description','Enter valid Description').isLength({min:3}),
    
], async (req,res)=>{

    try {
        
    
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    //destructuring
    const {title,description,tag} = req.body;
    const note= new Note({
        title,
        description,
        tag,
        user: req.user.id
    })
    // console.log(note);
    const savedNote = await note.save();
    // console.log(savedNote);
    
    res.json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server error occured");
    }
    
})



//Route 3
// Update notes
// PUT "api/auth/updatenote"
//Login required

router.put('/updatenote/:id',fetchuser, async (req,res)=>{

    //destructuring
    const {title,description,tag} = req.body;
    try {
    //create a new note object
    const newNote ={};
    if(title)
    newNote.title=title;
    if(description)
    newNote.description=description;
    if(tag)
    newNote.body=tag;


    //Find note to be updated and update it
    let note= await Note.findById(req.params.id);
    if(!note)
    {
        return res.status(400).send("Not found!!");
    }
    
    //Checking if the user is same who created that node and wants to update it
    if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("Not allowed");
    }

    note= await Note.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true})
    res.json({note});
         
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server error occured");
    }


})

//Route 4
// Delete notes
// DELETE "api/auth/deletenote/:id"
//Login required
router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
    
    try {
    //Find note to be deleted and delete it
    let note= await Note.findById(req.params.id);
    if(!note)
    {
        return res.status(400).send("Not found!!");
    }
    //Checking if the user is same who created that node and wants to delete it
    if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("Not allowed");
    }

    note= await Note.findByIdAndDelete(req.params.id);
    res.send({"Success":"Note has been deleted!!"});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server error occured");
    }

})

module.exports = router