---
layout: post
title:  "利用css3制作ios7风格的应用图标"
date:   2014-04-22 10:17:59
categories: 
- Notes 
tags:
- Css3
cssurl: /assets/css/font-awesome.min.css
style: |
    /*Importing custom fonts*/
    @import url(http://fonts.googleapis.com/css?family=Montserrat);
    body{
        background:url(data:image/png;base64,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);
    }
    /* S - Demo1 */
    .icons i {
        display: block;
        font-size: 24px;
        line-height: 50px; width: 50px;
        text-align: center;
    }
    .icons a {
        text-decoration: none;
        color: white;
        display: inline-block;
        margin: 10px;
        border-radius: 12px;
        position: relative;
    }
    /*Now we will create fish-eye shapes using pseudo elements and clip them to add a curve to the sides of the icons*/
    .icons a:before, .icons a:after {
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
        z-index: -1;
    }
    /*duplicating the :before element and rotating it 90deg and swapping the X/Y transforms*/
    .icons a:after {
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
    .fs-demo3 .icons i {
        display: block;
        text-align: center;
        font-size: 48px;
        line-height: 100px; width: 100px; /*square*/
    }
    .fs-demo3 .icons a {
        display: inline-block;
        color: white;
        text-decoration: none;
        margin: 25px;
        border-radius: 32px;
        position: relative;
    }

    .fs-demo3 .icons a:before, .fs-demo3 .icons a:after {
        content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
        z-index: -1;
        border-radius: 100%;
        transform: scaleX(1.3) scaleY(1.075);
        clip: rect(0px, 72px, 100px, 28px);
        background: inherit;
    }
    .fs-demo3 .icons a:after { transform: scaleY(1.3) scaleX(1.075) rotate(90deg); }

    .fs-demo3 .twitter {background: hsl(197, 100%, 47%);}
    
    .fs-demo3 .icons .one {border-radius: 0;}
    .fs-demo3 .icons .one:before, .fs-demo3 .icons .one:after, .fs-demo3 .icons .two:before, .fs-demo3 .icons .two:after {content: none;}
    .fs-demo3 .icons .three:before {background: hsl(197, 100%, 47%);}
    .fs-demo3 .icons .three:after {clip: auto; background: hsl(150, 100%, 60%);}
    .fs-demo3 .icons .four:before {content: none;}
    .fs-demo3 .icons .four:after {background: hsl(150, 100%, 60%);}
    .fs-demo3 .icons .five:before {clip: auto; background: hsl(150, 100%, 60%);}
    .fs-demo3 .icons .six:before {clip: rect(0px, 72px, 100px, 28px); background: hsl(150, 100%, 60%);}
    /* E - Demo3 */

    /* S - Demo4 */
    .icons a, .icons a:before, .icons a:after {transition: all 0.25s; }

    .fs-demo4 .icons a:hover {transform: scale(0.70); border-radius: 0px;}
    .fs-demo4 .icons a:hover:before, .fs-demo4 .icons a:hover:after { transform: scale(0.5);}

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
    .fs-demo5 .icons a:hover { transform: scale(1.20); border-radius: 100%; }
    .fs-demo5 .icons a:hover:before, .fs-demo5 .icons a:hover:after { transform: scale(0.5); }
    /* E - Demo5 */

---

<script src="{{ site.url }}/assets/js/libs/prefixfree/1.0.3/prefixfree.min.js"></script>

本文意译自<a href="http://thecodeplayer.com/walkthrough/css3-squircles" target="_blank">Making iOS 7 squircles using CSS3</a>。

如果你有认真看过ios7的应用图标，你会发现它并不是普通的那种方形加圆角效果的图标，而是更接近圆形和方形的混血儿(我们可称之为Squircle)，在水平向和垂直向的圆角值并不一样。

本示例尝试使用css3实现类似的图标效果，利用元素的伪类结合css的clip属性来实现上述特殊的圆角效果。


### Squircle - 默认效果

<div class="fs-demo fs-demo1">
    <div class="icons">
        <a href="javascript:;" class="tw"><i class="fa fa-twitter"></i></a>
        <a href="javascript:;" class="fb"><i class="fa fa-facebook"></i></a>
        <a href="javascript:;" class="gp"><i class="fa fa-google-plus"></i></a>
        <a href="javascript:;" class="ig"><i class="fa fa-instagram"></i></a>
        <a href="javascript:;" class="li"><i class="fa fa-linkedin"></i></a>
        <a href="javascript:;" class="yt"><i class="fa fa-youtube"></i></a>
    </div>
</div>

### Squircle效果与传统圆角效果的对比

<div class="fs-demo fs-demo2">
    <div class="icons">
        <a href="javascript:;" class="fb rounded"><i class="fa fa-facebook"></i></a>
        <a href="javascript:;" class="fb squircle"><i class="fa fa-facebook"></i></a>
        <a href="javascript:;" class="yt rounded"><i class="fa fa-youtube"></i></a>
        <a href="javascript:;" class="yt squircle"><i class="fa fa-youtube"></i></a>
    </div>
</div>

### 实现过程图解

<div class="fs-demo fs-demo3">
    <div class="icons">
        <a href="javascript:;" class="twitter one"><i class="fa fa-twitter"></i></a>
        <a href="javascript:;" class="twitter two"><i class="fa fa-twitter"></i></a>
        <a href="javascript:;" class="twitter three"><i class="fa fa-twitter"></i></a>
        <a href="javascript:;" class="twitter four"><i class="fa fa-twitter"></i></a>
        <a href="javascript:;" class="twitter five"><i class="fa fa-twitter"></i></a>
        <a href="javascript:;" class="twitter six"><i class="fa fa-twitter"></i></a>
        <a href="javascript:;" class="twitter"><i class="fa fa-twitter"></i></a>
    </div>
</div>

### Hover效果 - 收缩(Pinch)

<div class="fs-demo fs-demo4">
    <div class="icons">
        <a href="#" class="tw"><i class="fa fa-twitter"></i></a>
        <a href="#" class="fb"><i class="fa fa-facebook"></i></a>
        <a href="#" class="gp"><i class="fa fa-google-plus"></i></a>
        <a href="#" class="ig"><i class="fa fa-instagram"></i></a>
        <a href="#" class="li"><i class="fa fa-linkedin"></i></a>
        <a href="#" class="yt"><i class="fa fa-youtube"></i></a>
    </div>
</div>

### Hover效果 - 放大至圆形

<div class="fs-demo fs-demo4 fs-demo5">
    <div class="icons">
        <a href="#" class="tw"><i class="fa fa-twitter"></i></a>
        <a href="#" class="fb"><i class="fa fa-facebook"></i></a>
        <a href="#" class="gp"><i class="fa fa-google-plus"></i></a>
        <a href="#" class="ig"><i class="fa fa-instagram"></i></a>
        <a href="#" class="li"><i class="fa fa-linkedin"></i></a>
        <a href="#" class="yt"><i class="fa fa-youtube"></i></a>
    </div>
</div>