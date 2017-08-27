/*
* 定义项目的所有路由
* */
(function() {
    angular.module('MoHoo')
        .config(['$routeProvider', function($routeProvider) {
            return $routeProvider
                .when('/login', {
                    templateUrl: '/app/login/login.html',
                    controller: 'LoginController',
                    controllerAs:'login'
                   // access_level:ACCESS_LEVELS.pub
                })
                .when('/register', {
                    templateUrl:'/app/register/register.html',
                    controller: 'RegisterController'
                   // access_level:ACCESS_LEVELS.pub
                })
                .when('/home', {
                    templateUrl:'/app/home/home.html',
                   // access_level:ACCESS_LEVELS.pub
                    controller:'HomeController',
                    controllerAs:'home'
                })
                .when('/news/newslist', {
                    templateUrl:'/app/news/newslist.html',
                    controller:'NewListController',
                    controllerAs:'news'
                })
                .when('/news/newsDetails',{
                    templateUrl:'app/news/newsDetails.html',
                    controller:'NewsDetailsController',
                    controllerAs:'news'
                })
                .when('/forum', {
                    templateUrl:'/app/forum/forum.html'
                })
                .when('/map', {
                    templateUrl:'/app/map/map.html'
                })
                .when('/popularUser', {
                    templateUrl:'/app/popularUser/popularUser.html'
                })
                .when('/personalPage', {
                    templateUrl:'/app/personalPage/personalPage.html'
                })
                .when('/dialogue', {
                    templateUrl:'/app/dialogue/dialogue.html'
                })
                .otherwise({
                    redirectTo:'/home'
                });
        }
    ]).run(['$location', function($location) {
            return $location.path('/home').replace();
        }
    ]);

})();

/**
 * Created by jiamoufang on 2017/8/4.
 * 根据access_level判断当前用户的授权状态
 */
