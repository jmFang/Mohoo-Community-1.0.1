/**
 * Created by jiamoufang on 2017/8/6.
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