/**
 * Created by jiamoufang on 2017/8/13.
 * 定义主页头部的登录和注册的接口的指令
 */
(function(){
    angular.module('MoHoo')
        .directive('headInterface', ['$location',headInterface]);

    function headInterface() {
        return directive = {
            restrict:'E',
            templateUrl:'app/components/headInterface/headInterface.html',
            scope:{

            },
            controller:headInterfaceController,
            controllerAs:'interface',
            bindToController:true,
            replace:true
        };

        function headInterfaceController($scope, $location) {
            $scope.login = function () {

            };
            $scope.register = function () {

            };

        }
    }
})();