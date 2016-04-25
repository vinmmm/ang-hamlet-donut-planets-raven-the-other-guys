var app = angular.module('plunker', ['ui.bootstrap']);

app.controller('MainCtrl', function($scope, $http) {
  $http.get('characters.json')
       .then(function(res){
          $scope.todos = res.data; 
          
        });
});