var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    username: String,
    userId: String,
    timestamp: Number,
    threadId: String,
    content: String
});

module.exports = mongoose.model('Post', PostSchema);