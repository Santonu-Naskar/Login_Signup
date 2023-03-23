const express=require('express');
const fetchuser=require('../middleware/fetchuser.js')
const { body, validationResult } = require('express-validator');
const Notes=require('../models/Notes')
const router=express.Router();


//  Router1: fetch all notest: /fetchallnotes| LOGIN REQUIRE
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes=await Notes.find({user: req.user.id});
        res.send(notes);
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }
})

//  Router2: add notest:/addnotes| LOGIN REQUIRE
router.post('/addnotes', fetchuser,[
    body('title', 'Enter atleast 3 charecter').isLength({ min: 3 }),
    body('description', 'Description must be atleast 3 charecter').isLength({ min: 5 })
], async (req, res) => {
    // if there is an error in format of mail name and password andreturn them 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {title,description,tag}=req.body;
        // create and insert user
        const notes = await Notes.create({
            title: title,
            description: description,
            tag: tag,
            user: req.user.id
        })
        res.json(notes);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }
})


//  Router3: update notest: /updatenote| LOGIN REQUIRE
router.put('/updatenote/:id', fetchuser,[
    body('title', 'Enter atleast 3 charecter').isLength({ min: 3 }),
    body('description', 'Description must be atleast 3 charecter').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {title,description,tag}= req.body;
        let newnotes={};
        if(title){newnotes.title=title };
        if(description){newnotes.description=description };
        if(tag){newnotes.tag=tag };
        // is the user is valied or not
        let note=await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("not found")};
        if(note.user.toString()!== req.user.id){return res.status(401).send("not Allowed")}
        //find the note to be updated
        note=await Notes.findByIdAndUpdate(req.params.id,{$set:newnotes},{new:true});
        res.send(note);
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }
})


//  Router4: delete notest: /updatenote| LOGIN REQUIRE
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    
    try {
        // is the user is valied or not
        let note=await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("not found")};
        // allow user check
        if(note.user.toString()!== req.user.id){return res.status(401).send("not Allowed")}
        //find the note to be updated
        note=await Notes.findByIdAndDelete(req.params.id);
        res.json({"sucess":"note deleted"});
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }
})
module.exports=router;