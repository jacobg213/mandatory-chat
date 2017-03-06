var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');

/* POST a new message. */
router.post('/', function (req, res, next) {
    var instance = new schema.Message(req.body);
    instance.save(function (err, Message) {
        if (err)
            return console.error(err);
        console.log("Save success: ", Message);
    });

    res.send('Message saved');
});

module.exports = router;
