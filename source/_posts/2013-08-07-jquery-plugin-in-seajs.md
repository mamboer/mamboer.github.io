---
title:  "SeaJs中使用jquery插件"
date:   2013-08-07 00:16:02
tags:
  - SeaJs
author:
  nick: LV主唱大人
  github_name: mamboer
---

## 首先，将js插件cmd模块化

define封装成seajs模块，返回匿名函数，包含插件的源码

``` js
/**
 * Created with JetBrains PhpStorm.
 * User: levin
 * To change this template use File | Settings | File Templates.
 */
define(function(require,exports,moudles){
     return function(jquery){
         (function($) {
             $.fn.pri= function() {
                 alert($("a").attr("href"))
                 // 代码区域。
             };
         })(jquery);
     }

})
```

## 其次jquery库在总js文件（调用该插件的文件）中加载

通过require("t1/jquery_pligun")($)来传递jquery变量（$参数） ,保证了jquery在调用js插件模块之前加载

``` js
/**
 * Created with JetBrains PhpStorm.
 * User: levin
 * To change this template use File | Settings | File Templates.
 */
define(function (require, exports, moudles) {
    var $=require("jquery")
    require("t1/jquery_pligun")($)
    $(document).ready(function () {
        $("a").pri()
    })


})
```

* [seajs-jquery](https://github.com/breakfriday/seajs-jquery) (seajs-jquery)
