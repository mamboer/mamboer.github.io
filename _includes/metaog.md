<meta property="og:title" content="{{ page.title }} | {{ site.author }}"/>
<meta property="og:url" content="{{ page.url }}"/>
<meta property="og:site_name" content="{{ site.name }}"/>
<meta property="og:image" content="http://faso.me/assets/img/resume/avatar.jpg"/>
<meta property="og:type" content="website"/>
{% if page.description %}
<meta property="og:description" content="{{page.description}}" />
{% else %}
<meta property="og:description" content="{{site.description}}" />
{% endif %}