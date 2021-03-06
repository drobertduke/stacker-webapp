'use strict';

var app = angular
  .module('stackerWebappApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'restangular',
    'ui.bootstrap',
    'ui.router',
    'xeditable',
    'ui.sortable'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    });

  }])
  .run(function(editableOptions) {
    editableOptions.theme = 'bs3';
  });

app.controller('sortableController', function($scope) {

})
