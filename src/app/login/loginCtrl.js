/**
 * Created by jiamoufang on 2017/8/5.
 */
(function(){
    angular.module('Login',[])
        .controller('LoginController', ['$scope', '$location','$http', 'MoHooUtil', function($scope,  $location, $http, MoHooUtil) {
            $scope.userEntity = {
                username : 'sysuygm',
                password : 'sysuygm',
                rememberMe : false
            };

            return $scope.doLogin = function() {
                return $http.post('http://127.0.0.1:7410/api/user/login', {
                    username:$scope.userEntity.username,
                    password:$scope.userEntity.password
                }).then(function (res) {
                        return $location.path('/home').replace();
                    }, MoHooUtil.processHttpError );
            };
        }]);


}).call(this);