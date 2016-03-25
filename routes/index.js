var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




////////////////////
// PROTECTED ZONE
router.use(User.authMiddleware);

router.get('/protected', function(req, res) {
  console.log('req.user:', req.user);
  res.send('wooo! protected!!');
});

module.exports = router;

