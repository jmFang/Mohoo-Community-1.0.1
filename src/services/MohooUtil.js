/**
 * Created by jiamoufang on 2017/8/6.
 * 定义错误处理的服务
 */

(function(){
angular.module('MoHoo')
    .factory('MoHooUtil', [function () {
        var processHttpError = function (res) {
            console.log(res);
        };
        return {
            processHttpError: processHttpError
        };
    }])
})();