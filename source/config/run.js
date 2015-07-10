'use strict';

//replace FBService with Passport.

angular.module('KnowledgeTrader')
.run(function(FBService){
  FBService.init();
  console.log('Thor Online');
});
