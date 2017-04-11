const mongoose = require('mongoose')

const ThreadSchema = new mongoose.Schema({
  title: String,
  size: Number,
  timestamp: Number
})

module.exports = mongoose.model('Thread', ThreadSchema)
