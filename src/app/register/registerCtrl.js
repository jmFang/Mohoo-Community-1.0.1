/**
 * Created by jiamoufang on 2017/8/5.
 */
(function () {
    angular.module('MoHoo')
        .controller('RegisterController', ['$scope', function ($scope) {
            var phoneRegx = "^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\\d{8}$";
            var emailRegx = "^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$";
            var pwdRegx = "[a-zA-Z0-9]*";//可以更加严密一些
            $scope.userEntity = {

            };

        }]);
})();