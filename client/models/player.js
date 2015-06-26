'use strict';

angular.module('tic')
.factory('Player', ['$rootScope', function($rootScope){
  function Player(){}

  Player.register = function(player){
    return $rootScope.afAuth.$createUser(player);
  };

  Player.login = function(player){
    return $rootScope.afAuth.$authWithPassword(player);
  };

  Player.logout = function(){
    return $rootScope.afAuth.$unauth();
  };

  Player.oauth = function(provider){
    return $rootScope.afAuth.$authWithOAuthPopup(provider);
  };

  return Player;
}]);
