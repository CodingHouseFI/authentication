'use strict';

var app = angular.module('userAuth');

app.service('AuthService', function($http, UserService) {
  this.register = function(user) {
    return $http.post('/users/register', user);
  };

  this.login = function(user) {
    // we're logging in
    return $http.post('/users/authenticate', user)
      .then(function(res) {
        // response will contain the user object
        // give the user object to the UserService
        UserService.set(res.data);
      });
  };

  this.init = function() {
    $http.get('/users/profile')
    .then(function(res) {
      UserService.set(res.data);
    });
  };
});


app.service('UserService', function() {
  this.set = function(user) {
    this.username = user.username;
    this._id = user._id;
  };
  this.destroy = function() {
    this.username = null;
    this._id = null;
  };
});
