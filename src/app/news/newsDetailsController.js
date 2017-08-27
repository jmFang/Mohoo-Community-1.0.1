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