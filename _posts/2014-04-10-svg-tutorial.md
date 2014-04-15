---
layout: post
title:  "SVG教程-创建基本的图形"
date:   2014-04-10 20:17:59
categories: 
- Notes 
tags:
- SVG
style: |

  svg{background:#eee;}

---

注:本文翻译自<a href="http://www.1stwebdesigner.com/css/svg-tutorial/" target="_blank" title="Creating Shapes with SVG : An SVG Tutorial">Creating Shapes with SVG : An SVG Tutorial</a>

用过SVG格式的图片咩？本教程可助你更深入地了解和使用SVG图片。
在过去，浏览器支持的图片格式是CompuServe公司研制的GIF，接着是JPEG，相对于GIF来说，JPEG压缩率更高尺寸更小质量却没多大损耗。

过了一段时间，随着互联网二维矢量电脑图形技术的发展，应运而生的各种图片格式争相被提交至W3C，而研制于1999年的SVG则是其中一种。

### 什么是SVG？

SVG（Scalable Vector Graphics的缩写，即可伸缩矢量图形），是一种专为网页而设计的基于XML的矢量图片格式。和GIF、PNG和JPEG图片不一样，SVG格式的图片是可缩放的，不管你如何缩小或者拉伸图片，它的质量都不会有损耗。

另外，作为一种XML文件，意味着SVG图片可以使用任意的文本编辑器来创建、修改，同时适用W3C的一些技术标准例如DOM、XSL。

### 为什么使用SVG？

* 可以用任何文本编辑器进行创建和编辑
* 可以高分辨率打印
* 可用于动画
* W3C推荐
* 适用其他W3C标准例如DOM
* retina屏幕下表现出色
* 缩放自如且没有质量损耗

### HTML网页中的SVG

SVG图片可以通过svg标签非常方便地内嵌到HTML网页中去。例如：

{% highlight html %}

<svg width="xx" height="yy">
    [svg图片内嵌元素的具体代码]
</svg>

{% endhighlight html %}

如你所见，在html中，SVG图片有它自己的标签，且svg标签须带有width(宽)和height(高)属性以便包含其他内嵌元素。以下这些元素可用于在SVG画布内绘制对应的图形：

* Circle (圆形)
* Rectangle (矩形)
* Ellipse (椭圆形)
* Line (直线)
* Polyline (折线)
* Polygon (多边形)
* Path (路径)
* Text (文本)

我们下文会对这些元素分别进行介绍说明，所以如果你以前没用过SVG，本文是一个不错的开始，除了介绍什么是SVG，它还可以教会你利用基本的XML来绘制基础的SVG图形。闲话少说，我们直接进入教程主题吧。

### 创建圆形

利用circle标签绘制SVG圆形，如下：

{% highlight html %}

<svg height="120" width="120">
    <circle cx="60" cy="60" r="50" style="fill: blue; stroke: black; stroke-width: 2px;" />
</svg>

{% endhighlight html %}

示例效果如下：

<svg height="120" width="120">
    <circle cx="60" cy="60" r="50" style="fill: blue; stroke: black; stroke-width: 2px;" />
</svg>

在这个示例中，我们使用cx属性和cy属性分别定义了圆心的x坐标和y坐标，接着使用r属性设置了圆形的半径，最后利用style属性设置圆形的填充颜色、边框颜色、边框宽度。这些属性都很简单，不言自明。

### 创建矩形



### 利用SVG创建一个椭圆形

### 利用SVG创建一条直线

### 利用SVG创建一条折线

### 利用SVG创建一个多边形

### 利用SVG创建路径

### 利用SVG创建文字

### 在Adobe Illustrator中创建SVG图形

### 总结