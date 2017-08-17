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