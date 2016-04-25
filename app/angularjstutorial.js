/* use strict */
var app = angular.module("RavensApp", []);

app.service("ravensService", function ($http, $q)
{
	var deferred = $q.defer();
	$http.get('ravens.json').then(function (data)
	{
		deferred.resolve(data);
	});

	this.getPlayers = function ()
	{
		return deferred.promise;
	}
})

.controller("ravensCtrl", function ($scope, ravensService)
{
	var promise = ravensService.getPlayers();
	promise.then(function (data)
	{
		$scope.players = data.data;
	});
})