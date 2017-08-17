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