'use strict';

/**
 * @ngdoc service
 * @name atlApp.accessRecord.js
 * @description
 * # accessRecord.js
 * Factory in the atlApp.
 */
app.factory('recordaccess', ['$http', function ($http) {
    return $http.get('record.json')
        .success(function(data) {
            return data;
        })
        .error(function(err) {
            return err;
        });
}]);