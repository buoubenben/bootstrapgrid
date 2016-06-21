//服务模块
angular.module('costServices', [])
    .factory('mService', function ($http, $q) {
        return {
            getAllData: function (arr) {
                return $q.all(arr)
                    .then(
                    angular.forEach(function (response) {
                        return response;
                    })
                )
            }
        }
    })
    .run(function ($http) {
        $http.defaults.headers.post =
        {'Content-Type': 'application/x-www-form-urlencoded'};
    });