var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};

exports.roomSchema = new Schema({
    id: Number,
    author: String,
    name: String
});

exports.messageSchema = new Schema({
    id: Number,
    body:  String,
    author: String,
    room_id: Number,
    date: { type: Date, default: Date.now }
});

exports.userSchema = new Schema({
    id:  Number,
    name: String
});
exports.User = mongoose.model('User',exports.userSchema);
exports.Message = mongoose.model('Message',exports.messageSchema);
exports.Room = mongoose.model('Room',exports.roomSchema);
