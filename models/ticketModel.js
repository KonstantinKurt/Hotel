const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const ticketScheme = new Schema({
    hall_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hall',
        required: true,
    },
    user_id:{
        type: String,
        required: true,
        unique: true,
    },
    from: {
        type: Date,
        required: true,
        default: null
    },
    to: {
        type: Date,
        required: true,
        default: null
    },
    title: {
        type: String,
        required: false,
        default: null
    },
}, { versionKey: false });

ticketScheme.plugin(uniqueValidator);



module.exports = mongoose.model('Ticket', ticketScheme);