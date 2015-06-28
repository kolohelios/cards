'use strict';

angular.module('tic')
.controller('NavCtrl', function($rootScope, $scope, $state, Player, $firebaseObject){

  $scope.afAuth.$onAuth(function(data){
    if(data){
      $rootScope.player = data;
      $rootScope.displayName = getDisplayName(data);
      $rootScope.fbPlayer = $rootScope.fbRoot.child('players/' + data.uid);
      $rootScope.afPlayer = $firebaseObject($rootScope.fbPlayer);
    }else{
      $rootScope.activePlayer = null;
      $rootScope.displayName = null;
      $rootScope.fbPlayer = null;
      $rootScope.afPlayer = null;
    }

    $state.go('home');
  });

  $scope.logout = function(){
    Player.logout();
  };

  function getDisplayName(data){
    switch(data.provider){
      case 'password':
        return data.password.email;
      case 'twitter':
        return data.twitter.username;
      case 'facebook':
        return data.facebook.displayName;
    }
  }
});
