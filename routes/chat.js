var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('chat', { url: req.url });
});


module.exports = router;
