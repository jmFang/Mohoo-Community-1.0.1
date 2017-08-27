/**
 * Created by jiamoufang on 2017/8/13.
 * 向主模块MOHoo注入所有的模块依赖
 */
(function () {
    'use strict';

    angular
        .module('MoHoo',['Login','Home','ngRoute','NewList','newsDetails']);
})();



/**
 * Created by jiamoufang on 2017/8/13.
 * 注册dataService服务，提供各个模块需要的API，向服务器发出请求，将数据返回到各个模块
 */

(function () {
    'use strict';

    angular
        .module('MoHoo')
        .factory('dataService', dataService);

    function dataService($http, $sce) {
        /*本地测试*/
        var baseUrl = 'http://127.0.0.1:7410/';
        var service = {};

        service.getBaseUrl = function () {
            return baseUrl;
        };
        /*初始化home页面的新闻*/
        service.getIndex = function (fb, err) {
            $http.get(baseUrl+'home/init', {
                headers:{'Content-Type':undefined}
            }).then(function (res) {
                fb(res);
            });
        };
        /*获取通知或新闻的详细页面*/
        service.getNewsDetails = function (id,fb,err) {
            $http.get(baseUrl+'news/details?id='+id, {
                headers:{
                    'Content-Type':undefined
                }
            }).then(function (res) {
                fb(res);/*回调,处理newsDatails.html*/
            }).catch(function (err) {
                /*错误处理*/
            })
        };
        /*获取通知或新闻的条目列表
        * pageIndex是newsList的第几页
        * category是newsList的类型
        * pageSize是newsList每页的大小
        * */
        service.getNewsList = function (pageIndex, category, fb, err) {
            $http.get(baseUrl+'news/newsList?pageSize=10&pageIndex='+pageIndex+'&category'+category, {
                headers:{'Content-Type':undefined}
            }).then(function (res) {
                fb(res);
            }).catch(function (err) {
                /*错误处理*/
            })
        };
        service.login = function (user, fb) {
          $http.post(baseUrl+'api/user/login',user)
              .then(function (res) {
                  /*回调*/
                  fb(res);
              })
        };
        service.getURL = baseUrl;
        return service;
    }

})();


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
 * Home版块的控制器
 */
(function () {
    angular
        .module('Home',[])
        .controller('HomeController', ['$scope', '$location','dataService', HomeController]);
    function HomeController($scope, $location,dataService) {
        var vm = this;// 把作用域对象交给vm
        /*以下为测试，正确的数据索取应该到后台，API待写*/
        vm.newslist = [
            {
                id:"1",
                "title":"答好友问（一）：今天吃什么",
                "abstract":"中大食堂有四个，爱吃什么吃什么"
            },
            {
                id:"2",
                "title":"答好友问（二）：明天吃什么",
                "abstract":"今天的事先完成再说"
            },
            {
                id:"3",
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
        vm.pictures = [
            {
                id:"0",
                url:"../../assets/img/homeCarousel/homeCarousel1.jpg"
            },
            {
                id:"1",
                url:"../../assets/img/homeCarousel/homeCarousel1.jpg"
            },
            {
                id:"2",
                url:"../../assets/img/homeCarousel/homeCarousel1.jpg"
            },
            {
                id:"3",
                url:"../../assets/img/homeCarousel/homeCarousel1.jpg"
            }
        ];
        /*以下为正式向服务器的调用*/
/*        dataService.getIndex(function (res) {
            console.log(res);
/!*            vm.pictures = JSON.parse(res.data.data).sliderList;/!*后台实现此数据结构，sliderList为图片轮播的数组*!/
            vm.newslist = JSON.parse(res.data.data).activityList;
            vm.mohooMainNews = JSON.parse(res.data.data).mohooMainNewsList;
            vm.mohooTalks = JSON.parse(res.data.data).mohooTalksList;
            vm.mohooUnionAssays = JSON.parse(res.data.data).mohooUnionAssaysList;*!/
        }, function () {
            /!*error处理函数*!/
        });*/

        /*图片或数据向后台请求的路径,传入PATH返回完整的URL*/
        vm.getUrl = function (str) {
            if(str)
                return dataService.getURL + str.substr(1);
            else
                return '';
        }
    }
})();

/**
 * Created by jiamoufang on 2017/8/5.
 */
(function(){
    angular.module('Login',[])
        .controller('LoginController',['dataService', '$location','$http', 'MoHooUtil', LoginController]);

       function LoginController(dataService,  $location, $http, MoHooUtil) {
           var vm = this;
           vm.userEntity = {
               username: 'sysuygm',
               password: 'sysuygm',
               rememberMe: false
           };
           vm.doLogin = function () {

               dataService.login(vm.userEntity, function (res) {

                   if(res.status == "200" || res.status == "204") {
                       /*登录成功后的处理*/
                       alert(res.status);
                       $location.path('/home');
                   } else {
                       alert('账号或密码错误！');
                   }
               })
           };
       }

}).call(this);

/**
 * Created by jiamoufang on 2017/8/18.
 * newsDetails.html的控制器
 */
(function () {
    'use strict';

    angular
        .module('newsDetails',[])
        .controller('NewsDetailsController',['dataService', '$location', NewsDetailsController]);
    /**/
    function NewsDetailsController(dataService, $location) {
        var vm = this;
        /*search()返回一个当前url序列化参数的json对象*/
        var id = $location.search().nid;
        /*后台应该实现的details对象*/
        vm.details = {
            newsTitle : "中大狂人札记",
            gmtCreate: Date.parse(new Date()),/*获取当前系统的时间戳*/
            newsAuthor:"言甘木",
            newsAbstract:"中山大学数据科学与计算机学院2015级本科生",
            newsContent:"你在南方的艳阳里，大雪纷飞，我在北方的寒夜里，四季如春。"
            };

        angular.element('.details-content')[0].innerHTML = vm.details.newsContent;

        /*获取后台数据*/
        dataService.getNewsDetails(id, function (res) {
            vm.details = res.data.data;
            angular.element('.details-content')[0].innerHTML = vm.details.newsContent;
            /*图片插入*/
            for(var i = 0; i<angular.element('.details-content img').length;i++) {
                angular.element('.details-content img')[i].setAttribute('height','none');
            }
        }, function () {
            /*错误处理*/
        });
        /*调整日期格式*/
        vm.timeForm = function (time_num) {
            var time = new Date(parseInt(time_num));
            var timeString = time.toLocaleString().substr(0,4);
            if(time.getMonth() < 10) {
                timeString += "-0" + (time.getMonth() + 1);
            } else {
                timeString += "-" + (time.getMonth() + 1);
            }
            if(time.getDate() < 10) {
                timeString += "-0" + time.getDate();
            } else {
                timeString += "-" + time.getDate();
            }
            return timeString;
        }
    }
})();

/**
 * Created by jiamoufang on 2017/8/13.
 * 
 */
(function () {
    'use strict';
    angular
        .module('NewList',[])
        .controller('NewListController', ['dataService','$location', '$scope', NewListController]);

    function NewListController(dataService, $location, $scope) {
        var vm = this;
        //vm.newsTitle = "中大狂人";
        vm.currentPage = 0;
        vm.startPages = 0;
        vm.endPage = 3;
        vm.totalPages = 3;
        vm.newslist = {};
        vm.keyword = $location.search().keyword;
        vm.newsCateg = $location.search().category;
       // alert(vm.newsCateg);
        //vm.newsTitle = vm.newsCateg;
        vm.getList = function (index) {
            if(vm.keyword == undefined) {
                if(vm.newsCateg == undefined) {
                    alert("搜索失败");
                    $location.path('/home');
                } else {
                    if(index == 0) {
                        vm.newsTitle = vm.newsCateg;
                    }
                    dataService.getNewsList(index+1, vm.newsCateg, function (res) {
                        /*从后台返回的数据包括以下属性
                        * data:{
                        *   data:newslistJSON 包括listnews所需数据的对象
                        *   msg:{
                        *       count:返回数据的页数
                        *       }
                        *   }
                        * */
                        vm.newslist = res.data.data;
                        console.log(vm.newslist);
                        if(index == 0) {
                            vm.totalPages = JSON.parse(res.data.msg).count;
                            vm.endPage = parseInt(vm.totalPage / 10);
                            if(vm.totalPage % 10 == 0 && vm.totalPage != 0) {
                                vm.endPage--;
                            }
                        }
                        vm.currentPage = index;
                    }, function (err) {
                        /*错误处理*/
                    })
                }
            } else {
                /*处理搜索功能*/

            }
        };
        vm.getList(0);

        /*测试，向后台索取数据的API待写*/
/*        vm.newslist = [
            {
                "id":1,
                "title":"第一个题目",
                "author":"SYSUYGM",
                "abstract":"第一个概述"
            },
            {
                "id":2,
                "title":"第二个题目",
                "author":"SYSUYGM",
                "abstract":"第二个概述"
            }
        ];*/
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
 */


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
            vm.Search = function () {
                if(vm.keyword == "") {
                    alert("search content can't be empty!");
                }  else {
                    $location.path('/news/newslist').search({keyword:vm.keyword});
                }
            }
        }
    }
})();
