'use strict';

//replace FBService with Passport.

angular.module('KnowledgeTrader')
.run(function(Passport){
  Passport.init();
  console.log('KnowledgeTrader Online');
});
