title: "Javascript性能优化法则"
subtitle: "暖妹子（微信号：AOTULabs）的一篇『前端性能不完全指南』在业界好评如潮，本期凹凸实验室自然是趁热打铁，依然围绕着性能优化的话题，为大家梳理一下Javascript的性能优化法则。"
cover: mamboer/git-flow.jpg
date: 2016-03-23 09:44:25
tags:
  - Javascript
  - NodeJS
  - Performance
  - Optimization
author:
  nick: LV主唱大人
  github_name: mamboer

---

暖妹子（微信号：AOTULabs）的一篇『[前端性能不完全指南](http://aotu.io/notes/2016/03/16/optimization/)』在业界好评如潮，前有出版社联系出书，后有阿里某前端团队伸出的橄榄枝，已然一代前端网红棒棒嗒^V^。如果上天给我一个单身的机会，我想我会找暖妹子的BF抽根烟聊聊人生的咳咳～
而关于我的这篇文章，还是接着性能优化的话题，为大家深入梳理下Javascript的性能优化方法，这些方法同样适用于Server端的NodeJS。其实网路上已经有很多很多这样的文章了，除了无偿的搬运，我会努力在他们的理论基础上加以Demo佐证。在文章的最后，这一切浓缩成一张A4纸大小的Cheat Sheet，欢迎分享传阅。

<!-- more -->

## Rule 1 利用原型链来定义类的方法

下面的代码示例是一个反面案例，在类`baz.Bar`的构造器里面定义方法`foo`，会导致每次实例化`baz.Bar`时

## 提交
git tracked的是修改，而不是文件

![git-track](/img/post/mamboer/git-trees.jpg)

    #将“当前修改”移动到暂存区(stage)
    $ git add somfile.txt
    #将暂存区修改提交
    $ git commit -m "Add somfile.txt."

## 状态
    $ git status
    $ git diff

## 回退
    # 放弃工作区修改
    $ git checkout -- file.name
    $ git checkout -- .

    # 取消commit(比如需要重写commit信息)
    $ git reset --soft HEAD

    # 取消commit、add(重新提交代码和commit)
    $ git reset HEAD
    $ git reset --mixed HEAD

    # 取消commit、add、工作区修改(需要完全重置)
    $ git reset --hard HEAD

## 记录
    $ git reflog
    $ git log

## 删除
    $ rm file.name
    $ git rm file.name
    $ git commit -m "Del"

## 远程操作
    $ git remote add origin git@github.com:michaelliao/learngit.git
    # 第一次推送，-u(--set-upstream)指定默认上游
    $ git push -u origin master
    $ git push origin master

## 克隆
    $ git clone https://github.com/Yikun/yikun.github.com.git path
    $ git clone git@github.com:Yikun/yikun.github.com.git path


## 分支操作

![about-merge](/img/post/mamboer/git-merge.png)

    # 查看当前分支
    $ git branch

    # 创建分支
    $ git branch dev
    # 切换分支
    $ git checkout dev

    # 创建并checkout分支
    $ git checkout -b dev

    # 合并分支
    $ git merge dev

    # 删除分支
    $ git branch -d dev

## 标签
    $ git tag 0.1.1
    $ git push origin --tags

注意：本文Fork自 [yikun.github.io](http://yikun.github.io/)，[凹凸实验室](http://aotu.io)作进一步完善。

git clone https://github.com/madeye/shadowsocks-libev.git
cd shadowsocks-libev
./configure
make && make install

{
    "server":"servier_ip",
    "server_port":65432,
    "password":"password",
    "timeout":60,
    "method":"rc4-md5"
}

echo "/usr/local/bin/ss-server -c /home/***/config.json -f /tmp/ss-server.pid" >> /etc/rc.local

vi /etc/rc.local

# 在配置文件后加上服务器配置信息
[inet_http_server]
port = 127.0.0.1:9001
username = user
password = 123

# 最后不要忘了reload使之生效！
supervisorctl reload
