'use strict';

angular.module('stackerWebappApp')
  .controller('MainCtrl', function ($scope, Restangular) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    Restangular.setBaseUrl('http://localhost:8081');
    Restangular.all('users').getList().then(function(users){
      $scope.users = users;
    });
    Restangular.all('tasks').getList().then(function(tasks){
      $scope.tasks = tasks;
    });
  });
