'use strict';
function UserListCtrl($scope, Restangular, $cookies) {
  $scope.oneAtATime = true;

  $scope.sortableOptions = {
    update: function(e, ui) {
    },
    stop: function(e, ui) {
    },
    out: function(e, ui) {
      ui.item.width(200);
    }
  };


  Restangular.setBaseUrl('http://localhost:8081');

  $scope.getFriends = function() {
    Restangular.all('users').getList().then( function(users) {
      $scope.friends = users;
      $scope.friends.forEach(function(friend) {
        Restangular.one('users', friend.Id).getList('tasks').then(function(tasks) {
          friend.tasks = tasks;
        });
      });
    });
  };

  $scope.getFriends();

  var userId = $cookies.userId;
}
