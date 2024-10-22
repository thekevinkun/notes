const express = require("express");

const { getNotes, getNote, createNote, deleteNote, updateNote, searchNote } = require("../controllers/noteController");
const requireAuth = require("../middlewares/requireAuth");


const router = express.Router();

// Require auth for all note routes
router.use(requireAuth);

// GET all notes
router.get("/", getNotes);

// SEARCH a note
router.get("/search", searchNote);

// GET single notes
router.get("/:id", getNote);

// POST new notes
router.post("/", createNote);

// DELETE a note
router.delete("/:id", deleteNote);

// UPDATE a note
router.patch("/:id", updateNote);


module.exports = router;