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
