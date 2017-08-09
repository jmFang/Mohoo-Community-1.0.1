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
