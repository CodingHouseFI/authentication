'use strict';

var app = angular.module('userAuth', []);

app.run(function(AuthService) {
  // attempt to make an authenticated request
  // to receive the user info
  // this can set the UserService
  AuthService.init();
});
