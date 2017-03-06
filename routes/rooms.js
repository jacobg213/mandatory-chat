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

/* GET single room data. */
router.get('/:id', function (req, res, next) {
    schema.Room.find({'_id': req.params.id}, function (err, db_room) {
        if (err) {
            console.error(err);
            res.render(err);
        }
        else {
            schema.Message.find({'room_id': req.params.id}, function (err, db_messages){
                if (err) {
                    var response = {
                        room: db_room,
                        messages: 'No data'
                    };
                    res.json(response);
                }
                else {
                    var data = {
                        room: db_room,
                        messages: db_messages
                    };
                    res.json(data);
                }
            })
        }
    })
});

module.exports = router;