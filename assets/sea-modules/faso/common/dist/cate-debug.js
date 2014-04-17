define("faso/common/1.0.1/cate-debug", [ "./nav-debug", "./iscript-debug", "./tagcloud-debug" ], function(require) {
    //导航菜单
    require("./nav-debug");
    //标签云
    require("./tagcloud-debug");
});

define("faso/common/1.0.1/nav-debug", [ "faso/common/1.0.1/iscript-debug" ], function(require) {
    //自定义js模块
    require("faso/common/1.0.1/iscript-debug");
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
define("faso/common/1.0.1/iscript-debug", [], function(require) {
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

define("faso/common/1.0.1/tagcloud-debug", [], function(require) {
    require.async("jquery.tagclound", function() {
        $(document).ready(function() {
            $("#tag_cloud a").tagcloud({
                size: {
                    start: 1,
                    end: 1,
                    unit: "em"
                },
                color: {
                    start: "#a9d0f5",
                    end: "#ff3333"
                }
            });
        });
    });
});
