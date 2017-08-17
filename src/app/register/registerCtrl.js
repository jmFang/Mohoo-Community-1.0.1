/**
 * Created by jiamoufang on 2017/8/5.
 */
(function () {
    angular.module('MoHoo')
        .controller('RegisterController', ['$scope', '$http', '$location','MoHooUtil', function ($scope, $http, $location, MoHooUtil) {
            var phoneRegx = "^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\\d{8}$";
            var emailRegx = "^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$";
            var pwdRegx = "[a-zA-Z0-9]*";//���Ը�������һЩ
            $scope.userEntity = {
                userName:'',
                userEmail:'',
                userPassword:''
            };
            $scope.addresses =[
                {
                    "province":'广东省',
                    "city":"广州市",
                    "university":"中山大学"
                },
                {
                    "province":"湖南省",
                    "city":"长沙市",
                    "university":"湖南大学"
                }
            ];
            return $scope.doRegister = function () {
               return $http.post('http://localhost:7410/api/user/register',
                    {
                            username:$scope.userEntity.userName,
                            password:$scope.userEntity.userPassword
                    }
                ).then(function (res) {
                    alert("success");
                       return $location.path('/login');
                }, MoHooUtil.processHttpError);
            };

        }]);
    /*define a ng directive named ensure-unique,*/
 /*   angular.module('MoHoo')
        .directive('ensureUnique', function ($http) {
            return {
                require:'ngModel',
                link: function (scope, ele, attrs, c) {
                    scope.$watch(attrs.ngModel, function (n) {
                        if(!n) return;
                        $http({
                            method:'POST',
                            url:'#',
                            data:{
                                filed:attrs.ensureUnique,
                                value:scope.ngModel
                            }
                        }).success(function (data) {
                            c.$setValidity('unique', data.isUnique);
                        }).error(function (data) {
                            c.$setValidity('unique', false);
                        });
                    });
                }
            };
        })*/
})();