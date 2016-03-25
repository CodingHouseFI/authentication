'use strict';

var app = angular.module('userAuth');

app.controller('navCtrl', function($scope, UserService) {

  $scope.$watch(function() {
    return UserService.username;
  }, function(username) {
    $scope.username = username;
  });
});

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

app.controller('registerCtrl', function($scope, AuthService) {
  $scope.register = function(user) {
    AuthService.register(user)
      .then(function(res) {
        console.log('res:', res);
      }, function(err) {
        console.error(err);
      });
  };
});

app.controller('loginCtrl', function($scope, AuthService) {
  $scope.login = function(user) {
    AuthService.login(user)
      .then(function() {
        // login was successul
        // $state.go('profile');
      }, function(err) {
        console.log('controller err:', err);
      });
  }
});
