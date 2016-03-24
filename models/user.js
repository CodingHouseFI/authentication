'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var User;

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

userSchema.statics.authenticate = function(userObj, cb) {
  // check if username exists
  User.findOne({username: userObj.username}, function(err, dbUser) {
    if(err || !dbUser) {
      return cb("Authentication failed.");
    }
    // dbUser.password  === the hash
    // userObj.password === the password attempt

    // compare the password with the hash
    bcrypt.compare(userObj.password, dbUser.password, function(err, isGood) {
      if(err || !isGood) {
        return cb("Authentication failed.");
      }
      // (for now) call back with the user document
      cb(null, dbUser);
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
