/**
 * Created by jiamoufang on 2017/8/12.
 * define a interceptor for response
 * 创建一个$http拦截器处理未通过身份验证的API请求，首先创建来处理所有响应
 * 这个授权拦截器会处理请求中一些可预见的服务器响应状态吗。
 * 当拦截器捕获到401状态吗，会通过$broadcast开始向所有的子作用域广播此事件
 * 另外，拦截器将返回200状态码的请求将令牌保存到/api/login登录路由中
 */
(function () {
    angular.module('MoHoo')
        .config(function ($httpProvider) {
            /*$q是内置的服务*/
            var interceptor = function ($q, $rootScope, Auth) {
                return {
                    'response': function (resp) {
                        if(reps.config.url == 'api/login') {
                            //假设API服务器返回的数据格式如下：{token:'AUTH_TOKEN'}
                            Auth.setToken(resp.data.token);
                        }
                        return reps;
                    },
                    'responseError': function (rejection){
                        //错误处理
                        switch (rejection.status) {
                            case 401:
                                if(rejection.config.url !== 'api/login ')
                                //如果当前不是在登录界面
                                $rootScope.$broadcast('auth:loginRequired');
                                break;
                            case 403:
                                $rootScope.$broadcast('auth:forbidden');
                                break;
                            case 404:
                                $rootScope.$broadcast('page:notFound');
                                break;
                            case 500:
                                $rootScope.$broadcast('server:error');
                                break;
                        }
                        return $q.reject(rejection);

                    }
                };
            };
        });
})();