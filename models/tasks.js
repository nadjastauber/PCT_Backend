const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    date: String
});

module.exports = mongoose.model('Task', schema);