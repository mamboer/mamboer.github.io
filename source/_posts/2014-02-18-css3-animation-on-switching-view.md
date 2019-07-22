---
title:  "Css3动画 - 切换视图"
date:   2014-02-18 13:17:59
tags:
  - Css3
author:
  nick: LV主唱大人
  github_name: mamboer
style: |
    .c3toy-wrap {
        background: #1fc092;
        height:640px;
        position:relative;
        padding:10px 7px;
        line-height:normal;
        box-sizing:content-box;
        -webkit-box-sizing:content-box;
        -moz-box-sizing:content-box;
        font-size:12px;
    }
    .c3toy-wrap * {
        box-sizing:content-box;
        -webkit-box-sizing:content-box;
        -moz-box-sizing:content-box;
    }

    .c3toy-tit {
      color:white;
      width:240px;
      font-size:20px;
      text-align:center;
      margin:10px auto 20px;
    }

    .c3toy {
        background: #2c3e50;
        border-radius: 30px;
        left: 0;
        margin: 0 auto 0;
        padding: 70px 18px 68px 18px;
        position: absolute;
        right: 0;
        width: 240px;
    }

    .c3toy:before {
        background: #1f2b38;
        border-radius: 20px;
        content: '';
        height: 8px;
        left: 0;
        margin: -35px auto;
        position: absolute;
        right: 0;
        width: 45px;
    }

    .c3toy:after {
        background: #1f2b38;
        border-radius: 20px;
        content: "";
        display: block;
        height: 42px;
        left: 0;
        margin: 12px auto;
        position: absolute;
        right: 0;
        width: 42px;
    }

    .c3toy-screen {
        background: #d6e6e9;
        -webkit-perspective: 800px;
        -moz-perspective: 800px;
        -o-perspective: 800px;
        perspective: 800px;
        height: 400px;
        overflow: hidden;
        padding: 0;
        position: relative;
        width: 240px;
    }

    .c3toy-viewport {
        -webkit-transition: all .4s;
        -moz-transition: all .4s;
        -o-transition: all .4s;
        transition: all .4s;
        background: #d6e6e9;
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .c3toy-first {
        z-index: 2;
        left: 0;
        -webkit-transform-origin: 0% 0%;
        -webkit-transform: rotateY(0deg);
        -moz-transform-origin: 0% 0%;
        -moz-transform: rotateY(0deg);
    }

    .c3toy-last {
        z-index: 1;
        top: 400px;
    }

    .c3toy-animate .c3toy-last {
        top: 0;
    }

    .c3toy-animate .c3toy-first {
        -webkit-transform: rotateY(110deg);
        -moz-transform: rotateY(110deg);
    }

    .c3toy-last .c3toy-image {
        left: 240px;
        -webkit-transition-delay: 0.2s;
        -o-transition-delay: 0.2s;
        transition-delay: 0.2s;
    }

    .c3toy-last .c3toy-text {
        left: -240px;
        -webkit-transition-delay: 0.3s;
        -o-transition-delay: 0.3s;
        transition-delay: 0.3s;
    }

    .c3toy-last .c3toy-comment {
        bottom: -150px;
        -webkit-transition-delay: 0.4s;
        -o-transition-delay: 0.4s;
        transition-delay: 0.4s;
    }

    .c3toy-animate .c3toy-last .c3toy-image {
        left: 0;
    }

    .c3toy-animate .c3toy-last .c3toy-text {
        left: 0;
    }

    .c3toy-animate .c3toy-last .c3toy-comment {
        bottom: 0;
    }

    .c3toy-header {
        color: #ddebee;
        background: #55b5c9;
        font-weight: bold;
        width: 100%;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        padding: 15px;
        text-transform: uppercase;
        font-size: 14px;
    }

    .c3toy-header span {
        float: right;
        background: #ddebee;
        color: #55b5c9;
        font-size: 11px;
        padding: 5px;
        margin-top: -3px;
        cursor: pointer;
    }

    .c3toy-content {
        width: 100%;
        height: 150px;  
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        padding: 15px;
    }

    .c3toy-box {
        margin: 0 0 15px;
        width: 100%;
        position:relative;
        background: #fcffff;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
          -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;
        padding: 15px;
    }

    .c3toy-image {
        font-size: 72px;
        color: #a9c8d8;
        text-align: center;
        line-height: 1;
    }

    .c3toy-text {
        color: #bbe3c1;
        word-break:break-all;
        padding: 15px 15px 5px 15px;
    }

    .c3toy-comment {
        overflow: hidden;
        padding: 0;
        background: #d6e6e9;
    }

    .c3toy-avatar {
        float: left;
        overflow: hidden;
        width: 45px;
        height: 45px;
        background: white;
        border-radius: 50%;
        color: #94d9ec;
        font-size: 32px;
        text-align: center;
        line-height: 70px;
    }

    .c3toy-bubble {
        position: relative;
        float: right;
        width: 150px;
        height: 45px;
        background: white;
    }

    .c3toy-bubble:after {
        content: "";
        position: absolute;
        border-style: solid;
        display: block;
        width: 0;
        top: 14px;
        margin-left: -8px;
        bottom: auto;
        border-width: 8px 8px 8px 0px;
        border-color: transparent white;
    }

    .c3toy-second .c3toy-avatar {
        float: right;
    }

    .c3toy-second .c3toy-bubble {
        float: left;
    }

    .c3toy-second .c3toy-bubble:after {
        right: -8px;
        margin-left: 0;
        border-width: 8px 0px 8px 8px;
    }

---

<div class="user-code c3toy-wrap">
    <h3 class='c3toy-tit'>点击 '下一篇' 体验!</h3>
    <div class='c3toy' id='phone'>
      <div class='c3toy-screen' id='screen'>
        <div class='c3toy-viewport c3toy-first'>
          <div class='c3toy-header'>
            文章标题A..
            <span id='next1'>下一篇</span>
          </div>
          <div class='c3toy-content'>
            <div class='c3toy-box c3toy-image'>
              <i class='icon-picture'></i>
            </div>
            <div class='c3toy-box c3toy-text'>&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;</div>
            <div class='c3toy-box c3toy-comment'>
              <div class='c3toy-avatar'>
                <i class='icon-user'></i>
              </div>
              <div class='c3toy-bubble'></div>
            </div>
            <div class='c3toy-box c3toy-comment c3toy-second'>
              <div class='c3toy-avatar'>
                <i class='icon-user'></i>
              </div>
              <div class='c3toy-bubble'></div>
            </div>
          </div>
        </div>
        <div class='c3toy-viewport c3toy-last'>
          <div class='c3toy-header'>
            文章标题2..
            <span id='next2'>上一篇</span>
          </div>
          <div class='c3toy-content'>
            <div class='c3toy-box c3toy-image'>
              <i class='icon-truck'></i>
            </div>
            <div class='c3toy-box c3toy-text'>&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;&#9600;</div>
            <div class='c3toy-box c3toy-comment'>
              <div class='c3toy-avatar'>
                <i class='icon-user'></i>
              </div>
              <div class='c3toy-bubble'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
<script>
    window.onload = function(){
      $("#next1").click(function(){
          $("#screen").addClass("c3toy-animate");
      });
      $("#next2").click(function(){
          $("#screen").removeClass("c3toy-animate");
      });
    };
</script>

### gist

<a href="https://gist.github.com/mamboer/10843361" target="_blank">Css3-animation-for-switching-view.markdown</a>
