define("ox/common/1.0.1/main-debug", [ "./util-debug", "./nav-debug", "./iscript-debug" ], function(require) {
    var util = require("./util-debug");
    //导航菜单
    require("./nav-debug");
});

define("ox/common/1.0.1/util-debug", [], function(require, exports) {
    Date.prototype.format = function(format) {
        var o = {
            "M+": this.getMonth() + 1,
            //month
            "d+": this.getDate(),
            //day
            "h+": this.getHours(),
            //hour
            "m+": this.getMinutes(),
            //minute
            "s+": this.getSeconds(),
            //second
            "q+": Math.floor((this.getMonth() + 3) / 3),
            //quarter
            S: this.getMilliseconds()
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        //for
        return format;
    };
});

define("ox/common/1.0.1/nav-debug", [ "ox/common/1.0.1/iscript-debug" ], function(require) {
    //自定义js模块
    require("ox/common/1.0.1/iscript-debug");
    $(document).ready(function() {
        var $items = $("#nav a");
        $items.each(function(i, o) {
            if (location.href.indexOf(o.getAttribute("href")) > 0) {
                o.className = "current";
                return false;
            }
        });
    });
});

/**
 * 执行页面内嵌的js脚本。这类脚本统一至于iScripts变量中
 */
define("ox/common/1.0.1/iscript-debug", [], function(require) {
    $(document).ready(function() {
        var items = window["iScripts"] || [];
        len = iScripts.length;
        if (len === 0) {
            return;
        }
        for (var i = 0; i < len; i++) {
            items[i]._onLoad && items[i]._onLoad.call(items[i]);
        }
        //for
        delete window["iScripts"];
    });
});
