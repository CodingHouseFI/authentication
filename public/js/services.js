'use strict';

var app = angular.module('userAuth');

app.service('UserService', function($http) {

  this.register = function(user) {
    return $http.post('/users/register', user);
  };

  this.login = function(user) {
    return $http.post('/users/authenticate', user);
  }

});
