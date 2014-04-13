'use strict';

angular.module('stackerWebappApp')
  .controller('MainCtrl', function ($scope, Restangular, $modal) {
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
    var SigninInstanceCtrl = function ($scope, $modalInstance) {
      $scope.ok = function () {
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    };

      $scope.open = function () {
        var modalInstance = $modal.open({
          templateUrl: 'mySigninContent.html',
          controller: SigninInstanceCtrl
        });
      };

  });


