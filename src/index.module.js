/**
 * Created by jiamoufang on 2017/8/13.
 * 向主模块MOHoo注入所有的模块依赖
 */
(function () {
    'use strict';

    angular
        .module('MoHoo',['Login','Home','ngRoute','NewList','newsDetails']);
})();

