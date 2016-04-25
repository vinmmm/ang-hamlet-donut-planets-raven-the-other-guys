/* use strict */
var app = angular.module("polarisApp", []);

app.service("ravensService", function ($http, $q)
{
	var deferred = $q.defer();
	$http.get('resources/tog.json').then(function (data)
	{
		deferred.resolve(data);
	});

	this.getPlayers = function ()
	{
		return deferred.promise;
	}
})

.controller("Characters", function ($scope, ravensService)
{
	var promise = ravensService.getPlayers();
	promise.then(function (data)
	{
		$scope.names = data.data;
		console.log($scope.names);

		
		
	});

	$scope.names = [];
	$scope.currentName = $scope.names[0];
    $scope.changeName = function () {
        $scope.currentName = this.name;
        $scope.$broadcast('CharacterChanged', this.name);
    };

    $scope.$on('CharacterDeleted', function (event, removeName) {
        var i = $scope.names.indexOf(removeName);
        $scope.names.splice(i, 1);
        $scope.currentName = $scope.names[0];
        $scope.$broadcast('CharacterChanged', $scope.currentName);

    });
	
    
})
.controller('Character', function ($scope) {
    $scope.info = [];
    $scope.currentInfo = $scope.info['Alan'];
    $scope.$on('CharacterChanged', function (event, newCharacter) {
        $scope.currentInfo = $scope.info[newCharacter];
    });
    $scope.deleteChar = function () {
        delete $scope.info[$scope.currentName];
        $scope.$emit('CharacterDeleted', $scope.currentName);
    };
});
