---
title: FASO Tags
layout: page
---

<div id='tag_cloud' class="tagcloud">
{% for tag in site.tags %}
<a href="#tag-{{ tag[0] }}" title="{{ tag[0] }}" rel="{{ tag[1].size }}">{{ tag[0] }}</a>
{% endfor %}
</div>

<ul class="ilist">
{% for tag in site.tags %}
  <li class="ilist-seperator" id="tag-{{ tag[0] }}">{{ tag[0] }}</li>
{% for post in tag[1] %}
  <li class="ilist-item">
  <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
  <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%m-%d" }}</time>
  </li>
{% endfor %}
{% endfor %}
</ul>
<script>
    var seajsMod = {'mod':'cate'};
</script>