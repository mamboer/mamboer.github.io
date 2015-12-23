<div class="sec sec-cases">
    <div class="container">
        <div class="sec-heading">
            <h2 class="sec-heading-main">{{ __('index.cases') }}</h2>
            <p class="sec-heading-sub">{{ __('index.cases_desc') }}</p>
        </div>
    </div>
    <div class="container">
        <div class="cases clearfix">
            {% set items = _.take(_.sortBy(site.data['cases'], 'name'), 12) %}
            {% for item in items %}
            {{ partial('partial/case/item.swig', {item: item}) }}
            {% endfor %}
        </div>
    </div>
</div>
