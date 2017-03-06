var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');

/* GET chat landing page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Chat',
        rooms: schema.Room.find({}, function (err, rooms) {
            if (err) {
                console.log(err);
                res.send(err);
            }
        }),
        messages: schema.Message.find({}, function (err, messages) {
            if (err) {
                console.log(err);
                res.send(err);
            }
        })
    });
});

module.exports = router;
