'use strict';
function TaskListCtrl($scope, Restangular) {
  $scope.oneAtATime = true;

  $scope.add = function () {
    $scope.tasks.unshift(
      {
        Title: "New Task",
        Description: ""
      }
    );
    $scope.tasks[0].isOpen = true;
  };

  Restangular.setBaseUrl('http://localhost:8081');
  Restangular.all('tasks').getList().then(function(tasks){
    $scope.tasks = tasks;
  });
}
