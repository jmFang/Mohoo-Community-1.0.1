(function() {
    angular.module('MoHoo', ['ngRoute','ngSanitize']).config([
        '$routeProvider', function($routeProvider) {
            return $routeProvider
                .when('/login', {
                    templateUrl: '/app/login/login.html',
                    controller: 'LoginController'
                })
                .when('/register', {
                    templateUrl:'/app/register/register.html',
                    controller: 'RegisterController'
                })
                .when('/home', {
                    templateUrl:'/app/home/home.html',
                   // controller:'HomeController'

                })
        }
    ]).run([
        '$location', function($location) {
            return $location.path('/home').replace();
        }
    ]);

}).call(this);

/**
 * Created by jiamoufang on 2017/8/4.
 */


/**
 * Created by jiamoufang on 2017/8/6.
 */
(function(){
angular.module('MoHoo')
    .factory('MoHooUtil', [function () {
        var processHttpError = function (res) {
            console.log(res);
        };
        return {
            processHttpError: processHttpError
        };
    }])
})();

/**
 * Created by jiamoufang on 2017/8/5.
 */


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

/**
 * Created by jiamoufang on 2017/8/5.
 */
(function () {
    angular.module('MoHoo')
        .controller('RegisterController', ['$scope', function ($scope) {
            var phoneRegx = "^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\\d{8}$";
            var emailRegx = "^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$";
            var pwdRegx = "[a-zA-Z0-9]*";//可以更加严密一些
            $scope.userEntity = {

            };

        }]);
})();



/**
 * Created by jiamoufang on 2017/8/7.
 */
(function () {
    angular.module('MoHoo')
        .directive('navBar', ['$location', navBar]);

    function navBar($location) {
        return {

            restrict:'EA',
            templateUrl:'app/components/navBar/navBar.html',
            scope:{

            },
            controller:navBarController,
            controllerAs:'vm',
            bindToController:true,
            replace:true
        };

        function navBarController($location) {
            var vm = this;
            vm.keyword = "";
            vm.Search = function ($location) {
                if(vm.keyword == "") {
                    alert("search content can't be empty!");
                }  else {
                //$location.path()';
                    //路由到后台
                   // $location.path('/login').replace();
                        //.search({keyword:vm.keyword});
                }
            }
        }
    }
})();
