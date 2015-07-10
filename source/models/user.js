'use strict';

angular.module('KnowledgeTrader')
.factory('User', function(Passport){
  function User(){}

  User.register = function(user){
    return Passport.auth.$createUser(user);
  };
  User.login = function(user){
    return Passport.auth.$authWithPassword(user);
  };
  User.oauth = function(provider){
    return Passport.auth.$authWithOAuthPopup(provider);
  };

  return User;
});
