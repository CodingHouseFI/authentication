'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');

const JWT_SECRET = 'this is my secret. TELL NOBODY. this can be as long as you would like';

var User;

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

userSchema.statics.authenticate = function(userObj, cb) {
  User.findOne({username: userObj.username}, function(err, dbUser) {
    if(err || !dbUser) {
      return cb("Authentication failed.");
    }
    bcrypt.compare(userObj.password, dbUser.password, function(err, isGood) {
      if(err || !isGood) {
        return cb("Authentication failed.");
      }

      // username and password are good and valid
      // dbUser is the user loggin in

      var payload = {
        userId: dbUser._id,
        iat: Date.now()  // issued at time
      };

      // generate a token
      var token = jwt.encode(payload, JWT_SECRET);

      cb(null, token);
    });
  });
};

userSchema.statics.register = function(userObj, cb) {
  bcrypt.hash(userObj.password, 10, function(err, hash) {
    if(err) {
      return cb(err);
    }
    User.create({
      username: userObj.username,
      password: hash
    }, function(err) {
      cb(err);
    });
  });
};

User = mongoose.model('User', userSchema);

module.exports = User;
