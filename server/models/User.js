const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  status: String
})

module.exports = mongoose.model('User', UserSchema)
