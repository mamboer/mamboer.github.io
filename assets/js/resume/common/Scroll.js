(function($){

    var checkJourney = function(e) {
        if (LV.Scroll.satisfied) {
            if (LV.Analytics.journey.work == false) {
                if (e > LV.Scroll.work) LV.Analytics.plus("journey.work")
            }
            if (LV.Analytics.journey.quoteA == false) {
                if (e > LV.Scroll.quoteA) LV.Analytics.plus("journey.quoteA")
            }
            if (LV.Analytics.journey.life == false) {
                if (e > LV.Scroll.life) LV.Analytics.plus("journey.life")
            }
            if (LV.Analytics.journey.quoteB == false) {
                if (e > LV.Scroll.quoteB) LV.Analytics.plus("journey.quoteB")
            }
            if (LV.Analytics.journey.software == false) {
                if (e > LV.Scroll.software) LV.Analytics.plus("journey.software")
            }
            if (LV.Analytics.journey.quoteC == false) {
                if (e > LV.Scroll.quoteC) LV.Analytics.plus("journey.quoteC")
            }
            if (LV.Analytics.journey.coding == false) {
                if (e > LV.Scroll.coding) LV.Analytics.plus("journey.coding")
            }
            if (LV.Analytics.journey.quoteD == false) {
                if (e > LV.Scroll.quoteD) LV.Analytics.plus("journey.quoteD")
            }
            if (LV.Analytics.journey.message == false) {
                if (e > LV.Scroll.message) LV.Analytics.plus("journey.message")
            }
            if (LV.Analytics.journey.career == false) {
                if (e > LV.Scroll.career) LV.Analytics.plus("journey.career")
            }
            if (LV.Analytics.journey.thanks == false) {
                if (e > LV.Scroll.thanks) LV.Analytics.plus("journey.thanks")
            }
            if (LV.Analytics.journey.curious == false) {
                if (e > LV.Scroll.curious) LV.Analytics.plus("journey.curious");
                $("#scroll-satisfied").html("<div id='resume-cat'></div>")
            }
            if (LV.Analytics.journey.satisfied == false) {
                if (e > LV.Scroll.satisfied) LV.Analytics.plus("journey.satisfied")
            }
        }
    };

    LV.Scroll = {
        target: window,
        targetEl: window,
        $target: LV.Utils.$body,
        $doc: LV.Utils.$doc,
        top: 0,
        prevTop: null,
        active: true,
        direction: null,
        resizing: false,
        onupdate: null,
        resetOnResize: false,
        update: function(e) {
            if (e < 0 || e >= this.maxScroll) return;
            this.top = e;
            if (this.prevTop && !LV.Scroll.resizing) {
                if (e > this.prevTop) this.direction = "down";
                else this.direction = "up"; if (this.onupdate) this.onupdate(e, this.direction)
            }
            if (this._markers) {
                for (var t = 0, n = this.markers.length; t < n; t++) {
                    this.markers[t].check()
                }
            }
            if (this._segments) {
                for (var t = 0, n = this.segments.length; t < n; t++) {
                    this.segments[t].check()
                }
            }
            this.firstAnimating = false;
            this.prevTop = e;
            this.resizing = false
        },
        disable: function() {
            if (!this.active) return;
            this.active = false;
            if (window.addEventListener) {
                window.addEventListener("DOMMouseScroll", wheel, false)
            }
            window.onmousewheel = document.onmousewheel = wheel;
            document.onkeydown = keydown;
        },
        enable: function() {
            if (this.active) return;
            this.active = true;
            if (window.removeEventListener) {
                window.removeEventListener("DOMMouseScroll", wheel, false)
            }
            window.onmousewheel = document.onmousewheel = document.onkeydown = null;
        },
        _onscroll: function() {
            if (this.target == window) {
                this.update(this.$doc.scrollTop())
            } else this.update(this.$target.scrollTop())
        },
        animating: false,
        firstAnimating: false,
        to: function(e, t, n) {
            if (this.onscroll) this.onscroll();
            var t = !! t ? t : 2e3;
            this.animating = this.firstAnimating = true;
            if (this.target == window) {
                if (LV.Utils.browser.name != "firefox") {
                    LV.Utils.$body.stop(true).animate({
                        scrollTop: e,
                        easing: "easeOutQuad"
                    }, t, function() {
                        setTimeout(function() {
                            LV.Scroll.animating = false;
                            if (n) n();
                        }, 50)
                    })
                } else {
                    LV.Utils.$html.stop(true).animate({
                        scrollTop: e,
                        easing: "easeOutQuad"
                    }, t, function() {
                        setTimeout(function() {
                            LV.Scroll.animating = false;
                            if (n) n();
                        }, 50)
                    })
                }
            } else {
                this.$target.stop(true).animate({
                    scrollTop: e,
                    easing: "easeOutQuad"
                }, t, function() {
                    setTimeout(function() {
                        LV.Scroll.animating = false;
                        if (n) n();
                    }, 50)
                })
            }
        },
        maxScroll: null,
        _onresize: function() {
            this.resizing = true;
            if (this.target == window) {
                this.maxScroll = document.body.scrollHeight - window.innerHeight
            } else {
                this.maxScroll = this.$target[0].scrollHeight - window.innerHeight
            } if (this.onresize) this.onresize();
            if (this._segments) {
                for (var e = 0, t = this.segments.length; e < t; e++) {
                    this.segments[e].update();
                }
            }
            if (this._markers) {
                for (var e = 0, t = this.markers.length; e < t; e++) {
                    this.markers[e].update();
                }
            }
            if (this.resetOnResize) window.scrollTo(0, 0);
        },
        init: function(e, t,initOpts) {
            this.resetOnResize = t != undefined ? t : this.resetOnResize;
            this.target = e != undefined ? e : this.target;
            if (this.target == window) {
                this.maxScroll = $("body")[0].scrollHeight - window.innerHeight
            } else {
                this.targetEl = document.getElementById(this.target);
                this.$target = $(this.targetEl);
                this.maxScroll = this.targetEl.scrollHeight - window.innerHeight
            }

            $.extend(this,initOpts||{});

            setTimeout(this._init.bind(this), 1);
        },
        _init: function() {
            this.targetEl.addEventListener("scroll", LV.Scroll._onscroll.bind(LV.Scroll), false);
            window.addEventListener("resize", LV.Scroll._onresize.bind(LV.Scroll), false);
            this._onresize();
        },
        _markers: false,
        _segments: false,
        markers: {
            length: 0,
            add: function(e, t) {
                LV.Scroll._markers = true;
                var n = new LV.ScrollMarker(e, t);
                this[this.length] = n;
                this.length++;
                return n;
            }
        },
        segments: {
            length: 0,
            add: function(e, t, n) {
                LV.Scroll._segments = true;
                var r = new LV.ScrollSegment(e, t, n);
                r.id = this.length;
                this[this.length] = r;
                this.length++;
                return r;
            }
        },
        resizeCount : 0,
        onresize : function() {
            $("#scroll-misc-work").css("margin-top", window.innerHeight * 2);
            if ( this.resizeCount > 3 ) LV.Analytics.plus("resized");
            this.resizeCount++;
        },
        onscroll : function() {
            LV.ResumeMenu.close();
        },
        onupdate : function(e, t) {
            LV.BackgroundCircle.onScrollUpdate(e,t);

            if (!LV.Scroll.animating) LV.ResumeMenu.close();
            LV.Scrollbar.update(e);
            if (LV.Scroll.checkReady) {
                if (LV.Scroll.first) {
                    LV.Scroll.first = false;
                    LV.Analytics.plus("firstScroll." + t);
                    LV.Analytics.plus("patience." + LV.Scroll.patienceLevel)
                } else if (!LV.Scroll.returnedHome) {
                    if (e < LV.Scroll.home) {
                        LV.Scroll.returnedHome = true;
                        LV.Analytics.plus("journey.home")
                    }
                }
            }
            if (!LV.Scroll.firstAnimation && LV.Scroll.first) {
                LV.Analytics.plus("patience." + LV.Scroll.patienceLevel);
                LV.Analytics.plus("firstScroll." + t);
                LV.Scroll.first = false;
            }
            checkJourney(e);
        }
    };

})(jQuery);