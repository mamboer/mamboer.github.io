---
title: FASO Categories
layout: page
---

<div id='tag_cloud' class="tagcloud">
{% for cat in site.categories %}
<a href="#cat-{{ cat[0] }}" title="{{ cat[0] }}" rel="{{ cat[1].size }}">{{ cat[0] }} ({{ cat[1].size }})</a>
{% endfor %}
</div>

<ul class="ilist">
{% for cat in site.categories %}
  <li class="ilist-seperator" id="cat-{{ cat[0] }}">{{ cat[0] }}</li>
{% for post in cat[1] %}
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