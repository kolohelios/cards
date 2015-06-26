/* global $, document */

'use strict';

angular.module('tic')
.constant('firebaseUrl', 'https://tic-kolohelios.firebaseio.com/')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('home', {url: '/', templateUrl: '/views/home/home.html', controller: 'HomeCtrl'});
}]);
