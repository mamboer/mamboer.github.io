<div class="sec sec-dark sec-follow">
    <div class="sec-bg sec-bg1"></div>
    <div class="sec-bg sec-bg2"></div>
    <div class="container">
        <div class="sec-heading">
            <h2 class="sec-heading-main">{{ __('site.follow_us') }}</h2>
            <p class="follow-pic"><img src="{{ url_for('img/qrcode.png') }}" alt="{{ __('site.follow_us') }}"/></p>
            <p class="follow-desc">{{ config.wechat.desc|default(theme.wechat.desc) }}</p>
            <p class="sec-heading-sub follow-acount">
                <img class="follow-icon" src="{{ url_for(config.logo_url) }}" alt="AOTULabs"/> {{ __('site.wechat') }}：AOTULabs
            </p>
        </div>
    </div>
</div>
