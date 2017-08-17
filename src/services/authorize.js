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
