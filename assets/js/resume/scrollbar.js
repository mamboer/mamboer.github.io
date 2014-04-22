(function($){

    LV.Scrollbar = {
        $el: $("#scrollbar"),
        contentHeight: 0,
        innerHeight: 0,
        $target: null,
        height: 40,
        percent: 0,
        top: 0,
        hide: function() {
            TweenMax.killTweensOf("#scrollbar");
            TweenMax.to("#scrollbar", .4, {
                opacity: 0
            });
        },
        show: function() {
            TweenMax.killTweensOf("#scrollbar");
            this.$el.css({
                opacity: 1
            });
        },
        init: function(e, t) {
            this.$target = $(e);
            this.contentHeight = this.$target[0].scrollHeight;
            this.targetHeight = this.$target.height();
            this.innerHeight = this.contentHeight - this.targetHeight;
            for (key in t) {
                this[key] = t[key]
            }
            this.$el.css({
                height: this.height
            });
        },
        update: function(e) {
            if (e == 0) LV.Scrollbar.hide();
            this.top = e;
            this.percent = e / this.innerHeight;
            var t = -Math.round(this.percent * this.height);
            this.$el.css({
                top: Math.round(this.percent * 100) + "%",
                marginTop: t
            });
        }
    };

})(jQuery);