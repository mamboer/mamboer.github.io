{% if page.comments %}

    {% if page.comments == "duoshuo" %}
        {% include duoshuo.md %}
    {% elsif page.comments == "disqus" %}
        {% include disqus.md %}
    {% else %}
        {% include weibowall.md %}
    {% endif %}

{% endif %}
