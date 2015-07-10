'use strict';

angular.module('KnowledgeTrader')
.factory('User', function(FBService){
  function User(){}

  User.register = function(user){
    return FBService.afAuth.$createUser(user);
  };
  User.login = function(user){
    return FBService.afAuth.$authWithPassword(user);
  };
  User.oauth = function(provider){
    return FBService.afAuth.$authWithOAuthPopup(provider);
  };

  return User;
});
