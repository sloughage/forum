var mongoose = require('mongoose');

var ThreadSchema = new mongoose.Schema({
    title: String,
    size: Number,
    timestamp: Number
});

module.exports = mongoose.model('Thread', ThreadSchema);