define("ox/common/1.0.1/about-debug", [ "./nav-debug", "./iscript-debug", "./han-debug", "han-debug" ], function(require) {
    //导航菜单
    require("./nav-debug");
    //han.js
    require("./han-debug");
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

define("ox/common/1.0.1/han-debug", [ "han-debug" ], function(require) {
    require("han-debug");
});
