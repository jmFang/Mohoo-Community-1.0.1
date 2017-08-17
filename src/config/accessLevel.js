/**
 * Created by jiamoufang on 2017/8/12.
 * 定义访问规则，防止用户非法访问某些路由
 */
(function () {
    angular.module('MoHoo')
        .constant('ACCESS_LEVELS',{
            pub:1, //public
            user:2
        })
        .config(function ($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers
                .common['X-Requested-With'];
        });
})();

