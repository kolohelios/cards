'use strict';

angular.module('tic')
.controller('HomeCtrl', ['$window', '$scope', 'Player', '$state', function($window, $scope, Player, $state){
  $scope.name = 'register';

  $scope.submit = function(player, action){
    if(action === 'register'){
      Player.register(player)
      .then(function(){
        $state.go('login');
      })
      .catch(function(){
        $window.swal({title: 'Registration Error', text: 'There was a problem with your registration. Please try again.', type: 'error'});
      });
    }else{
      Player.login(player)
      .catch(function(){
        $window.swal({title: 'Login Error', text: 'There was a problem with your login. Please try again.', type: 'error'});
      });
    }
  };

  $scope.oauth = function(provider){
    Player.oauth(provider);
  };
}]);
