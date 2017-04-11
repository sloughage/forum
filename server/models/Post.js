const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  username: String,
  userId: String,
  timestamp: Number,
  threadId: String,
  content: String
})

module.exports = mongoose.model('Post', PostSchema)
