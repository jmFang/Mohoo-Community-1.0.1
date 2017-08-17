/**
 * Created by jiamoufang on 2017/8/13.
 * 注册一个服务，提供各个模块需要的API，向服务器发出请求，将数据返回到各个模块
 */

(function () {
    'use strict';

    angular.module('MoHoo')
        .factory('dataService', dataService);

    function dataService($http, $sce) {
        /*本地测试*/
        var baseUrl = '127.0.0.1:7410/';
        var service = {};

        service.getBaseUrl = function () {
            return baseUrl;
        };
        /*初始化home页面的新闻*/
        service.getIndex = function () {

        }




    }

})();
