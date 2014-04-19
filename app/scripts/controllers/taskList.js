'use strict';
function TaskListCtrl($scope, Restangular, $cookies) {
  $scope.oneAtATime = true;

  $scope.sortingLog = [];
  var tmpList = $scope.tasks;

  $scope.sortableOptions = {
    update: function(e, ui) {
    },
    stop: function(e, ui) {
      for (var i = 0; i < $scope.tasks.length; i++) {
        var task = $scope.tasks[i];
        if (task.Priority != i) {
          console.log(i);
          task.Priority = i;
          $scope.savePriority(i, task.Id);
        }
      }
    }
  };

  var baseTasks = Restangular.all('tasks');
  $scope.add = function () {
    $scope.tasks.unshift(
      {
        Title: "New Task",
        Description: "",
        OwnerId: $cookies.userId
      }
    );
    baseTasks.post($scope.tasks[0]).then(function(task){
      $scope.tasks[0].Id = task.Id;
    });
    $scope.tasks[0].isOpen = true;
  };

  $scope.saveTitle = function (data, id) {
    Restangular.one('tasks', id).put({Title: data});
  };

  $scope.savePriority = function (data, id) {
    Restangular.one('tasks', id).put({Priority: data});
  };

  $scope.saveDescription = function (data, id) {
    Restangular.one('tasks', id).put({Description: data});
  };

  Restangular.setBaseUrl('http://localhost:8081');
  var userId = $cookies.userId;
  if (typeof userId === 'undefined') {
    var user = {FullName: 'New User'};
    Restangular.all('users').post(user).then(function(user) {
      $scope.loggedInUser = user;
      $cookies.userId = $scope.loggedInUser.Id;
      Restangular.one('users', $scope.loggedInUser.Id).getList('tasks').then(function(tasks){
        $scope.tasks = tasks;
      });
    });
  } else {
    Restangular.one('users', userId).get().then(function(user) {
      $scope.loggedInUser = user;
      Restangular.one('users', $scope.loggedInUser.Id).getList('tasks').then(function(tasks){
        $scope.tasks = tasks;
      });
    }, function() {
      var user = {FullName: 'New User'};
      Restangular.all('users').post(user).then(function(user) {
        $scope.loggedInUser = user;
        $cookies.userId = $scope.loggedInUser.Id;
        Restangular.one('users', $scope.loggedInUser.Id).getList('tasks').then(function(tasks){
          $scope.tasks = tasks;
        });
      });
    });
  }
}
