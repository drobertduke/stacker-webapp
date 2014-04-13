'use strict';

angular
  .module('stackerWebappApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'restangular',
    'ui.bootstrap',
    'ui.router'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
