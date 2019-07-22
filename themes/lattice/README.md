# lattice

The most beautiful theme for Hexo, flat and delicate.

[Preview](http://faso.me/)

![Lattice](https://cdn.rawgit.com/mamboer/mamboer.github.io/dev/themes/lattice/preview.jpg "lattice")

## Installation

### Install

``` bash
$ git clone https://github.com/mamboer/hexo-theme-lattice.git themes/lattice
```

**Hueman requires Hexo 3.0.0 and above.**

### Enable

Modify `theme` setting in `_config.yml` to `lattice`.

### Update

``` bash
cd themes/lattice
git pull
```

## Features

### Disqus

In your hexo site's configuration (not the theme's configuration).

```yml
# disqus
disqus_shortname: "your disqus shortname"
```

### Gitalk

You can visit https://github.com/gitalk/gitalk for more details

```yml
gitalk:
  owner: o2team
  repo: o2team.github.io
  client_id: 3c4d153e6874260f9c7e
  client_secret: dd44012504c6168bc05b9266e0554bb28c62ce15
```

### Google Analytics

In your hexo site's configuration,

```yml
google_analytics: "your GA ID"
```

### Baidu Analytics

For Chinese, in your hexo site's configuration,

```yml
baidu_analytics: "your BA ID"
```

### Tencent Analytics

For more details about [Tencent Analytics](https://ta.qq.com)

```yml
ta_analytics: "your TA ID"
```

### Code highlight theme

In o2 theme's configuration,

```yml
# Code Highlight theme
# Available value:
#    normal | night | eighties | blue | bright
# https://github.com/chriskempson/tomorrow-theme
highlight_theme: normal
```

### Custom Logo

In o2 theme's configuration, you can specify your own logo picture.

```yml
logo:
  url: img/logo-square-120.png
```

### Custom Post Cover and Post Asset Folder

In o2 theme's configuration,

```yml
post:
  cover: post-default.png
  img_dir: img/post/
  raw_link: https://github.com/o2team/o2team.github.io/edit/master/source/
```

### Custom Tag - 'tag_cfg'

`tag_cfg` let your access to your site's configuration in your posts.

For example, we can insert the config's description field into a post.

```
{% tag_cfg description %}
```

### Menu

Place your menu data into the `_data` folder of your hexo site.

[Example menu data](https://github.com/o2team/o2team.github.io/blob/hexo/source/_data/menu.yml)

### Lunr (O2 Specially)

O2 uses the 'hexo-generator-lunr' plugin to implement client-side full text search.

In your hexo site's configuration,

```yml
# lunr
lunr:
  field: all
  path: assets/lunr/
```

For more details about [hexo-generator-lunr](o2team/hexo-generator-lunr)

## Languages

English and Simplified Chinese are the default languages of the theme. You can add translations in the `languages` folder and change the default language in blog's `_config.yml`.

``` yml
language: zh-CN
```

## Development

### Requirements

- Hexo 3.0+
- lodash
- cheerio
- hexo-filter-cleanup
- hexo-generator-baidu-sitemap
- hexo-generator-fragments
- hexo-generator-json-feed
- hexo-generator-lunr
- hexo-generator-xfeed
- hexo-renderer-stylus
- lunr
- blueimp-md5

[Hexo]: http://hexo.io/
[Font Awesome]: http://fontawesome.io/
[Aotu.io]: http://aotu.io/
