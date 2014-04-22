(function($){

    LV.MobileMenu = {
        showing: false,
        show: function() {
            if (this.showing) return;
            this.showing = true;
            LV.Analytics.plus("menu.viewed");
            LV.Analytics.plus("menu.totalViews");
            $("#mobile-menu").css("visibility", "visible");
            TweenMax.to("#mm-bg", .4, {
                top: "0%",
                ease: Quad.easeOut
            });
            TweenMax.to("#mm-top-bar", .2, {
                delay: .4,
                top: 0,
                ease: Quad.easeOut
            });
            var e = 0;
            this.$items.each(function() {
                TweenMax.to($(this), .4, {
                    delay: e * .1 * .7,
                    top: "0%",
                    ease: Quad.easeOut
                });
                e++
            });
            TweenMax.to("#mm-social-bar", .5, {
                delay: .5,
                bottom: 10,
                ease: Back.easeOut,
                onComplete: function() {
                    LV.MobileMenu.busy = false;
                }
            })
        },
        hide: function(e) {
            if (!this.showing) return;
            this.showing = false;
            if (LV.MobileLightbox.showing) LV.MobileLightbox.hide();
            TweenMax.to("#mm-top-bar", .1, {
                top: -25
            });
            var t = 0;
            this.$items.each(function() {
                TweenMax.to($(this), .3, {
                    delay: t * .1 * .7,
                    top: "-100%",
                    ease: Quad.easeOut
                });
                t++
            });
            TweenMax.to("#mm-bg", .5, {
                delay: .7,
                top: "-100%",
                ease: Quad.easeOut,
                onComplete: function() {
                    LV.MobileMenu.busy = false;
                    $("#mobile-menu").css("visibility", "hidden");
                    TweenMax.set("#mm-bg", {
                        top: "100%"
                    });
                    TweenMax.set("#mm-top-bar", {
                        top: -25
                    });
                    TweenMax.set("#mm-social-bar", {
                        bottom: -205
                    });
                    LV.MobileMenu.$items.css({
                        top: "100%"
                    });
                    if (e) e();
                }
            });
            TweenMax.to("#mm-social-bar", .3, {
                delay: .5,
                bottom: "100%"
            })
        },
        $items: null,
        init: function() {
            this.$items = $(".mm-item");
            $("#mm-home").click(function(e) {
                LV.MobileMenu.hide(function() {
                    LV.Scroll.to(0);
                    LV.Analytics.plus("menu.used");
                    LV.Analytics.plus("menu.home")
                });
            });
            $("#mm-work").click(function(e) {
                LV.MobileMenu.hide(function() {
                    LV.Scroll.to(LV.Scroll.points.work);
                    LV.Analytics.plus("menu.used");
                    LV.Analytics.plus("menu.work")
                });
            });
            $("#mm-life").click(function(e) {
                LV.MobileMenu.hide(function() {
                    LV.Scroll.to(LV.Scroll.points.life);
                    LV.Analytics.plus("menu.used");
                    LV.Analytics.plus("menu.life")
                });
            });
            $("#mm-software").click(function(e) {
                LV.MobileMenu.hide(function() {
                    LV.Scroll.to(LV.Scroll.points.software);
                    LV.Analytics.plus("menu.used");
                    LV.Analytics.plus("menu.software")
                });
            });
            $("#mm-coding").click(function(e) {
                LV.MobileMenu.hide(function() {
                    LV.Scroll.to(LV.Scroll.points.coding);
                    LV.Analytics.plus("menu.used");
                    LV.Analytics.plus("menu.coding");
                });
            });
            $("#mm-contact").click(function(e) {
                LV.MobileMenu.hide(function() {
                    LV.Scroll.to(LV.Scroll.points.contact);
                    LV.Analytics.plus("menu.used");
                    LV.Analytics.plus("menu.contact");
                });
            });
            $("#mm-career").click(function(e) {
                LV.MobileMenu.hide(function() {
                    LV.Scroll.to(LV.Scroll.points.career);
                    LV.Analytics.plus("menu.used");
                    LV.Analytics.plus("menu.career");
                });
            })
        },
        busy: false,
        ready: true,
        toggle: function() {
            if (this.busy || !this.ready) return;
            this.busy = true;
            this.ready = false;
            if (this.showing) {
                this.hide();
            } else {
                this.show();
            };
        }
    };

})(jQuery);