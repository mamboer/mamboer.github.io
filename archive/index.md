---
layout: default 
title: Archive
---

<ul class="ilist">
{% for post in site.posts %}
  {% capture y %}{{post.date | date:"%Y"}}{% endcapture %}
  {% if year != y %}
  {% assign year = y %}
  <li class="ilist-seperator">{{ y }}</li>
  {% endif %}
  <li class="ilist-item">
  <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
  <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%m-%d" }}</time>
  </li>
{% endfor %}
</ul>