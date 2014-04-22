(function($){

    new LV.SwipeListener(document.getElementById("scrolling"), {
        onTouchStart: function(e) {
            TweenMax.killTweensOf("#scrolling");
            LV.Scrollbar.show()
        },
        onTouchEnd: function(e) {
            var t = 4;
            var n = Math.abs(e.deltaY);
            var t = 1;
            if (n < 50 || e.deltaTime > 520) {
                LV.Scrollbar.hide();
                return;
            }

            if (n < 100) {
                t = LV.Utils.map(n, 50, 100, 1, 2);
            } else {
                t = LV.Utils.map(n, 100, 200, 2, 2.5);
            }

            var r = LV.Scrollbar.top + -(e.deltaY * t);
            if (r >= LV.Scrollbar.contentHeight) {
                r = LV.Scrollbar.innerHeight;
                TweenMax.to("#scrolling", .5, {
                    scrollTop: r,
                    overwrite: 5,
                    onUpdate: function() {
                        LV.Scrollbar.update(LV.Scrollbar.$target.scrollTop());
                    },
                    onComplete: function() {
                        LV.Scrollbar.hide();
                    }
                })
            } else {
                TweenMax.to("#scrolling", 2, {
                    scrollTop: r,
                    overwrite: 5,
                    onUpdate: function() {
                        LV.Scrollbar.update(LV.Scrollbar.$target.scrollTop());
                    },
                    onComplete: function() {
                        LV.Scrollbar.hide();
                    }
                })
            }
        },
        onTouchCancel: function(e) {
            LV.Scrollbar.hide();
        }
    });

    //mobileSwipeListener
    new LV.SwipeListener(document.getElementById("lm-swipe-listener"), {
        minX: 40,
        onSwipeLeft: function() {
            if (LV.MobileLightbox.showing) LV.MobileLightbox.next();
        },
        onSwipeRight: function() {
            if (LV.MobileLightbox.showing) LV.MobileLightbox.prev();
        }
    });

})(jQuery);