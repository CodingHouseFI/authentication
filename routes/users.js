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
    if(err) {
      res.status(400).send(err);
    } else {
      res.cookie('cadecookie', user._id).send(user);
    }
  });
});

router.post('/register', function(req, res) {
  User.register(req.body, function(err) {
    res.status(err ? 400 : 200).send(err);
  });
});

module.exports = router;
