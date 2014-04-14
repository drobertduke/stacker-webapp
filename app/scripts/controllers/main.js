'use strict';

angular.module('stackerWebappApp')
  .controller('MainCtrl', function ($scope, Restangular, $modal) {
    $scope.tasklistWindowClass = "tasklist-window";
    var SigninInstanceCtrl = function ($scope, $modalInstance) {
      $scope.ok = function () {
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    };

    $scope.openSignin = function () {
      var modalInstance = $modal.open({
        templateUrl: 'mySigninContent.html',
        controller: SigninInstanceCtrl,
        windowClass: 'signin-window'
      });
    };

  });


