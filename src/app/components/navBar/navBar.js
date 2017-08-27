/**
 * Created by jiamoufang on 2017/8/7.
 */
(function () {
    angular.module('MoHoo')
        .directive('navBar', ['$location', navBar]);

    function navBar($location) {
        return {

            restrict:'EA',
            templateUrl:'app/components/navBar/navBar.html',
            scope:{

            },
            controller:navBarController,
            controllerAs:'vm',
            bindToController:true,
            replace:true
        };

        function navBarController($location) {
            var vm = this;
            vm.keyword = "";
            vm.Search = function () {
                if(vm.keyword == "") {
                    alert("search content can't be empty!");
                }  else {
                    $location.path('/news/newslist').search({keyword:vm.keyword});
                }
            }
        }
    }
})();
