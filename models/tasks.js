const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    status: String,
    name: String,
    date: String
});

module.exports = mongoose.model('Task', schema);