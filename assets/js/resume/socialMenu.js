(function($){

    //Top's social menu
    LV.SocialMenu = {
        _open: false,
        open: function(e) {
            if (this._open && !e) return;
            this._open = true;
            LV.Analytics.plus("share.hover");
            LV.Analytics.plus("share.hoverTotal");
            TweenMax.to("#twitter-widget-0", .3, {
                left: 0
            });
            TweenMax.to("#___plusone_0", .3, {
                left: 70
            });
        },
        close: function(e) {
            if (!this._open && !e) return;
            this._open = false;
            TweenMax.to("#twitter-widget-0", .3, {
                left: 0
            });
            TweenMax.to("#___plusone_0", .3, {
                left: 31
            });
        },
        maxX: 250,
        onmousemove: function(e) {
            if (e.y < 40) {
                if (e.x < this.maxX) {
                    this.open();
                } else {
                    this.close();
                }
            } else {
                this.close();
            }
        },
        init: function() {
            window.addEventListener("mousemove", this.onmousemove.bind(this), false);
        }
    };

})(jQuery);