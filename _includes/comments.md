{% if page.comments %}

    {% if page.comments == "duoshuo" %}
        {% include duoshuo.md %}
    {% else %}
        {% include weibowall.md %}
    {% endif %}

{% endif %}
