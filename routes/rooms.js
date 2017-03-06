var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');

/* POST a new room. */
router.post('/', function (req, res, next) {
    var instance = new schema.Room(req.body);
    instance.save(function (err, Room) {
        if (err)
            return console.error(err);
        console.log("Save success: ", Room);
    });

    res.send('Room saved');
});

module.exports = router;
