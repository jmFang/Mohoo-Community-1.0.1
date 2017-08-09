/**
 * Created by jiamoufang on 2017/8/5.
 */
(function(){
    angular.module('MoHoo')
        .controller('LoginController', ['$scope', '$location','$http', 'MoHooUtil', function($scope,  $location, $http, MoHooUtil) {
            $scope.userEntity = {
                username : '',
                password : '',
                rememberMe : false
            };

            return $scope.doLogin = function() {
                $http.post("http://localhost:7410/api/user/login", {})
                    .then(function (res) {
                        $location.path('/home').replace();
                    }, MoHooUtil.processHttpError );
                console.log($scope.userEntity);
            };
        }]);


})();