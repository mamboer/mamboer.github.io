---
title:  "绑定域名到Github"
date:   2013-09-09 11:17:59
tags:
  - Github
author:
  nick: LV主唱大人
  github_name: mamboer

---


本文以域名<a href="http://faso.me" target="_blank">FASO.ME</a>绑定至github仓库mamboer.github.io做为示例。
<div class="user-code">
<h2>CNAME</h2>

<p>创建一个CNAME文件，内容是你的域名，如：</p>

<p><code>
faso.me
</code></p>

<p>然后把此文件添加到Github仓库，上传到Github。</p>

<h2>DNS</h2>

<p>登陆你的域名管理界面。创建一条A记录，指向<code>204.232.175.78</code>这个IP地址。</p>

<h2>子域名转发</h2>

<p>我以<code>j.faso.me</code>为示例，指向仓库xo：mamboer.github.io/j。</p>

<p>我需要做的设置：</p>

<ul>
<li>在域名管理界面，找到子域名转发配置</li>
<li>在转发配置界面中，添加转发记录<code>j.faso.me -&gt; mamboer.github.io/j</code>。</li>
</ul>
</div>
