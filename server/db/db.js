var mongoose = require('mongoose');
var conStr = 'mongodb://localhost/forum';

mongoose.connect(conStr);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to: ' + conStr);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose error! ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected from: ' + conStr);
});