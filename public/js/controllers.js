'use strict';

var app = angular.module('userAuth');

app.controller('testCtrl', function($scope, $http) {
  $scope.test = function() {
    $http.get('/protected')
      .then(function(res) {
        console.log('res:', res)
      }, function(err) {
        console.error(err);
      })
  }
});

app.controller('registerCtrl', function($scope, UserService) {
  $scope.register = function(user) {
    UserService.register(user)
      .then(function(res) {
        console.log('res:', res);
      }, function(err) {
        console.error(err);
      });
  };
});

app.controller('loginCtrl', function($scope, UserService) {
  $scope.login = function(user) {
    UserService.login(user)
      .then(function(res) {
        console.log('res:', res);
      }, function(err) {
        console.error(err);
      });
  }
});
