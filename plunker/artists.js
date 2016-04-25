app.controller('MyController', ['$scope', 'recordaccess', function($scope, recordaccess) {
    recordaccess.success(function(data) {
        $scope.record1 = data;
        $scope.passw1 = '';
        $scope.passw2 = '';
        $scope.edit = true;
        $scope.error = false;
        $scope.incomplete = false;
        $scope.hideform = true;
        $scope.editUser = function(id) {
            $scope.hideform = false;
            if (id == 'new') {
                $scope.edit = true;
                $scope.incomplete = true;
                $scope.Name = '';
                $scope.City = '';
                $scope.Country = '';
            } else {
                $scope.id3=id;
                $scope.edit = false;
                $scope.Name = record1.record[0].Name;
                $scope.City = record1.record[0].City;
                $scope.Country =record1.record[0].Country;
            }
        };
    });
}]);



