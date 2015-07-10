'use strict';

angular.module('KnowledgeTrader')
.run(function(FBService){
  FBService.init();
  console.log('Thor Online');
});
