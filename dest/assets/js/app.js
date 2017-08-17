/**
 * Created by jiamoufang on 2017/8/13.
 * 向主模块MOHoo注入所有的模块依赖
 */
(function () {
    'use strict';

    angular
        .module('MoHoo',['Login','Home','ngRoute','NewList']);
})();



(function() {
    angular.module('MoHoo')
        .config(['$routeProvider', function($routeProvider) {
            return $routeProvider
                .when('/login', {
                    templateUrl: '/app/login/login.html',
                    controller: 'LoginController'
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


/**
 * Created by jiamoufang on 2017/8/12.
 * 对已经存在的用户进行监视，服务可以访问浏览器的cookie
 * 当用户重新登录时，只要会话有效就无须再次进行身份验证
 */
/*
(function () {
    angular.module('MoHoo')
        .factory('Auth', function ($cookieStore, ACCESS_LEVELS) {
            var _user = $cookieStore.get('user');
            var setUser = function (user) {
                if(!user.role || user.role < 0) {
                    user.role = ACCESS_LEVELS.pub;
                }
                _user = user;
                $cookieStore.put('user',_user);
            };
            return {
                isAuthorized: function (lvl) {
                    return _user.role >= lvl;
                },
                setUser:setUser,
                isLoggedIn: function () {
                    return _user? true:false;
                },
                getUser: function () {
                    return _user;
                },
                getId: function () {
                    return _user? _user._id:null;
                },
                getToken: function () {
                    return _user? _user.token :'';
                },
                logout: function () {
                    $cookieStore.remove('user');
                    _user = null;
                }
            };
        })
        .run(function ($rootScope, $location, Auth) {
            //给$routeChangeStart设置监听
            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                if(!Auth.isAuthorized(next.$route.access_level)) {
                    if(Auth.isLoggedIn()) {
                        //用户登录但是没有访问当前视图的权限
                        $location.path('/home');
                    } else {
                        $location.path('/login');
                    }
                }
            });
        });
    /!*
    * 当用验证户通过身份并登录后，可以在$routeChangeStart事件进行有效的检查
    * *!/

})();*/


/**
 * Created by jiamoufang on 2017/8/6.
 * 定义错误处理的服务
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
(function () {
    angular
        .module('Home',[])
        .controller('HomeController', ['$scope', '$location', HomeController]);
    function HomeController($scope, $location) {
        var vm = this;// 把作用域对象交给vm
        /*以下为测试，正确的数据索取应该到后台，API待写*/
        vm.newslist = [
            {
                "title":"答好友问（一）：今天吃什么",
                "abstract":"中大食堂有四个，爱吃什么吃什么"
            },
            {
                "title":"答好友问（二）：明天吃什么",
                "abstract":"今天的事先完成再说"
            },
            {
                "title":"答好友问（三）：后天吃什么",
                "abstract":"明天能不能活得过还是值得考虑的"
            }
        ];
        vm.mohooMainNews =[
            {
                "title":"答好友问（一）：今天吃什么",
                "abstract":"中大食堂有四个，爱吃什么吃什么"
            },
            {
                "title":"答好友问（二）：明天吃什么",
                "abstract":"今天的事先完成再说"
            },
            {
                "title":"答好友问（三）：后天吃什么",
                "abstract":"明天能不能活得过还是值得考虑的"
            }
        ];
        vm.mohooTalks = [
            {
                "title":"答好友问（一）：今天吃什么",
                "abstract":"中大食堂有四个，爱吃什么吃什么"
            },
            {
                "title":"答好友问（二）：明天吃什么",
                "abstract":"今天的事先完成再说"
            },
            {
                "title":"答好友问（三）：后天吃什么",
                "abstract":"明天能不能活得过还是值得考虑的"
            }
        ];
        vm.mohooUnionAssays = [
            {
                "title":"答好友问（一）：今天吃什么",
                "abstract":"中大食堂有四个，爱吃什么吃什么"
            },
            {
                "title":"答好友问（二）：明天吃什么",
                "abstract":"今天的事先完成再说"
            },
            {
                "title":"答好友问（三）：后天吃什么",
                "abstract":"明天能不能活得过还是值得考虑的"
            }
        ];

    }
})();

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

/**
 * Created by jiamoufang on 2017/8/13.
 * 
 */
(function () {
    'use strict';
    angular
        .module('NewList',[])
        .controller('NewListController', ['$location', '$scope', NewListController]);
    function NewListController($lcoation, $scope) {
        var vm = this;
        vm.newsTitle = "中大狂人";
        vm.totalPages = 2;
        vm.newslist = {};
        /*测试，向后台索取数据的API待写*/
        vm.newslist = [
            {
                "title":"第一个题目",
                "abstract":"第一个概述"
            },
            {
                "title":"第二个题目",
                "abstract":"第二个概述"
            }
        ];
    }
})();

/**
 * Created by jiamoufang on 2017/8/5.
 */
(function () {
    angular.module('MoHoo')
        .controller('RegisterController', ['$scope', '$http', '$location','MoHooUtil', function ($scope, $http, $location, MoHooUtil) {
            var phoneRegx = "^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\\d{8}$";
            var emailRegx = "^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$";
            var pwdRegx = "[a-zA-Z0-9]*";//���Ը�������һЩ
            $scope.userEntity = {
                userName:'',
                userEmail:'',
                userPassword:''
            };
            $scope.addresses =[
                {
                    "province":'广东省',
                    "city":"广州市",
                    "university":"中山大学"
                },
                {
                    "province":"湖南省",
                    "city":"长沙市",
                    "university":"湖南大学"
                }
            ];
            return $scope.doRegister = function () {
               return $http.post('http://localhost:7410/api/user/register',
                    {
                            username:$scope.userEntity.userName,
                            password:$scope.userEntity.userPassword
                    }
                ).then(function (res) {
                    alert("success");
                       return $location.path('/login');
                }, MoHooUtil.processHttpError);
            };

        }]);
    /*define a ng directive named ensure-unique,*/
 /*   angular.module('MoHoo')
        .directive('ensureUnique', function ($http) {
            return {
                require:'ngModel',
                link: function (scope, ele, attrs, c) {
                    scope.$watch(attrs.ngModel, function (n) {
                        if(!n) return;
                        $http({
                            method:'POST',
                            url:'#',
                            data:{
                                filed:attrs.ensureUnique,
                                value:scope.ngModel
                            }
                        }).success(function (data) {
                            c.$setValidity('unique', data.isUnique);
                        }).error(function (data) {
                            c.$setValidity('unique', false);
                        });
                    });
                }
            };
        })*/
})();

/**
 * Created by jiamoufang on 2017/8/13.
 * 定义主页头部的登录和注册的接口的指令
 */
(function(){
    angular.module('MoHoo')
        .directive('headInterface', ['$location',headInterface]);

    function headInterface() {
        return directive = {
            restrict:'E',
            templateUrl:'app/components/headInterface/headInterface.html',
            scope:{

            },
            controller:headInterfaceController,
            controllerAs:'interface',
            bindToController:true,
            replace:true
        };

        function headInterfaceController($scope, $location) {
            $scope.login = function () {

            };
            $scope.register = function () {

            };

        }
    }
})();

/**
 * Created by jiamoufang on 2017/8/13.
 */




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
                    //·�ɵ���̨
                   // $location.path('/login').replace();
                        //.search({keyword:vm.keyword});
                }
            }
        }
    }
})();
