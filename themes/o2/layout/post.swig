{% extends '_layout.swig' %}

{% block page_class %}page-post-detail{% endblock %}

{% block main %}
<div class="container post-wrap">
    {% set author = page.author|default({github_name:config.github.user, nick:config.author}) %}
    {{ partial('partial/post/main', {post:page, author: author}) }}
    {% include 'partial/footer.swig' %}
</div>
{% endblock %}
