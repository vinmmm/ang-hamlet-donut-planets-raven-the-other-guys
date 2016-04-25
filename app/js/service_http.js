angular.module('myApp', []).
controller('myController', ['$scope', '$http', 
							function ($scope, $http) {
	$scope.playCharacters = {};
	$scope.actCharacters = {};
	$scope.status = "";
	$scope.resetPlay = function () {
		$scope.status = "";
		$http.get('/reset/data')
		.success(function (data, status, headers, config) {
			$scope.playCharacters = data;
		})
		.error(function (data, status, headers, config) {
			$scope.status = data;
		});


	};

	$scope.takeCharacter = function (takeCharacter){
		$http.post('/take/character', {character:takeCharacter})
		.success(function (data, status, headers, config) {
			$scope.playCharacters = data;
			if ($scope.actCharacters.hasOwnProperty(takeCharacter)) {
				$scope.actCharacters[takeCharacter] += 1;
			} else {
				$scope.actCharacters[takeCharacter] = 1;

			}

			$scope.status = "Killed " + takeCharacter;

		})

		.error(function (data, status, headers, config){
			$scope.status = data.msg;

	});

};

$scope.useCharacter = function (useCharacter){
	if ($scope.actCharacters[useCharacter] > 0){
		$scope.actCharacters[useCharacter] -= 1;

	}
};
	
	
}]);