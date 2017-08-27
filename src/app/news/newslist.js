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