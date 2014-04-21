(function($){
    
    LV.ResumeMenu = {
        maxX: window.innerWidth - 50,
        minX: window.innerWidth - 200,
        scrollbarX: window.innerWidth - 10,
        windowWidth: window.innerWidth,
        mouseX: null,
        _open: false,
        open: function() {
            if (this._open || LV.Lightbox.showing) return;
            if (this.windowWidth < 640) return;
            this._open = true;
            LV.Analytics.plus("menu.viewed");
            LV.Analytics.plus("menu.totalViews");
            TweenMax.to("#rm-bg", .7, {
                opacity: 1,
                ease: Quad.easeOut,
                autoAlpha: 1
            });
            TweenMax.to("#rm-icon", .2, {
                marginTop: -233,
                ease: Quad.easeOut,
                overwrite: 5
            });
            TweenMax.to("#rm-c1", .2, {
                marginTop: -3,
                ease: Quad.easeOut,
                overwrite: 5,
                backgroundColor: "white"
            });
            TweenMax.to("#rm-c2", .2, {
                marginTop: 30,
                ease: Quad.easeOut,
                overwrite: 5,
                backgroundColor: "white"
            });
            TweenMax.to("#rm-c3", .2, {
                marginTop: 60,
                ease: Quad.easeOut,
                overwrite: 5,
                backgroundColor: "white"
            });
            TweenMax.to("#rm-c2", .2, {
                delay: .2,
                marginTop: -3,
                ease: Quad.easeOut
            });
            TweenMax.to("#rm-c3", .2, {
                delay: .2,
                marginTop: -3,
                ease: Quad.easeOut
            });
            $("#rm-items").css({
                visibility: "visible"
            });
            TweenMax.set(".rm-item", {
                top: 6
            });
            TweenMax.to(".rm-item", .4, {
                opacity: 1,
                top: 0,
                ease: Quad.easeOut,
                overwrite: 5,
                autoAlpha: 1
            })
        },
        close: function(e) {
            if (!this._open) return;
            if (this.windowWidth < 640 && e !== true) return;
            this._open = false;
            TweenMax.to("#rm-bg", .5, {
                autoAlpha: 0,
                opacity: 0,
                ease: Quad.easeOut,
                overwrite: 5
            });
            TweenMax.to(".rm-item", .5, {
                autoAlpha: 0,
                opacity: 0,
                ease: Quad.easeOut,
                overwrite: 5,
                onComplete: function() {
                    $("#rm-items").css({
                        visibility: "hidden"
                    })
                }
            });
            TweenMax.to("#rm-icon", .2, {
                marginTop: -50,
                ease: Quad.easeOut,
                overwrite: 5
            });
            TweenMax.to("#rm-c1", .2, {
                marginTop: -63,
                ease: Quad.easeOut,
                overwrite: 5,
                backgroundColor: "#006cff"
            });
            TweenMax.to("#rm-c2", .2, {
                marginTop: -33,
                ease: Quad.easeOut,
                overwrite: 5,
                backgroundColor: "#006cff"
            });
            TweenMax.to("#rm-c3", .2, {
                marginTop: -3,
                ease: Quad.easeOut,
                overwrite: 5,
                backgroundColor: "#006cff"
            });
            TweenMax.to("#rm-c1", .2, {
                delay: .15,
                marginTop: -3,
                ease: Quad.easeOut
            });
            TweenMax.to("#rm-c2", .2, {
                delay: .15,
                marginTop: -3,
                ease: Quad.easeOut
            })
        },
        onmousemove: function(e) {
            if (this.windowWidth < 640) return;
            this.mouseX = e.pageX;
            if (this._open) {
                if (e.pageX < this.minX) this.close();
            } else {
                if (e.pageX > this.maxX) this.open();
            }
        },
        update: function() {
            this.maxX = window.innerWidth - 50;
            this.minX = window.innerWidth - 200;
            this.scrollbarX = window.innerWidth - 10;
            this.windowWidth = window.innerWidth;
            if (this.windowWidth < 640 && this._open) this.close(true);
        },
        init: function() {
            $("#rm1").click(function(e) {
                LV.Scroll.to(0);
                LV.Analytics.plus("menu.used");
                LV.Analytics.plus("menu.home")
            });
            $("#rm2").click(function(e) {
                LV.Scroll.to($("#scroll-misc-work").offset().top + 120);
                LV.Analytics.plus("menu.used");
                LV.Analytics.plus("menu.work")
            });
            $("#rm3").click(function(e) {
                LV.Scroll.to($("#scroll-life").offset().top - 20);
                LV.Analytics.plus("menu.used");
                LV.Analytics.plus("menu.life")
            });
            $("#rm4").click(function(e) {
                LV.Scroll.to($("#scroll-software").offset().top - 20);
                LV.Analytics.plus("menu.used");
                LV.Analytics.plus("menu.software")
            });
            $("#rm5").click(function(e) {
                LV.Scroll.to($("#scroll-coding").offset().top - 20);
                LV.Analytics.plus("menu.used");
                LV.Analytics.plus("menu.coding")
            });
            $("#rm6").click(function(e) {
                LV.Scroll.to($("#scroll-message").offset().top - 20);
                LV.Analytics.plus("menu.used");
                LV.Analytics.plus("menu.contact")
            });
            $("#rm7").click(function(e) {
                LV.Scroll.to($("#scroll-history").offset().top - 20);
                LV.Analytics.plus("menu.used");
                LV.Analytics.plus("menu.career")
            });
            window.addEventListener("resize", this.update.bind(this), false);
            window.addEventListener("mousemove", this.onmousemove.bind(this), false)
        }
    };
    if (!LV.Utils.browser.mobile && !LV.Utils.browser.touch) LV.ResumeMenu.init();

})(jQuery);