const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let NoteSchema = new Schema({
    title:{
        type: String,
        require: [true, "'Title' is required"]
    },

    description: {
        type: String,
        require: true,
        default: 'Without description'
    }
}, {
    timestamps:true
});

module.exports = mongoose.model("Note", NoteSchema);