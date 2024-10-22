const Note = require("../models/noteModel");
const mongoose = require("mongoose");

// get all Notes
const getNotes = async (req, res) => {
    const user_id = req.user._id;
    
    const notes = await Note.find({user_id}).sort({isPinned: -1, createdAt: -1});

    res.status(200).json(notes);
}

// search for a note
const searchNote = async (req, res) => {
    const user_id = req.user._id;
    const { query } = req.query;

    try {
        const searchNote = await Note.find({ 
            user_id,
            $or: [
                { title: { $regex: new RegExp(query), $options: "i" } },
                { description: { $regex: new RegExp(query), $options: "i" } },
                { tags: { $regex: new RegExp(query), $options: "i" } }
            ] 
        })

        res.status(200).json(searchNote);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

// get single note
const getNote = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Can't find a Note"});
    }

    const note = await Note.findById(id);

    if (!note)
        return res.status(404).json({error: "Can't find a Note"});

    res.status(200).json(note);
}

// create new note
const createNote = async (req, res) => {
    const {title, date, time, description, tags} = req.body;

    if (!title)
        return res.status(404).json({error: "Please write your title", emptyField: "title"});
    
    if (!description)
        return res.status(404).json({error: "Please write your description", emptyField: "description"});

    try {
        const user_id = req.user._id;
        const note = await Note.create({title, date, time, description, tags, user_id});

        res.status(200).json(note);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

// delete a note
const deleteNote = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Can't find a Note"});
    }

    const note = await Note.findOneAndDelete({ _id: id });

    if (!note)
        return res.status(404).json({error: "Failed to delete a Note"});

    res.status(200).json(note);
}

// update a note
const updateNote = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Can't find a Note"});
    }

    const {title, description, isPinned } = req.body

    if (isPinned !== null) {
        const note = await Note.findOneAndUpdate({ _id: id }, {
            ...req.body
        })

        if (!note)
            return res.status(404).json({error: "Failed to pin Note"});

        return res.status(200).json(note);
    }
    
    if (!title)
        return res.status(404).json({error: "Please write your title", emptyField: "title"});
    
    if (!description)
        return res.status(404).json({error: "Please write your description", emptyField: "description"});

    const note = await Note.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!note)
        return res.status(404).json({error: "Failed to update a Note"});

    res.status(200).json(note);
}



module.exports = {
    getNotes,
    searchNote,
    getNote,
    createNote,
    deleteNote,
    updateNote
};