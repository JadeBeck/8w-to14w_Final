const mongoose = require('mongoose');

const chatsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
    },
    msg: {
        type: String,
        required: true,
        unique: false
    },
    time: {
        type: String,
        required: true,
        unique: false
    },
});

module.exports = mongoose.model("Chats", chatsSchema);