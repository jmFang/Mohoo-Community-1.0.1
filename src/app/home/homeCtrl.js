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