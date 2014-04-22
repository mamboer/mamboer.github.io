(function($){

    LV.MobileLightbox = {
        showing: false,
        $content: $("#lm-content-inner"),
        $listener: $("#lm-swipe-listener"),
        $label: $("#lm-top-label"),
        index: 0,
        active: false,
        show: function(e) {
            if (this.showing) return;
            this.showing = true;
            this.index = parseInt(e);
            LV.Analytics.plus("work.viewed");
            this.$label.html(this.content[this.index].title);
            $("#lightbox-mobile").css("visibility", "visible");
            TweenMax.to("#lm-bg", .3, {
                opacity: 1
            });
            TweenMax.to("#lm-content", .3, {
                top: 0,
                opacity: 1
            });
            TweenMax.to("#lm-top", .3, {
                delay: .2,
                top: 0
            });
            TweenMax.to("#lm-bottom", .3, {
                delay: .2,
                bottom: 0,
                onComplete: function() {
                    LV.MobileLightbox.update();
                }
            });
            var t = 1.5;
            TweenMax.to("#lm-exit-1", .4, {
                delay: .7 + t,
                top: 15
            });
            TweenMax.to("#lm-exit-2", .4, {
                delay: .7 + t,
                top: 15
            });
            TweenMax.to("#lm-exit-1", .2, {
                delay: .9 + t,
                rotation: -90
            });
            TweenMax.to("#lm-exit", .5, {
                delay: 1 + t,
                scale: 1.3
            });
            TweenMax.to("#lm-exit", .6, {
                delay: 1 + t,
                rotation: -135
            });
            TweenMax.to("#lm-exit", .2, {
                delay: 1.3 + t,
                scale: 1
            })
        },
        hide: function() {
            if (!this.showing) return;
            this.showing = false;
            TweenMax.to("#lm-bottom", .2, {
                bottom: -37
            });
            TweenMax.to("#lm-top", .2, {
                top: -47
            });
            TweenMax.to("#lm-content", .2, {
                delay: .1,
                top: 20,
                opacity: 0
            });
            TweenMax.to("#lm-bg", .2, {
                delay: .1,
                opacity: 0,
                onComplete: function() {
                    $("#lightbox-mobile").css("visibility", "hidden");
                    TweenMax.set("#lm-exit, #lm-exit-1", {
                        rotation: 0
                    });
                    TweenMax.set("#lm-exit-1, #lm-exit-2", {
                        top: 40
                    });
                    LV.MobileLightbox.$content.html("")
                }
            })
        },
        prev: function() {
            this.index--;
            if (this.index < 0) this.index = this.content.length - 1;
            this.update();
            LV.Analytics.plus("work.swipePrev")
        },
        next: function() {
            this.index++;
            if (this.index > this.content.length - 1) this.index = 0;
            this.update();
            LV.Analytics.plus("work.swipeNext")
        },
        analyticsKey: {
            0: "a",
            1: "b",
            2: "c",
            3: "d",
            4: "e",
            5: "f",
            6: "g",
            7: "h"
        },
        content: null,
        update: function() {
            var e = this.currentItem = this.content[this.index];
            $(".lm-circle").removeClass("lm-current");
            $("#lm-circle-" + (this.index + 1)).addClass("lm-current");
            this.$label.html(e.title);
            if (e.type == "video") {
                this.$content.html(e.html);
                this.$listener.css({
                    bottom: 60
                });
                var t = this.$content.find("iframe");
                t.attr("height", this.height);
                t.attr("width", this.width)
            } else {
                this.$content.html('<div class="lm-retina" style="background-image: url(\'' + e.src + "');\"></div>");
                var n = window.innerWidth / e.width;
                $(".lm-retina").css({
                    width: window.innerWidth,
                    height: n * e.height
                });
                this.$listener.css({
                    bottom: 0
                })
            }
            LV.Analytics.plus("work." + this.analyticsKey[this.index])
        },
        init: function(e) {
            this.content = e;
            this.height = window.innerHeight - 47 - 37;
            this.width = window.innerWidth;
            $("#lm-content").css({
                height: this.height
            });
            $("#lightbox-exit_").click(function(e) {
                LV.MobileLightbox.hide();
            });
            $(".dg-item").click(function(e) {
                e.preventDefault();
                LV.MobileLightbox.show($(this).attr("lightbox-item"))
            });
            $("#lm-exit").click(function(e) {
                e.preventDefault();
                LV.MobileLightbox.hide();
            })
        }
    };

})(jQuery);