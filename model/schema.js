var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};

exports.roomSchema = new Schema({
    author: String,
    name: String,
    description: String
});

exports.messageSchema = new Schema({
    body:  String,
    author: String,
    room_id: String,
    date: { type: Date, default: Date.now }
});

exports.userSchema = new Schema({
    name: String
});
exports.User = mongoose.model('User',exports.userSchema);
exports.Message = mongoose.model('Message',exports.messageSchema);
exports.Room = mongoose.model('Room',exports.roomSchema);
