'use strict';
function TaskListCtrl($scope, Restangular, $cookies) {
  $scope.oneAtATime = true;

  $scope.sortableOptions = {
    update: function(e, ui) {
    },
    stop: function(e, ui) {
    }
  };

  $scope.$watchCollection('tasks', function() {
    if (!$scope.hasOwnProperty("tasks")) {
      return;
    }

    for (var i = 0; i < $scope.tasks.length; i++) {
      var task = $scope.tasks[i];
      if (task.Priority != i) {
        task.Priority = i;
        $scope.savePriority(i, task.Id);
      }
    }
  });

  Restangular.setBaseUrl('http://localhost:8081');
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

  $scope.getFriends = function() {
    Restangular.all('users').getList().then( function(users) {
      $scope.friends = users;
      $scope.friends.forEach(function(friend) {
        Restangular.one('users', friend.Id).getList('tasks').then(function(tasks) {
          friend.tasks = tasks
          console.log('FRIEND HAS TASKS');
          console.log(tasks);
        });
      });
    });
  };


  var userId = $cookies.userId;
  if (typeof userId === 'undefined') {
    var user = {FullName: 'New User'};
    Restangular.all('users').post(user).then(function(user) {
      $scope.loggedInUser = user;
      $cookies.userId = $scope.loggedInUser.Id;
      $scope.getFriends();
      Restangular.one('users', $scope.loggedInUser.Id).getList('tasks').then(function(tasks){
        $scope.tasks = tasks;
      });
    });
  } else {
    Restangular.one('users', userId).get().then(function(user) {
      $scope.loggedInUser = user;
      $scope.getFriends();
      Restangular.one('users', $scope.loggedInUser.Id).getList('tasks').then(function(tasks){
        $scope.tasks = tasks;
      });
    }, function() {
      var user = {FullName: 'New User'};
      Restangular.all('users').post(user).then(function(user) {
        $scope.loggedInUser = user;
        $cookies.userId = $scope.loggedInUser.Id;
        $scope.getFriends();
        Restangular.one('users', $scope.loggedInUser.Id).getList('tasks').then(function(tasks){
          $scope.tasks = tasks;
        });
      });
    });
  }
}
