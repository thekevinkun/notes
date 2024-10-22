const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: null
    },
    time: {
        type: String,
        default: null
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        default: []
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: [Schema.Types.ObjectId],
        required: true
    }
}, {timestamps: true})


module.exports = mongoose.model("Note", noteSchema);