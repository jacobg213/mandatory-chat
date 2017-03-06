var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
    schema.User.find({}, function (err, users) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.send(users);
    });
});

module.exports = router;
