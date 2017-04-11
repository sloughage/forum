const mongoose = require('mongoose')
const conStr = 'mongodb://localhost/forum'

mongoose.Promise = global.Promise
mongoose.connect(conStr)

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to: ' + conStr)
})
mongoose.connection.on('error', err => {
  console.log('Mongoose error: ' + err)
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from: ' + conStr)
})
