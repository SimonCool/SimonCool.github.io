/**
 * ----------------------------------------------
 *  工具方法
 * Created by hzqiushengqiang on 2016/3/24.
 * ----------------------------------------------
 */
var Util = (function () {
    var util = {};
    util.getRandomNumber=function () {

    };
    util.forEach= function (fn) {
        for (var i = 0; i<4;i++) {
            for (var j = 0; j<4;j++) {
                fn(i, j,i*4+j);
            }
        }
    };
    return util;
})();
