var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    res.status(err ? 400 : 200).send(err || users);
  });
});

router.post('/authenticate', function(req, res) {
  User.authenticate(req.body, function(err, user) {
    res.status(err ? 400 : 200).send(err || user);
  });
});

router.post('/register', function(req, res) {
  User.register(req.body, function(err) {
    res.status(err ? 400 : 200).send(err);
  });
});

module.exports = router;
