const mongoose = require('mongoose');

//Datenmodell eines Task
const schema = new mongoose.Schema({
    status: String,
    name: String,
    date: String
});

module.exports = mongoose.model('Task', schema);