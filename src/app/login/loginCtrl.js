/**
 * Created by jiamoufang on 2017/8/5.
 */
(function(){
    angular.module('Login',[])
        .controller('LoginController',['dataService', '$location','$http', 'MoHooUtil', LoginController]);

       function LoginController(dataService,  $location, $http, MoHooUtil) {
           var vm = this;
           vm.userEntity = {
               username: 'sysuygm',
               password: 'sysuygm',
               rememberMe: false
           };
           vm.doLogin = function () {

               dataService.login(vm.userEntity, function (res) {

                   if(res.status == "200" || res.status == "204") {
                       /*登录成功后的处理*/
                       alert(res.status);
                       $location.path('/home');
                   } else {
                       alert('账号或密码错误！');
                   }
               })
           };
       }

}).call(this);