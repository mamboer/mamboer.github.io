(function($){
    
    LV.Lightbox = {
        height: 500,
        offset: 50,
        content: null,
        $main: $("#lightbox-main"),
        $height: $("#lightbox-content"),
        $content: $("#lightbox-content"),
        $about: $("#lightbox-about"),
        currentItem: null,
        index: 0,
        showing: false,
        update: function() {
            this.offset = window.innerHeight - this.height;
            this.offset *= .5;
            this.offset = this.offset - 40;
            this.$main.css("margin-top", (-this.height >> 1) - this.offset);
            this.maxHeight = window.innerHeight - 180;
            var e = this.currentItem;
            if (!e) return;
            if (e.type == "video") {
                var t = e.height / e.width;
                var n = this.$content.width();
                var r = n * t;
                if (r > this.maxHeight) r = this.maxHeight;
                this.$height.css("height", r);
                var i = this.$content.find("iframe");
                i.attr("height", r);
                i.attr("width", n)
            } else if (e.type == "img") {
                if ( !! e.size) this.$height.css("height", "auto")
            }
        },
        init: function(e) {
            this.content = e;
            this.update();
            window.addEventListener("resize", this.update.bind(this), false);
            $("#lightbox-next").click(function(e) {
                LV.Lightbox.next()
            });
            $("#lightbox-prev").click(function(e) {
                LV.Lightbox.prev()
            });
            $("#lightbox-exit_").click(function(e) {
                LV.Lightbox.close()
            });
            $(".dg-item").click(function(e) {
                LV.Lightbox.open($(this).attr("lightbox-item"))
            })
        },
        open: function(e) {
            if (this.showing) return;
            this.showing = true;
            this.show(e);
            TweenMax.to("#lightbox", .3, {
                opacity: 1,
                autoAlpha: 1
            });
            TweenMax.to("#lightbox-content_", .4, {
                top: 0,
                delay: .2,
                opacity: 1,
                autoAlpha: 1
            });
            TweenMax.to("#lightbox-exit_", .3, {
                delay: .3,
                right: 0,
                autoAlpha: 1
            });
            TweenMax.to("#lightbox-next", .3, {
                delay: .1,
                right: 0,
                autoAlpha: 1
            });
            TweenMax.to("#lightbox-prev", .3, {
                delay: .1,
                left: 0,
                autoAlpha: 1
            });
            LV.Analytics.plus("work.viewed")
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
        close: function() {
            if (!this.showing) return;
            this.showing = false;
            TweenMax.to("#lightbox-exit_", .3, {
                right: -80,
                autoAlpha: 0
            });
            TweenMax.to("#lightbox-content_", .3, {
                delay: .3,
                top: 30,
                opacity: 0,
                autoAlpha: 0,
                ease: Quad.easeOut,
                onComplete: function() {
                    TweenMax.to("#lightbox", .3, {
                        opacity: 0,
                        autoAlpha: 0
                    });
                    LV.Lightbox.$content.html("");
                    LV.Lightbox.$about.html("")
                }
            });
            TweenMax.to("#lightbox-next", .3, {
                delay: .1,
                right: -80,
                autoAlpha: 0
            });
            TweenMax.to("#lightbox-prev", .3, {
                delay: .1,
                left: -80,
                autoAlpha: 0
            })
        },
        next: function() {
            this.index++;
            if (this.index > this.content.length - 1) this.index = 0;
            this.show(this.index);
            LV.Analytics.plus("work.arrowNext")
        },
        prev: function() {
            this.index--;
            if (this.index < 0) this.index = this.content.length - 1;
            this.show(this.index);
            LV.Analytics.plus("work.arrowPrev")
        },
        show: function(e) {
            var t = this.currentItem = this.content[e];
            this.index = e;
            LV.Analytics.plus("work." + this.analyticsKey[this.index]);
            this.$content.html(t.html);
            if (t.about) this.$about.html(t.about);
            if (t.type == "video") {
                var n = t.height / t.width;
                var r = this.$content.width();
                var i = r * n;
                if (i > this.maxHeight) i = this.maxHeight;
                this.$height.css("height", i);
                var s = this.$content.find("iframe");
                s.attr("height", i);
                s.attr("width", r)
            } else if (t.type == "img") {
                if ( !! t.size) this.$height.css("height", "auto")
            }
        }
    };

})(jQuery);