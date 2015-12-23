---
title:  "利用css3制作ios7风格的应用图标"
date:   2014-04-22 10:17:59
tags:
  - Css3
author:
  nick: LV主唱大人
  github_name: mamboer
style: |
    /*Importing custom fonts*/
    @import url(http://fonts.googleapis.com/css?family=Montserrat);
    /* S - Demo1 */
    .demo-icons i {
        display: block;
        font-size: 24px;
        line-height: 50px;
        width: 50px;
        text-align: center;
        position: relative;
        z-index:2;
    }
    .demo-icons br {
      display:none;
      width:0px;
      height:0px;
    }
    .demo-icons a {
        text-decoration: none;
        color: white;
        display: inline-block;
        float:left;
        margin: 10px;
        border-radius: 12px;
        position: relative;
        border: none;
    }
    /*Now we will create fish-eye shapes using pseudo elements and clip them to add a curve to the sides of the icons*/
    .demo-icons a:before, .demo-icons a:after {
        content: '';
        position: absolute; left: 0; top: 0;
        width: 100%; height: 100%;
        background: inherit;
        border-radius: 100%; /*circle*/
        /*time to transform the circle into fish-eye shape. iOS7 style now.*/
        transform: scaleX(2) scaleY(1.05);
        /*clipping the left and right sides - 17px from the left and right*/
        clip: rect(0, 33px, 50px, 17px);
        /*pushing it behind the icon*/
        z-index: 1;
    }
    /*duplicating the :before element and rotating it 90deg and swapping the X/Y transforms*/
    .demo-icons a:after {
        transform: scaleY(2) scaleX(1.05) rotate(90deg);
    }
    /*colors*/
    .tw {background: #00ACF0;}
    .fb {background: #3B5997;}
    .gp {background: #DB4F48;}
    .ig {background: #447397;}
    .li {background: #007DB8;}
    .yt {background: #D12E2E;}

    /* E - Demo1 */

    /* S - Demo2 */
    .rounded:before, .rounded:after {display: none;}
    /* E - Demo2 */

    /* S - Demo3 */
    .fs-demo3 .demo-icons i {
        display: block;
        text-align: center;
        font-size: 48px;
        line-height: 100px; width: 100px; /*square*/
        border-radius: 32px;
        background: hsl(197, 100%, 47%);
    }
    .fs-demo3 .demo-icons a {
        display: inline-block;
        color: white;
        text-decoration: none;
        margin: 25px;
        position: relative;
    }

    .fs-demo3 .demo-icons a:before, .fs-demo3 .demo-icons a:after {
        content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        z-index: 1;
        border-radius: 100%;
        transform: scaleX(1.3) scaleY(1.075);
        clip: rect(0px, 72px, 100px, 28px);
        background: hsl(197, 100%, 47%);;
    }
    .fs-demo3 .demo-icons a:after { transform: scaleY(1.3) scaleX(1.075) rotate(90deg); }

    .fs-demo3 .demo-icons .one i{border-radius: 0;}
    .fs-demo3 .demo-icons .one:before, .fs-demo3 .demo-icons .one:after, .fs-demo3 .demo-icons .two:before, .fs-demo3 .demo-icons .two:after {content: none;}
    .fs-demo3 .demo-icons .three:before {background: hsl(197, 100%, 47%);}
    .fs-demo3 .demo-icons .three:after {clip: auto; background: hsl(150, 100%, 60%);}
    .fs-demo3 .demo-icons .four:before {content: none;}
    .fs-demo3 .demo-icons .four:after {background: hsl(150, 100%, 60%);}
    .fs-demo3 .demo-icons .five:before {clip: auto; background: hsl(150, 100%, 60%);}
    .fs-demo3 .demo-icons .six:before {clip: rect(0px, 72px, 100px, 28px); background: hsl(150, 100%, 60%);}
    /* E - Demo3 */

    /* S - Demo4 */
    .demo-icons a, .demo-icons a:before, .demo-icons a:after {transition: all 0.25s; }

    .fs-demo4 .demo-icons a:hover {transform: scale(0.70); border-radius: 0px;}
    .fs-demo4 .demo-icons a:hover:before, .fs-demo4 .demo-icons a:hover:after { transform: scale(0.5);}

    .fs-demo4 .tw, .fs-demo4 .tw:before, .fs-demo4 .tw:after {background: hsl(197, 100%, 47%);}
    .fs-demo4 .tw:hover, .fs-demo4 .tw:hover:before, .fs-demo4 .tw:hover:after {background: hsl(197, 100%, 27%); }

    .fs-demo4 .fb, .fs-demo4 .fb:before, .fs-demo4 .fb:after {background: hsl(220, 44%, 41%);}
    .fs-demo4 .fb:hover, .fs-demo4 .fb:hover:before, .fs-demo4 .fb:hover:after {background: hsl(220, 44%, 21%);}

    .fs-demo4 .gp, .fs-demo4 .gp:before, .fs-demo4 .gp:after {background: hsl(3, 67%, 57%);}
    .fs-demo4 .gp:hover, .fs-demo4 .gp:hover:before, .fs-demo4 .gp:hover:after {background: hsl(3, 67%, 37%);}

    .fs-demo4 .ig, .fs-demo4 .ig:before, .fs-demo4 .ig:after {background: hsl(206, 38%, 43%);}
    .fs-demo4 .ig:hover, .fs-demo4 .ig:hover:before, .fs-demo4 .ig:hover:after {background: hsl(206, 38%, 23%);}

    .fs-demo4 .yt, .fs-demo4 .yt:before, .fs-demo4 .yt:after {background: hsl(360, 64%, 50%);}
    .fs-demo4 .yt:hover, .fs-demo4 .yt:hover:before, .fs-demo4 .yt:hover:after {background: hsl(360, 64%, 30%);}

    .fs-demo4 .li, .fs-demo4 .li:before, .fs-demo4 .li:after {background: hsl(199, 100%, 36%);}
    .fs-demo4 .li:hover, .fs-demo4 .li:hover:before, .fs-demo4 .li:hover:after {background: hsl(199, 100%, 16%);}

    /* E - Demo4 */

    /* S - Demo5 */
    .fs-demo5 .demo-icons a:hover { transform: scale(1.20); border-radius: 100%; }
    .fs-demo5 .demo-icons a:hover:before, .fs-demo5 .demo-icons a:hover:after { transform: scale(0.5); }
    /* E - Demo5 */

---

<script src="/assets/js/libs/prefixfree/1.0.3/prefixfree.min.js"></script>

本文意译自<a href="http://thecodeplayer.com/walkthrough/css3-squircles" target="_blank">Making iOS 7 squircles using CSS3</a>。

如果你有认真看过ios7的应用图标，你会发现它并不是普通的那种方形加圆角效果的图标，而是更接近圆形和方形的混血儿(我们可称之为Squircle)，在水平向和垂直向的圆角值并不一样。

本示例尝试使用css3实现类似的图标效果，利用元素的伪类结合css的clip属性来实现上述特殊的圆角效果。


## Squircle - 默认效果

<div class="fs-demo fs-demo1">
    <div class="demo-icons clearfix">
        <a href="javascript:;" class="tw"><i class="fa fa-twitter"></i></a>
        <a href="javascript:;" class="fb"><i class="fa fa-facebook"></i></a>
        <a href="javascript:;" class="gp"><i class="fa fa-google-plus"></i></a>
        <a href="javascript:;" class="ig"><i class="fa fa-instagram"></i></a>
        <a href="javascript:;" class="li"><i class="fa fa-linkedin"></i></a>
        <a href="javascript:;" class="yt"><i class="fa fa-youtube"></i></a>
    </div>
</div>

## Squircle效果与传统圆角效果的对比

<div class="fs-demo fs-demo2">
    <div class="demo-icons clearfix">
        <a href="javascript:;" class="fb rounded"><i class="fa fa-facebook"></i></a>
        <a href="javascript:;" class="fb squircle"><i class="fa fa-facebook"></i></a>
        <a href="javascript:;" class="yt rounded"><i class="fa fa-youtube"></i></a>
        <a href="javascript:;" class="yt squircle"><i class="fa fa-youtube"></i></a>
    </div>
</div>

## 实现过程图解

<div class="fs-demo fs-demo3">
    <div class="demo-icons clearfix">
        <a href="javascript:;" class="twitter one"><i class="fa fa-twitter"></i></a>
        <a href="javascript:;" class="twitter two"><i class="fa fa-twitter"></i></a>
        <a href="javascript:;" class="twitter three"><i class="fa fa-twitter"></i></a>
        <a href="javascript:;" class="twitter four"><i class="fa fa-twitter"></i></a>
        <a href="javascript:;" class="twitter five"><i class="fa fa-twitter"></i></a>
        <a href="javascript:;" class="twitter six"><i class="fa fa-twitter"></i></a>
        <a href="javascript:;" class="twitter"><i class="fa fa-twitter"></i></a>
    </div>
</div>

## Hover效果 - 收缩(Pinch)

<div class="fs-demo fs-demo4">
    <div class="demo-icons clearfix">
        <a href="#" class="tw"><i class="fa fa-twitter"></i></a>
        <a href="#" class="fb"><i class="fa fa-facebook"></i></a>
        <a href="#" class="gp"><i class="fa fa-google-plus"></i></a>
        <a href="#" class="ig"><i class="fa fa-instagram"></i></a>
        <a href="#" class="li"><i class="fa fa-linkedin"></i></a>
        <a href="#" class="yt"><i class="fa fa-youtube"></i></a>
    </div>
</div>

## Hover效果 - 放大至圆形

<div class="fs-demo fs-demo4 fs-demo5">
    <div class="demo-icons clearfix">
        <a href="#" class="tw"><i class="fa fa-twitter"></i></a>
        <a href="#" class="fb"><i class="fa fa-facebook"></i></a>
        <a href="#" class="gp"><i class="fa fa-google-plus"></i></a>
        <a href="#" class="ig"><i class="fa fa-instagram"></i></a>
        <a href="#" class="li"><i class="fa fa-linkedin"></i></a>
        <a href="#" class="yt"><i class="fa fa-youtube"></i></a>
    </div>
</div>
