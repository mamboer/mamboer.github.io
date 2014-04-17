//@sourceURL=assets/js/resume/main.js
var browser = new Browser();

function capitaliseFirstLetter(e) {
    return e.charAt(0).toUpperCase() + e.slice(1)
}
var Scroll = {
    target: window,
    targetEl: window,
    $target: $("body"),
    $doc: $(document),
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
        if (this.prevTop && !Scroll.resizing) {
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
        document.onkeydown = keydown
    },
    enable: function() {
        if (this.active) return;
        this.active = true;
        if (window.removeEventListener) {
            window.removeEventListener("DOMMouseScroll", wheel, false)
        }
        window.onmousewheel = document.onmousewheel = document.onkeydown = null
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
            if (browser.name != "firefox") {
                $("body").stop(true);
                $("body").animate({
                    scrollTop: e,
                    easing: "easeOutQuad"
                }, t, function() {
                    setTimeout(function() {
                        Scroll.animating = false;
                        if (n) n()
                    }, 50)
                })
            } else {
                $("html").stop(true);
                $("html").animate({
                    scrollTop: e,
                    easing: "easeOutQuad"
                }, t, function() {
                    setTimeout(function() {
                        Scroll.animating = false;
                        if (n) n()
                    }, 50)
                })
            }
        } else {
            this.$target.stop(true);
            this.$target.animate({
                scrollTop: e,
                easing: "easeOutQuad"
            }, t, function() {
                setTimeout(function() {
                    Scroll.animating = false;
                    if (n) n()
                }, 50)
            })
        }
    },
    maxScroll: null,
    _onresize: function() {
        this.resizing = true;
        if (this.target == window) {
            this.maxScroll = $("body")[0].scrollHeight - window.innerHeight
        } else {
            this.maxScroll = this.$target[0].scrollHeight - window.innerHeight
        } if (this.onresize) this.onresize();
        if (this._segments) {
            for (var e = 0, t = this.segments.length; e < t; e++) {
                this.segments[e].update()
            }
        }
        if (this._markers) {
            for (var e = 0, t = this.markers.length; e < t; e++) {
                this.markers[e].update()
            }
        }
        if (this.resetOnResize) window.scrollTo(0, 0)
    },
    init: function(e, t) {
        this.resetOnResize = t != undefined ? t : this.resetOnResize;
        this.target = e != undefined ? e : this.target;
        if (this.target == window) {
            this.maxScroll = $("body")[0].scrollHeight - window.innerHeight
        } else {
            this.targetEl = document.getElementById(this.target);
            this.$target = $("#" + this.target);
            this.maxScroll = this.$target[0].scrollHeight - window.innerHeight
        }
        setTimeout(this._init.bind(this), 1)
    },
    _init: function() {
        this.targetEl.addEventListener("scroll", Scroll._onscroll.bind(Scroll), false);
        window.addEventListener("resize", Scroll._onresize.bind(Scroll), false);
        this._onresize()
    },
    _markers: false,
    _segments: false,
    markers: {
        length: 0,
        add: function(e, t) {
            Scroll._markers = true;
            var n = new ScrollMarker(e, t);
            this[this.length] = n;
            this.length++;
            return n
        }
    },
    segments: {
        length: 0,
        add: function(e, t, n) {
            Scroll._segments = true;
            var r = new ScrollSegment(e, t, n);
            r.id = this.length;
            this[this.length] = r;
            this.length++;
            return r
        }
    }
};
var ScrollMarker = function(e, t) {
    this.el = e;
    this.$el = $(e);
    this.offset = -window.innerHeight >> 1;
    for (key in t) {
        this[key] = t[key]
    }
    this.hit = false;
    this.update()
};
ScrollMarker.prototype = {
    update: function() {
        this.pos = this.$el.offset();
        this.startY = this.pos.top;
        this.startY += this.offset
    },
    check: function() {
        if (!this.hit && Scroll.top > this.startY) {
            this.hit = true;
            if (this.onHit) this.onHit()
        }
    }
};
var ScrollSegment = function(e, t) {
    if (typeof e == "string") {
        this.el = e;
        this.$el = $(e)
    } else {
        for (key in e) {
            this[key] = e[key]
        }
    }
    this._range = .2;
    this.range = 0;
    this._offset = .05;
    this.offset = 0;
    for (key in t) {
        this[key] = t[key]
    }
    this.hit = false;
    this.finished = 0;
    this.update()
};
ScrollSegment.prototype = {
    update: function() {
        if (!this.el) {
            this.deltaY = this.endY - this.startY;
            return
        }
        this.pos = this.$el.offset();
        this.startY = this.endY = this.pos.top - window.innerHeight;
        var e = window.innerHeight;
        this.startY += (this._offset + this.offset) * e;
        this.endY += (this._range + this.range) * e;
        this.endY += (this._offset + this.offset) * e;
        this.deltaY = this.endY - this.startY;
        this.startY = parseInt(this.startY);
        this.endY = parseInt(this.endY);
        this.deltaY = parseInt(this.deltaY)
    },
    check: function() {
        if (!this.hit && Scroll.top > this.startY) {
            this.hit = true;
            if (this.onHit) this.onHit()
        }
        if (Scroll.top > this.startY) {
            if (Scroll.top < this.endY) {
                var e = (Scroll.top - this.startY) / this.deltaY;
                if (this.onScroll) this.onScroll(this, e);
                this.finished = 0
            } else {
                if (this.finished == 1) return;
                this.finished = 1;
                if (this.onScroll) this.onScroll(this, 1)
            }
        } else {
            if (this.finished == -1) return;
            this.finished = -1;
            if (this.onScroll) this.onScroll(this, 0)
        }
    }
};
var resizeCount = 0;
Scroll.onresize = function() {
    $("#scroll-misc-work").css("margin-top", window.innerHeight * 2);
    if (resizeCount > 3) Analytics.plus("resized");
    resizeCount++
};
TweenMax.set(".stat", {
    left: "30%",
    opacity: 0
});
$(".stat").each(function() {
    var e = $(this).attr("id");
    var t = Scroll.segments.add("#" + e, {
        onScroll: function(e, t) {
            e.timeline.seek(t);
            e.timeline2.seek(t)
        },
        offset: .03
    });
    t.timeline = new TimelineLite;
    t.timeline.to("#" + e, 1, {
        left: "0%",
        opacity: 1
    });
    t.timeline.pause();
    var n = $(this).attr("stat-level");
    t.timeline2 = new TimelineLite;
    t.timeline2.to("#" + e + " .stat-progress", 1, {
        width: n + "%"
    });
    t.timeline2.pause()
});
$(".quote").each(function() {
    var e = $(this).attr("id");
    var t = Scroll.segments.add("#" + e, {
        onScroll: function(e, t) {
            e.timeline.seek(t);
            e.timeline2.seek(t);
            e.timeline3.seek(t)
        }
    });
    t.timeline = new TimelineLite;
    t.timeline.to("#" + e, 1, {
        top: 0,
        opacity: 1
    });
    t.timeline.pause();
    t.timeline2 = new TimelineLite;
    t.timeline2.to("#" + e + " .quote-text", .8, {
        top: 0,
        opacity: 1
    });
    t.timeline2.pause();
    t.timeline3 = new TimelineLite;
    t.timeline3.to("#" + e + " .quote-by", .8, {
        delay: .2,
        left: 0,
        opacity: 1
    });
    t.timeline3.pause()
});
$(".career-item").each(function() {
    var e = $(this).attr("id");
    var t = Scroll.segments.add("#" + e, {
        onScroll: function(e, t) {
            e.timeline.seek(t)
        },
        offset: -.2
    });
    t.timeline = new TimelineLite;
    t.timeline.to("#" + e, 1, {
        top: 0,
        left: 0,
        opacity: 1
    });
    t.timeline.pause()
});
Scroll.markers.add("#open-diamond-grid", {
    onHit: function() {
        if (window.innerWidth >= 640) d.open();
        else d.openNormal()
    }
});
window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e) {
        window.setTimeout(e, 1e3 / 60)
    }
}();

var BackgroundCircles = {
    0: "#bg-circle-1",
    1: "#bg-circle-2",
    2: "#bg-circle-3",
    3: "#bg-circle-4",
    length: 4,
    randomize: function() {
        var e = window.innerWidth >> 2;
        for (var t = 0, n = this.length; t < n; t++) {
            $(this[t]).css({
                left: e * t + e * Math.random(),
                top: Math.random() * window.innerHeight
            })
        }
    },
    start: function() {
        this.randomize()
    },
    direction: null,
    down: function() {
        if (this.direction == "down") return;
        this.direction = "down";
        for (var e = 0, t = this.length; e < t; e++) {
            TweenMax.to(this[e], Math.random() * 100, {
                top: -$(this[e]).height() - Math.random() * 1e3,
                left: "+=500",
                overwrite: 5,
                ease: Quad.easeOut
            })
        }
    },
    up: function() {
        if (this.direction == "up") return;
        this.direction = "up";
        for (var e = 0, t = this.length; e < t; e++) {
            TweenMax.to(this[e], Math.random() * 100, {
                top: $(this[e]).height() + Math.random() * 1e3,
                left: "-=500",
                overwrite: 5,
                ease: Quad.easeOut
            })
        }
    }
};
TweenMax.set("#message-diamond-svg", {
    rotationZ: -180,
    scale: 0
});
var s1 = Scroll.segments.add("#message-diamond", {
    onScroll: function(e, t) {
        e.timeline.seek(t);
        e.timeline2.seek(t)
    },
    offset: .5
});
s1.timeline = new TimelineLite;
s1.timeline.to("#message-diamond-svg", 1, {
    rotationZ: 0,
    scale: 1
});
s1.timeline.pause();
s1.timeline2 = new TimelineLite;
s1.timeline2.to("#message-sent", 1, {
    opacity: 1,
    marginTop: -60
});
s1.timeline2.pause();
var s2 = Scroll.segments.add("#input-name", {
    onScroll: function(e, t) {
        e.timeline.seek(t)
    },
    offset: .4
});
s2.timeline = new TimelineLite;
s2.timeline.to(["#input-name", "#input-email", "#input-message"], .5, {
    left: 0,
    top: 0,
    opacity: 1
}, .1);
s2.timeline.to(["#input-name .shadow", "#input-email .shadow", "#input-message .shadow"], .25, {
    left: -30,
    top: 30
});
s2.timeline.pause();
var s3 = Scroll.segments.add("#send-btn", {
    onScroll: function(e, t) {
        e.timeline.seek(t)
    },
    offset: .05,
    range: -.1
});
s3.timeline = new TimelineLite;
s3.timeline.to("#send-btn", 1, {
    right: "0%",
    opacity: 1
});
s3.timeline.pause();
var s4 = Scroll.segments.add({
    startY: window.innerHeight * .4,
    endY: window.innerHeight * 1.5
}, {
    onScroll: function(e, t) {
        e.timeline.seek(t)
    }
});
s4.timeline = new TimelineLite;
s4.timeline.to("#screen-home-content", 1, {
    left: "-150%"
});
s4.timeline.pause();
var s4b = Scroll.segments.add({
    startY: 0,
    endY: window.innerHeight
}, {
    onScroll: function(e, t) {
        e.timeline.seek(t)
    }
});
s4b.timeline = new TimelineLite;
s4b.timeline.to($("#share-this_"), 1, {
    opacity: 1
});
s4b.timeline.pause();
var s5 = Scroll.segments.add({
    startY: 0,
    endY: window.innerHeight
}, {
    onScroll: function(e, t) {
        e.timeline.seek(t)
    }
});
s5.timeline = new TimelineLite;
s5.timeline.to("#avatar-animation", 1, {
    left: "0%"
});
s5.timeline.pause();
var s6 = Scroll.segments.add({
    startY: window.innerHeight * 1.15,
    endY: window.innerHeight * 1.8
}, {
    onScroll: function(e, t) {
        e.timeline.seek(t);
        e.timeline2.seek(t)
    }
});
s6.timeline = new TimelineLite;
s6.timeline.to("#avatar-animation", 1, {
    top: "-100%"
});
s6.timeline.pause();
s6.timeline2 = new TimelineLite;
s6.timeline2.to("#avatar-animation", .2, {
    delay: .8,
    opacity: 0,
    autoAlpha: 0
});
s6.timeline2.pause();
(function() {
    var e = 0;
    var t = ["webkit", "moz"];
    for (var n = 0; n < t.length && !window.requestAnimationFrame; ++n) {
        window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"]
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(t, n) {
        var r = (new Date).getTime();
        var i = Math.max(0, 16 - (r - e));
        var s = window.setTimeout(function() {
            t(r + i)
        }, i);
        e = r + i;
        return s
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(e) {
        clearTimeout(e)
    }
})();
var BackgroundCircle = function(e) {
    this.el = e;
    this.$el = $(e);
    this.width = this.$el.width();
    this.height = this.$el.height();
    this.scale = 1;
    if (window.devicePixelRatio) {
        this.scale = 1 / window.devicePixelRatio
    }
    this.directionY = -1;
    this.directionX = 1;
    this.offset = this.$el.offset();
    this.x = this.offset.left;
    this.y = this.offset.top;
    this.minY = (-this.height >> 1) - 10;
    this.maxY = window.innerHeight + (this.height >> 1) * this.scale + 10;
    this.minX = (-this.width >> 1) - 10;
    this.maxX = window.innerWidth + (this.width >> 1) * this.scale + 10;
    this.direction = null;
    this.down = function() {
        this.directionX = Math.random() * 2 - 1;
        TweenMax.to(this, .25, {
            directionY: -4,
            overwrite: 5,
            ease: Quad.easeIn
        });
        TweenMax.to(this, 1, {
            delay: .6,
            directionY: -.5 + Math.random() * -.5,
            overwrite: 5,
            ease: Quad.easeOut
        })
    };
    this.up = function() {
        this.directionX = Math.random() * 2 - 1;
        TweenMax.to(this, .25, {
            directionY: 4,
            overwrite: 5,
            ease: Quad.easeIn
        });
        TweenMax.to(this, 1, {
            delay: .6,
            directionY: .5 + Math.random() * .5,
            overwrite: 5,
            ease: Quad.easeOut
        })
    };
    this.update = function() {
        this.y += this.directionY;
        this.x += this.directionX;
        if (this.y < this.minY) this.y = this.maxY;
        else if (this.y > this.maxY) this.y = this.minY;
        if (this.x < this.minX) this.x = this.maxX;
        else if (this.x > this.maxX) this.x = this.minX;
        this.$el.css({
            top: this.y,
            left: this.x
        })
    };
    this.randomize = function(e, t, n, r) {
        var i = e + (t - e) * Math.random();
        var s = n + (r - n) * Math.random();
        this.$el.css({
            left: i,
            top: s
        });
        this.offset = this.$el.offset();
        this.x = i;
        this.y = s
    }
};
var circle1 = new BackgroundCircle("#bg-circle-1");
var circle2 = new BackgroundCircle("#bg-circle-2");
var circle3 = new BackgroundCircle("#bg-circle-3");
var circle4 = new BackgroundCircle("#bg-circle-4");
circle1.randomize(0, window.innerWidth >> 2, 0, window.innerHeight);
circle2.randomize(window.innerWidth >> 2, window.innerWidth >> 1, 0, window.innerHeight);
circle3.randomize(window.innerWidth >> 1, window.innerWidth * .75, 0, window.innerHeight);
circle4.randomize(window.innerWidth * .75, window.innerWidth, 0, window.innerHeight);
var ResumeMenu = {
    maxX: window.innerWidth - 50,
    minX: window.innerWidth - 200,
    scrollbarX: window.innerWidth - 10,
    windowWidth: window.innerWidth,
    mouseX: null,
    _open: false,
    open: function() {
        if (this._open || Lightbox.showing) return;
        if (this.windowWidth < 640) return;
        this._open = true;
        Analytics.plus("menu.viewed");
        Analytics.plus("menu.totalViews");
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
            if (e.pageX < this.minX) this.close()
        } else {
            if (e.pageX > this.maxX) this.open()
        }
    },
    update: function() {
        this.maxX = window.innerWidth - 50;
        this.minX = window.innerWidth - 200;
        this.scrollbarX = window.innerWidth - 10;
        this.windowWidth = window.innerWidth;
        if (this.windowWidth < 640 && this._open) this.close(true)
    },
    init: function() {
        $("#rm1").click(function(e) {
            Scroll.to(0);
            Analytics.plus("menu.used");
            Analytics.plus("menu.home")
        });
        $("#rm2").click(function(e) {
            Scroll.to($("#scroll-misc-work").offset().top + 120);
            Analytics.plus("menu.used");
            Analytics.plus("menu.work")
        });
        $("#rm3").click(function(e) {
            Scroll.to($("#scroll-life").offset().top - 20);
            Analytics.plus("menu.used");
            Analytics.plus("menu.life")
        });
        $("#rm4").click(function(e) {
            Scroll.to($("#scroll-software").offset().top - 20);
            Analytics.plus("menu.used");
            Analytics.plus("menu.software")
        });
        $("#rm5").click(function(e) {
            Scroll.to($("#scroll-coding").offset().top - 20);
            Analytics.plus("menu.used");
            Analytics.plus("menu.coding")
        });
        $("#rm6").click(function(e) {
            Scroll.to($("#scroll-message").offset().top - 20);
            Analytics.plus("menu.used");
            Analytics.plus("menu.contact")
        });
        $("#rm7").click(function(e) {
            Scroll.to($("#scroll-history").offset().top - 20);
            Analytics.plus("menu.used");
            Analytics.plus("menu.career")
        });
        window.addEventListener("resize", this.update.bind(this), false);
        window.addEventListener("mousemove", this.onmousemove.bind(this), false)
    }
};
if (!browser.mobile && !browser.touch) ResumeMenu.init();
var draw = function() {
    if (browser.mobile || browser.touch) {
        if (MobileMenu.showing || MobileLightbox.showing) {
            requestAnimationFrame(draw);
            return
        }
    }
    circle1.update();
    circle2.update();
    circle3.update();
    circle4.update();
    requestAnimationFrame(draw)
};
Scroll.onscroll = function() {
    ResumeMenu.close()
};
var Lightbox = {
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
            Lightbox.next()
        });
        $("#lightbox-prev").click(function(e) {
            Lightbox.prev()
        });
        $("#lightbox-exit_").click(function(e) {
            Lightbox.close()
        });
        $(".dg-item").click(function(e) {
            Lightbox.open($(this).attr("lightbox-item"))
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
        Analytics.plus("work.viewed")
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
                Lightbox.$content.html("");
                Lightbox.$about.html("")
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
        Analytics.plus("work.arrowNext")
    },
    prev: function() {
        this.index--;
        if (this.index < 0) this.index = this.content.length - 1;
        this.show(this.index);
        Analytics.plus("work.arrowPrev")
    },
    show: function(e) {
        var t = this.currentItem = this.content[e];
        this.index = e;
        Analytics.plus("work." + this.analyticsKey[this.index]);
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
var DiamondSVG = function(e, t, n) {
    this.$el = e;
    this.id = e.attr("id");
    this.width = e.width();
    this.height = e.height();
    this.polygon = null;
    this.svgID = null;
    this.svg = null;
    this.snap = null;
    this.create = function(e, t) {
        this.svgID = "#" + e;
        this.snap = new Snap(this.svgID);
        var t = !! t ? t : {
            fill: "white"
        };
        var n = !! t.stroke ? t.strokeWidth : 0;
        this.pointA = new Point(n, this.height >> 1);
        this.pointB = new Point(this.width >> 1, n);
        this.pointC = new Point(this.width - n, this.height >> 1);
        this.pointD = new Point(this.width >> 1, this.height - n);
        this.polygon = new Polygon([this.pointA, this.pointB, this.pointC, this.pointD], true);
        this.polygon.createSVG(this.snap).attr(t)
    };
    if (t != undefined) this.create(t, n)
};
var DiamondSVGs = {
    length: 0,
    add: function(e, t) {
        var n = "diamond-svg-" + this.length;
        e.html('<svg id="' + n + '" style="width: 100%; height: 100%"></svg>');
        var r = new DiamondSVG(e, n, t);
        this[this.length] = r;
        this.length++
    },
    findById: function(e) {
        for (var t = 0, n = this.length; t < n; t++) {
            if ( !! this[t].id) {
                if (e == this[t].id) return this[t]
            }
        }
    }
};
$(".svg-diamond").each(function() {
    if ( !! $(this).attr("diamondStroke")) DiamondSVGs.add($(this), {
        stroke: "white",
        fill: "none",
        strokeWidth: 2
    });
    else DiamondSVGs.add($(this))
});
var updateStats = function() {
    var e = window.innerWidth;
    if (e < 980) {
        e -= 160;
        e = Utils.map(e, 0, 820, 340, 820);
        if (window.innerWidth <= 640) {
            $(".stat").css({
                "font-size": window.innerWidth + "px",
                width: window.innerWidth + "px"
            })
        } else {
            $(".stat").css({
                "font-size": e + "px",
                width: e + "px"
            })
        }
    } else {
        $(".stat").css({
            "font-size": "820px",
            width: "820px"
        })
    }
};
window.onresize = updateStats;
updateStats();
var DiamondGrid = function(e) {
    this.el = e;
    this.width = 380;
    this.minWidth = 400;
    this.side = 100;
    this.spaceX = 40;
    this.spaceY = 30;
    this.$el = $(e);
    this.$items = $(e).find(".dg-item");
    this.$itemsInner = $(e).find(".dg-item-inner");
    this.$spacers = $(e).find(".dg-spacer");
    this.$spacer1 = $(e).find(".dg-spacer-one");
    this.$spacer2 = $(e).find(".dg-spacer-two");
    this.rotate = function(e, t) {
        var t = t != undefined ? t : 1e3;
        var e = e != undefined ? e : 45;
        var n = 0;
        $(this.el + " .dg-item").each(function() {
            TweenMax.to($(this), t * .001, {
                delay: n * .1 * .8,
                rotationZ: e,
                ease: Back.easeOut
            });
            n++
        });
        var r = 0;
        $(this.el + " .dg-item-inner").each(function() {
            TweenMax.to($(this), t * .001, {
                delay: r * .1 * .8,
                rotationZ: -e,
                ease: Back.easeOut
            });
            r++
        })
    };
    this._open = null;
    this.open = function(e) {
        if (this._open) return;
        var e = !! e ? e : 0;
        this._open = true;
        $(this.el + " .dg-item_").css({
            width: "0%",
            height: "0%",
            left: "50%",
            top: "50%"
        });
        setTimeout(function() {
            this.rotate(45, 500);
            this.expand(500)
        }.bind(this), e)
    };
    this.openNormal = function(e) {
        if (this._open) return;
        this._open = true;
        var t = t != undefined ? t : 300;
        var n = 0;
        $(this.el + " .dg-item_").each(function() {
            TweenMax.to($(this), t * .001, {
                delay: n * .4 * .8,
                left: "0%",
                top: "0%",
                width: "100%",
                height: "100%",
                ease: Back.easeOut
            });
            n++
        })
    };
    this.close = function() {
        if (!this._open) return;
        this._open = false;
        var e = 0;
        $(this.el + " .dg-item").each(function() {
            TweenMax.set($(this), {
                rotationZ: 0
            });
            e++
        });
        var t = 0;
        $(this.el + " .dg-item-inner").each(function() {
            TweenMax.set($(this), {
                rotationZ: 0
            });
            t++
        });
        var n = 0;
        $(this.el + " .dg-item_").each(function() {
            TweenMax.to($(this), {
                left: "50%",
                top: "50%",
                width: "0%",
                height: "0%"
            });
            n++
        })
    };
    this.expand = function(e) {
        var e = e != undefined ? e : 300;
        var t = 0;
        $(this.el + " .dg-item_").each(function() {
            TweenMax.to($(this), e * .001, {
                delay: t * .1 * .8,
                left: "0%",
                top: "0%",
                width: "100%",
                height: "100%",
                ease: Back.easeOut
            });
            t++
        })
    };
    this.shrink = function(t) {
        var t = t != undefined ? t : 300;
        $(e + " .dg-item_").animate({
            width: "50%",
            height: "50%",
            left: "25%",
            top: "25%"
        }, t, "easeOutQuad")
    };
    this.reset = function() {
        TweenMax.to(this.el + " .dg-item", .001, {
            rotationZ: 0,
            ease: Elastic.easeOut
        });
        TweenMax.to(this.el + " .dg-item-inner", .001, {
            rotationZ: 0,
            ease: Elastic.easeOut
        })
    };
    this._update = function(e) {
        this.$el.css({
            width: e + 1,
            "font-size": e + "px"
        });
        this.$items.css({
            "font-size": e + "px"
        });
        return;
        var t = parseInt(e * .7894736842105263);
        this.side = t / 3;
        var n = this.side * .2;
        this.$el.css({
            width: e,
            marginTop: n,
            marginLeft: -e >> 1,
            paddingTop: this.side * .3
        });
        this.$items.css({
            width: this.side,
            height: this.side,
            "margin-top": this.side * -.3
        });
        this.spaceX = this.side * .4;
        this.$spacers.css({
            width: this.spaceX
        });
        var r = this.side + this.spaceX;
        this.$spacer1.css({
            width: this.side + this.spaceX
        });
        this.$spacer2.css({
            width: r >> 1
        })
    };
    this.update = function(e) {
        var t = e / 20;
        t = Math.floor(t * 20);
        this._update(t);
        return;
        if (e >= this.minWidth) {
            var n = e * .05263157894737;
            n *= 2;
            this._update(e - n)
        } else {
            this._update(e);
            $(this.el + " .dg-item_").css({
                width: "100%",
                height: "100%",
                left: "0%",
                top: "0%"
            });
            $(this.el + " .dg-item").attr("style", "");
            $(this.el + " .dg-item").attr("rotatex", "0");
            $(this.el + " .dg-item").attr("rotatey", "0");
            $(this.el + " .dg-item").attr("rotatez", "0")
        }
    };
    this.onresize = function(e) {
        var t = window.outerWidth;
        this.update(this.$el.parent().width());
        if (t > this.minWidth - 1) {
            this.open(1e3)
        } else {
            this.close()
        }
        return;
        var n = t / 20;
        n = Math.floor(n * 20);
        this._update(n);
        console.log(n);
        return;
        if (n >= 320) {
            var r = n * .05263157894737;
            r *= 2;
            this._update(n - r)
        } else this._update(t)
    };
    window.addEventListener("resize", this.onresize.bind(this), false)
};
var d = new DiamondGrid("#diamond");
d.minWidth = 640;
d.update($("#diamond-container").width());
var fixGlitch = function() {};
window.onbeforeunload = function() {
    window.scrollTo(0, 0)
};
TweenMax.set("#avatar-diamond svg", {
    scale: 0
});
TweenMax.set("#avatar-inner", {
    scale: 0
});
TweenMax.set("#d1,#d2,#d3", {
    opacity: 0
});
TweenMax.set("#sun_", {
    scale: 0
});
TweenMax.set(".dg-item-label-inner", {
    rotationZ: -45
});
var IntroAnimation = {
    play: function(e) {
        switch (e) {
            case -1:
                Scroll.firstAnimation = true;
                Scroll.patienceLevel = "loaded";
                if (browser.touch || browser.mobile) {
                    Scrollbar.show();
                    if (Scroll.first || Scroll.top < window.innerHeight) Scroll.to(window.innerHeight, 1e3, function() {
                        Scroll.checkReady = true;
                        Scrollbar.hide()
                    });
                    else Scroll.checkReady = true
                } else {
                    SocialMenu.close(true);
                    if (Scroll.first || Scroll.top < window.innerHeight) Scroll.to(window.innerHeight, 1e3, function() {
                        Scroll.checkReady = true
                    });
                    else Scroll.checkReady = true
                }
                IntroAnimation.play(0);
                break;
            case 0:
                var t = .7;
                var n = window.innerWidth > 800 ? 1 : Utils.map(window.innerWidth, 320, 800, .55, 1);
                TweenMax.to("#avatar-diamond svg", 1.8, {
                    delay: t,
                    scale: n,
                    rotation: 180,
                    ease: Elastic.easeOut,
                    onUpdate: fixGlitch
                });
                TweenMax.to("#avatar-inner", 1.2, {
                    delay: t + .2,
                    scale: n,
                    ease: Elastic.easeOut,
                    onUpdate: fixGlitch,
                    onComplete: IntroAnimation.play,
                    onCompleteParams: [1]
                });
                break;
            case 1:
                IntroAnimation.play(2);
                TweenMax.to("#blue1", 8, {
                    marginTop: "-20%",
                    marginLeft: "20%",
                    ease: Quad.easeOut
                });
                TweenMax.to("#blue2", 8, {
                    marginTop: "20%",
                    marginLeft: "-20%",
                    ease: Quad.easeOut
                });
                break;
            case 2:
                if (browser.touch || browser.mobile) {
                    $("#mq-yes").click(function() {
                        Analytics.plus("handed.right");
                        TweenMax.to("#mq-yes .mq-shine", .1, {
                            yoyo: true,
                            repeat: 3,
                            opacity: 1,
                            onComplete: function() {
                                $("#mobile-scroll").css({
                                    right: "auto",
                                    left: 2
                                });
                                var e = 2.2;
                                if (browser.layout == "portrait" && window.DeviceMotionEvent != undefined) {
                                    $("#mq-question .mq-label").css({
                                        marginTop: 8
                                    });
                                    $("#mq-question .mq-label").html("Tilt phone to<br />SHOW/HIDE menu");
                                    e = 3.2;
                                    MobileMenu.active = true
                                } else $("#mq-question .mq-label").html("Got it, thanks!");
                                $("#mq-question .mq-label").hide();
                                Scroll.patienceLevel = "message";
                                Scrollbar.show();
                                setTimeout(function() {
                                    $("#mq-question .mq-label").show()
                                }, 1);
                                TweenMax.to("#scrollbar", .6, {
                                    delay: e,
                                    opacity: 0,
                                    overwrite: 0,
                                    onComplete: function() {
                                        $("#mq-question .mq-label").html(":)");
                                        $("#mq-question .mq-label").css({
                                            marginTop: 18
                                        });
                                        $("#mq-question .mq-label").hide();
                                        setTimeout(function() {
                                            $("#mq-question .mq-label").show()
                                        }, 1);
                                        Scroll.patienceLevel = "smiley"
                                    }
                                });
                                TweenMax.to("#mq-yes", .4, {
                                    opacity: 0,
                                    autoAlpha: 0
                                });
                                TweenMax.to("#mq-no", .4, {
                                    opacity: 0,
                                    autoAlpha: 0
                                })
                            }
                        })
                    });
                    $("#mq-no").click(function() {
                        Analytics.plus("handed.left");
                        TweenMax.to("#mq-no .mq-shine", .1, {
                            yoyo: true,
                            repeat: 3,
                            opacity: 1,
                            onComplete: function() {
                                var e = 2.2;
                                if (browser.layout == "portrait" && window.DeviceMotionEvent != undefined) {
                                    $("#mq-question .mq-label").css({
                                        marginTop: 8
                                    });
                                    $("#mq-question .mq-label").html("Tilt phone to<br />SHOW/HIDE menu");
                                    e = 3.2;
                                    MobileMenu.active = true
                                } else $("#mq-question .mq-label").html("Got it, thanks!");
                                $("#mq-question .mq-label").hide();
                                Scroll.patienceLevel = "message";
                                Scrollbar.show();
                                setTimeout(function() {
                                    $("#mq-question .mq-label").show()
                                }, 1);
                                TweenMax.to("#scrollbar", .6, {
                                    delay: e,
                                    opacity: 0,
                                    overwrite: 0,
                                    onComplete: function() {
                                        $("#mq-question .mq-label").html(":)");
                                        $("#mq-question .mq-label").css({
                                            marginTop: 18
                                        });
                                        $("#mq-question .mq-label").hide();
                                        setTimeout(function() {
                                            $("#mq-question .mq-label").show()
                                        }, 1);
                                        Scroll.patienceLevel = "smiley"
                                    }
                                });
                                TweenMax.to("#mq-no", .4, {
                                    opacity: 0,
                                    autoAlpha: 0
                                });
                                TweenMax.to("#mq-yes", .4, {
                                    opacity: 0,
                                    autoAlpha: 0
                                })
                            }
                        })
                    });
                    $("#mq-yes, #mq-no").css("visibility", "visible");
                    TweenMax.to("#mq-yes", .5, {
                        delay: .5,
                        left: "0%"
                    });
                    TweenMax.to("#mq-no", .5, {
                        delay: .5,
                        right: "0%"
                    });
                    TweenMax.to("#mq-question", .5, {
                        top: 0,
                        opacity: 1,
                        onComplete: function() {
                            Scroll.patienceLevel = "question"
                        }
                    })
                } else {
                    /*
                    FB.Event.subscribe("edge.create", function(e) {
                        Analytics.plus("share.clicked");
                        Analytics.plus("share.facebook")
                    });
                    $("#pin-it").click(function() {
                        Analytics.plus("share.clicked");
                        Analytics.plus("share.pinterest")
                    })
                    */
                }
                TweenMax.to("#sun_", .5, {
                    scale: 1,
                    onComplete: IntroAnimation.play,
                    onCompleteParams: [4]
                });
                TweenMax.to("fake", .6, {
                    left: "80%",
                    onComplete: IntroAnimation.play,
                    onCompleteParams: [3]
                });
                TweenMax.to("#sun_", 9, {
                    marginTop: -180,
                    marginLeft: 240,
                    ease: Quad.easeOut
                });
                TweenMax.to("#sunshine_", 1.5, {
                    delay: .3,
                    opacity: 1,
                    ease: Quad.easeOut
                });
                TweenMax.to("#sunshine_", 1.5, {
                    delay: 1.8,
                    marginLeft: 130,
                    marginTop: -80,
                    opacity: 0,
                    ease: Quad.easeIn
                });
                TweenMax.to("#sunflare1", .5, {
                    delay: .2,
                    opacity: 1,
                    ease: Quad.easeOut
                });
                TweenMax.to("#sunflare2", .5, {
                    delay: .25,
                    opacity: 1,
                    ease: Quad.easeOut
                });
                TweenMax.to("#sunflare3", .5, {
                    delay: .3,
                    opacity: 1,
                    ease: Quad.easeOut
                });
                TweenMax.to("#sunflare4", .5, {
                    delay: .35,
                    opacity: 1,
                    ease: Quad.easeOut
                });
                TweenMax.to("#sunflare1", 3, {
                    delay: .3,
                    left: -30,
                    top: 30,
                    scale: 1.5,
                    ease: Quad.easeOut
                });
                TweenMax.to("#sunflare2", 3, {
                    delay: .3,
                    left: -110,
                    top: 100,
                    scale: 1.5,
                    ease: Quad.easeOut
                });
                TweenMax.to("#sunflare3", 3, {
                    delay: .3,
                    left: -220,
                    top: 200,
                    scale: 1.5,
                    ease: Quad.easeOut
                });
                TweenMax.to("#sunflare4", 3, {
                    delay: .3,
                    left: -340,
                    top: 300,
                    scale: 1.5,
                    ease: Quad.easeOut,
                    onComplete: function() {
                        if (!browser.touch && !browser.mobile) TweenMax.to("#desktop-message", .5, {
                            marginTop: -220,
                            opacity: 1,
                            onComplete: function() {
                                Scroll.patienceLevel = "message";
                                TweenMax.to("fake", 3.5, {
                                    onComplete: function() {
                                        $("#desktop-message .mq-label").html(":)");
                                        $("#desktop-message .mq-label").hide();
                                        setTimeout(function() {
                                            $("#desktop-message .mq-label").show()
                                        }, 1);
                                        Scroll.patienceLevel = "smiley"
                                    }
                                })
                            }
                        })
                    }
                });
                TweenMax.to("#sunflare1", .8, {
                    delay: 2.8,
                    opacity: 0,
                    scale: 1,
                    ease: Quad.easeOut
                });
                TweenMax.to("#sunflare2", .8, {
                    delay: 2.7,
                    opacity: 0,
                    scale: 1,
                    ease: Quad.easeOut
                });
                TweenMax.to("#sunflare3", .8, {
                    delay: 2.6,
                    opacity: 0,
                    scale: 1,
                    ease: Quad.easeOut
                });
                TweenMax.to("#sunflare4", .8, {
                    delay: 2.5,
                    opacity: 0,
                    scale: 1,
                    ease: Quad.easeOut,
                    onComplete: function() {
                        if (browser.touch || browser.mobile) draw()
                    }
                });
                break;
            case 3:
                break;
            case 4:
                TweenMax.to("#d1", .5, {
                    delay: .2,
                    opacity: 1
                });
                TweenMax.to("#d2", .5, {
                    delay: .4,
                    opacity: 1
                });
                TweenMax.to("#d3", .5, {
                    delay: .6,
                    opacity: 1
                });
                TweenMax.to("#d1", .8, {
                    delay: .5,
                    rotationY: 180,
                    repeat: -1,
                    repeatDelay: .5
                });
                TweenMax.to("#d2", .8, {
                    delay: .6,
                    rotationY: 180,
                    repeat: -1,
                    repeatDelay: .5
                });
                TweenMax.to("#d3", .8, {
                    delay: .7,
                    rotationY: 180,
                    repeat: -1,
                    repeatDelay: .5
                });
                break
        }
    }
};
var preloadComplete = function() {
    var e = (new Date).getTime() - preloadStart;
    var t = e < 5e3 ? 5e3 - e : 500;
    if (!browser.mobile && !browser.touch) {
        if (t < 4e3) t = 4e3
    }
    t *= .001;
    TweenMax.to("#rlb-progress", t, {
        width: "100%",
        onComplete: function() {
            if (browser.mobile || browser.touch) insertWorkImages()
        }
    });
    TweenMax.to("#rlb-progress", .05, {
        delay: t - .1,
        yoyo: true,
        repeat: 5,
        opacity: 0,
        onComplete: function() {
            if (browser.touch || browser.mobile) {
                TweenMax.to("#rlb-progress", .4, {
                    top: 2,
                    opacity: 0
                });
                TweenMax.to("#rlb-indicator", .4, {
                    top: -1
                })
            } else {
                TweenMax.to("#rlb-progress", .4, {
                    top: 4,
                    opacity: 0
                });
                TweenMax.to("#rlb-indicator", .4, {
                    top: -3
                })
            }
        }
    });
    TweenMax.to("fake", .01, {
        delay: t + .39,
        onComplete: function() {
            var e = "500%";
            if (!Scroll.first && Scroll.top > window.innerHeight) e = "100%";
            TweenMax.to("#rlb-indicator", 1.5, {
                width: e,
                onStart: IntroAnimation.play,
                onStartParams: [-1],
                onComplete: function() {
                    $("#resume-loader-bar").css("display", "none");
                    $("#resume-loader-triangles").css("margin-top", "60px")
                }
            })
        }
    });
    TweenMax.to("#rlb-indicator", .5, {
        delay: 1.2 + t,
        opacity: 0,
        autoAlpha: 0
    });
    Scrollbar.init("#scrolling", {
        height: 40
    });
    if (!browser.mobile && !browser.touch) {
        s4b.timeline = new TimelineLite;
        s4b.timeline.to($("#share-this_"), .8, {
            delay: .2,
            opacity: 1
        });
        s4b.timeline.pause();
        TweenMax.set(".social-icon", {
            rotation: -25
        });
        TweenMax.set(".social-shadow", {
            scale: 0,
            opacity: 0
        });
        var t = 0;
        var n = Bounce.easeOut;
        var r = 1;
        TweenMax.to("#social-mail .social-icon", r, {
            delay: t,
            opacity: 1,
            top: 20,
            rotation: 0,
            ease: n
        });
        TweenMax.to("#social-mail .social-shadow", r, {
            delay: t,
            opacity: 1,
            scale: 1,
            ease: n
        });
        t = .4;
        TweenMax.to("#social-linkedin .social-icon", r, {
            delay: t,
            opacity: 1,
            top: 20,
            rotation: 0,
            ease: n
        });
        TweenMax.to("#social-linkedin .social-shadow", r, {
            delay: t,
            opacity: 1,
            scale: 1,
            ease: n
        });
        t = .2;
        TweenMax.to("#social-github .social-icon", r, {
            delay: t,
            opacity: 1,
            top: 20,
            rotation: 0,
            ease: n
        });
        TweenMax.to("#social-github .social-shadow", r, {
            delay: t,
            opacity: 1,
            scale: 1,
            ease: n
        });
        t = .6;
        TweenMax.to("#social-tumblr .social-icon", r, {
            delay: t,
            opacity: 1,
            top: 20,
            rotation: 0,
            ease: n
        });
        TweenMax.to("#social-tumblr .social-shadow", r, {
            delay: t,
            opacity: 1,
            scale: 1,
            ease: n
        });
        t = .2;
        TweenMax.to("#social-vimeo .social-icon", r, {
            delay: t,
            opacity: 1,
            top: 20,
            rotation: 0,
            ease: n
        });
        TweenMax.to("#social-vimeo .social-shadow", r, {
            delay: t,
            opacity: 1,
            scale: 1,
            ease: n
        });
        t = .8;
        TweenMax.to("#social-pinterest .social-icon", r, {
            delay: t,
            opacity: 1,
            top: 20,
            rotation: 0,
            ease: n
        });
        TweenMax.to("#social-pinterest .social-shadow", r, {
            delay: t,
            opacity: 1,
            scale: 1,
            ease: n,
            onComplete: function() {
                var e = 0;
                $(".social-btn").each(function() {
                    var t = "#" + $(this).attr("id");
                    TweenMax.to(t + " .social-icon", .2, {
                        delay: e * .2 * .8,
                        rotation: -25,
                        top: 0
                    });
                    TweenMax.to(t + " .social-shadow", .2, {
                        delay: e * .2 * .8,
                        opacity: .8,
                        scale: .6
                    });
                    if (browser.name != "safari") TweenMax.to(t + " .social-shine-inner", .5, {
                        delay: e * .2 * .8,
                        top: -50
                    });
                    TweenMax.to(t + " .social-icon", 1, {
                        delay: e * .2 * .8,
                        rotationY: 360,
                        onComplete: function() {
                            if (browser.name != "safari") {
                                TweenMax.set(t + " .social-shine-inner", {
                                    opacity: .7
                                });
                                TweenMax.to(t + " .social-shine-inner", .4, {
                                    top: 53,
                                    opacity: 0,
                                    onComplete: function() {
                                        TweenMax.set(t + " .social-shine-inner", {
                                            opacity: 1
                                        })
                                    }
                                })
                            }
                            TweenMax.to(t + " .social-icon", .4, {
                                rotation: 0,
                                top: 20,
                                onComplete: function() {
                                    TweenMax.set(t + " .social-icon", {
                                        rotationY: 0
                                    })
                                }
                            });
                            TweenMax.to(t + " .social-shadow", .4, {
                                opacity: 1,
                                scale: 1
                            })
                        }
                    });
                    e++
                })
            }
        });
        t = .6;
        TweenMax.to("#social-instagram .social-icon", r, {
            delay: t,
            opacity: 1,
            top: 20,
            rotation: 0,
            ease: n
        });
        TweenMax.to("#social-instagram .social-shadow", r, {
            delay: t,
            opacity: 1,
            scale: 1,
            ease: n
        });
        t = .4;
        TweenMax.to("#social-twitter .social-icon", r, {
            delay: t,
            opacity: 1,
            top: 20,
            rotation: 0,
            ease: n
        });
        TweenMax.to("#social-twitter .social-shadow", r, {
            delay: t,
            opacity: 1,
            scale: 1,
            ease: n
        })
    }
};
var preloadProgress = function(e) {
    var t = Math.round(e.progress * 100 * .8);
    if (t == 0) t = 1;
    $("#rlb-progress").css({
        width: t + "%"
    })
};
var preloadStart = (new Date).getTime();
var queue = new createjs.LoadQueue(true);
queue.on("complete", preloadComplete, this);
queue.on("progress", preloadProgress, this);
var Message = {
    busy: false,
    showError: function(e) {
        var t = "#error-" + e;
        TweenMax.to(t, .5, {
            opacity: 1,
            autoAlpha: 1,
            ease: Quad.easeOut
        });
        TweenMax.to(t + " .error-label", .5, {
            delay: .25,
            opacity: 1,
            ease: Quad.easeOut
        });
        TweenMax.to(t, .5, {
            delay: 2.2,
            opacity: 0,
            autoAlpha: 0,
            ease: Quad.easeIn,
            onComplete: function() {
                TweenMax.set(t + " .error-label", {
                    opacity: 0
                });
                $("#sending").css("display", "none");
                Message.busy = false
            }
        })
    },
    hide: function() {
        TweenMax.set("#message-sent", {
            opacity: 0,
            marginTop: -40
        });
        $("#message-sent").css("visibility", "visible");
        TweenMax.to("#message-sent", .5, {
            opacity: 1,
            marginTop: -60
        });
        $("#msg-form").css("visibility", "hidden")
    },
    send: function(e) {
        var t = (new Date).getTime();
        $.get("/send-message", e, function(e) {
            if (e.success === true || e.success == "true") {
                var n = (new Date).getTime() - t;
                var r = n < 2500 ? 2500 - n : 100;
                r *= .001;
                TweenMax.to("fake", r, {
                    onComplete: function() {
                        Message.hide()
                    }
                });
                Analytics.plus("messages")
            } else {
                $("#message-sent").html(". OH NO! .<br /><br/><span>something's broken.. email me instead:</span><br /><span style=\"font-family:'Gotham Light'; font-size: 16px;\">hi.christophermiles@gmail.com</span>");
                Message.hide()
            }
        }, "json")
    }
};
$("#send-btn").click(function() {
    if (Message.busy) return;
    var e = $("#input-name input").val();
    var t = $("#input-email input").val();
    var n = $("#input-message textarea").val();
    var r = true;
    if (e.length == 0) {
        Message.showError("name");
        r = false
    }
    if (r) {
        if (t.length == 0) {
            $("#error-email .error-label").html("email address is missing");
            Message.showError("email");
            r = false
        } else if (t.length < 6 || t.indexOf("@") == -1 || t.indexOf(".") == -1 || t.indexOf(".") < t.indexOf("@")) {
            $("#error-email .error-label").html("hmm.. email address is invalid");
            Message.showError("email");
            r = false
        }
    }
    if (r) {
        if (n.length == 0) {
            $("#error-message .error-label").html("at least write hello!");
            Message.showError("message");
            r = false
        } else if (n.length < 5) {
            $("#error-message .error-label").html("writer's block? don't be shy!");
            Message.showError("message");
            r = false
        }
    }
    if (!r) {
        Message.busy = true;
        $("#sending-label").html("WOMP");
        $("#sending").css("display", "block");
        return
    } else {
        Message.busy = true;
        $("#sending-label").html("SENDING");
        $("#sending").css("display", "block")
    }
    var i = {
        name: capitaliseFirstLetter(e).replace(/[|&;$%"'<>()+,]/g, ""),
        email: t.replace(/[|&;$%"'<>()+,]/g, ""),
        message: n.replace(/[|&;$%"'<>()+,]/g, "")
    };
    Message.send(i)
});
var $el = document.getElementById("scrolling");
var swipeListener = new SwipeListener($el, {
    onTouchStart: function(e) {
        TweenMax.killTweensOf("#scrolling");
        Scrollbar.show()
    },
    onTouchEnd: function(e) {
        var t = 4;
        var n = Math.abs(e.deltaY);
        var t = 1;
        if (n < 50 || e.deltaTime > 520) {
            Scrollbar.hide();
            return
        } else if (n < 100) {
            t = Utils.map(n, 50, 100, 1, 2)
        } else {
            t = Utils.map(n, 100, 200, 2, 2.5)
        }
        var r = Scrollbar.top + -(e.deltaY * t);
        if (r >= Scrollbar.contentHeight) {
            r = Scrollbar.innerHeight;
            TweenMax.to("#scrolling", .5, {
                scrollTop: r,
                overwrite: 5,
                onUpdate: function() {
                    Scrollbar.update(Scrollbar.$target.scrollTop())
                },
                onComplete: function() {
                    Scrollbar.hide()
                }
            })
        } else {
            TweenMax.to("#scrolling", 2, {
                scrollTop: r,
                overwrite: 5,
                onUpdate: function() {
                    Scrollbar.update(Scrollbar.$target.scrollTop())
                },
                onComplete: function() {
                    Scrollbar.hide()
                }
            })
        }
    },
    onTouchCancel: function(e) {
        Scrollbar.hide()
    }
});
var $lightboxMobile = document.getElementById("lm-swipe-listener");
var mobileSwipeListener = new SwipeListener($lightboxMobile, {
    minX: 40,
    onSwipeLeft: function() {
        if (MobileLightbox.showing) MobileLightbox.next()
    },
    onSwipeRight: function() {
        if (MobileLightbox.showing) MobileLightbox.prev()
    }
});
var Scrollbar = {
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
        })
    },
    show: function() {
        TweenMax.killTweensOf("#scrollbar");
        this.$el.css({
            opacity: 1
        })
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
        })
    },
    update: function(e) {
        if (e == 0) Scrollbar.hide();
        this.top = e;
        this.percent = e / this.innerHeight;
        var t = -Math.round(this.percent * this.height);
        this.$el.css({
            top: Math.round(this.percent * 100) + "%",
            marginTop: t
        })
    }
};
var googleClicked = function() {
    Analytics.plus("share.clicked");
    Analytics.plus("share.google")
};
var SocialMenu = {
    _open: false,
    open: function(e) {
        if (this._open && !e) return;
        this._open = true;
        Analytics.plus("share.hover");
        Analytics.plus("share.hoverTotal");
        TweenMax.to("#twitter-widget-0", .3, {
            left: 0
        });
        TweenMax.to("#___plusone_0", .3, {
            left: 70
        })
    },
    close: function(e) {
        if (!this._open && !e) return;
        this._open = false;
        TweenMax.to("#twitter-widget-0", .3, {
            left: 0
        });
        TweenMax.to("#___plusone_0", .3, {
            left: 31
        })
    },
    maxX: 250,
    onmousemove: function(e) {
        if (e.y < 40) {
            if (e.x < this.maxX) this.open();
            else this.close()
        } else {
            this.close()
        }
    },
    init: function() {
        window.addEventListener("mousemove", this.onmousemove.bind(this), false)
    }
};
var Analytics = {
    type: "desktop.",
    ready: true,
    plus: function(e) {
        if (!this.ready) return;
        var t = e.split(".");
        if (t.length == 1) {
            if (this[e] != undefined) {
                if (this[e] == true) return;
                else this[e] = true
            }
        } else if (t.length == 2) {
            if (this[t[0]] != undefined && this[t[0]][t[1]] != undefined) {
                if (this[t[0]][t[1]] == true) return;
                else this[t[0]][t[1]] = true
            }
        }
        //$.post("analytics/plus/" + this.type + e)
    },
    work: {
        viewed: false
    },
    journey: {
        home: false,
        work: false,
        quoteA: false,
        life: false,
        quoteB: false,
        software: false,
        quoteC: false,
        coding: false,
        quoteD: false,
        message: false,
        career: false,
        thanks: false,
        curious: false,
        satisfied: false
    },
    resized: false,
    menu: {
        viewed: false,
        used: false
    },
    social: {
        hover: false,
        clicked: false
    },
    share: {
        hover: false,
        clicked: false,
        google: false
    },
    devTools: false,
    orientation: {
        rotated: false
    },
    accelerometer: false
};
var HelloLevin = function() {
    Analytics.plus("devTools");
    return "thanks!!!"
};
var MobileMenu = {
    showing: false,
    show: function() {
        if (this.showing) return;
        this.showing = true;
        Analytics.plus("menu.viewed");
        Analytics.plus("menu.totalViews");
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
                MobileMenu.busy = false
            }
        })
    },
    hide: function(e) {
        if (!this.showing) return;
        this.showing = false;
        if (MobileLightbox.showing) MobileLightbox.hide();
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
                MobileMenu.busy = false;
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
                MobileMenu.$items.css({
                    top: "100%"
                });
                if (e) e()
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
            MobileMenu.hide(function() {
                Scroll.to(0);
                Analytics.plus("menu.used");
                Analytics.plus("menu.home")
            })
        });
        $("#mm-work").click(function(e) {
            MobileMenu.hide(function() {
                Scroll.to(Scroll.points.work);
                Analytics.plus("menu.used");
                Analytics.plus("menu.work")
            })
        });
        $("#mm-life").click(function(e) {
            MobileMenu.hide(function() {
                Scroll.to(Scroll.points.life);
                Analytics.plus("menu.used");
                Analytics.plus("menu.life")
            })
        });
        $("#mm-software").click(function(e) {
            MobileMenu.hide(function() {
                Scroll.to(Scroll.points.software);
                Analytics.plus("menu.used");
                Analytics.plus("menu.software")
            })
        });
        $("#mm-coding").click(function(e) {
            MobileMenu.hide(function() {
                Scroll.to(Scroll.points.coding);
                Analytics.plus("menu.used");
                Analytics.plus("menu.coding")
            })
        });
        $("#mm-contact").click(function(e) {
            MobileMenu.hide(function() {
                Scroll.to(Scroll.points.contact);
                Analytics.plus("menu.used");
                Analytics.plus("menu.contact")
            })
        });
        $("#mm-career").click(function(e) {
            MobileMenu.hide(function() {
                Scroll.to(Scroll.points.career);
                Analytics.plus("menu.used");
                Analytics.plus("menu.career")
            })
        })
    },
    busy: false,
    ready: true,
    toggle: function() {
        if (this.busy || !this.ready) return;
        this.busy = true;
        this.ready = false;
        if (this.showing) this.hide();
        else this.show()
    }
};
var deviceLearning = true;
var deviceY = [];
var deviceTotalY = 0;
var MobileLightbox = {
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
        Analytics.plus("work.viewed");
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
                MobileLightbox.update()
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
                MobileLightbox.$content.html("")
            }
        })
    },
    prev: function() {
        this.index--;
        if (this.index < 0) this.index = this.content.length - 1;
        this.update();
        Analytics.plus("work.swipePrev")
    },
    next: function() {
        this.index++;
        if (this.index > this.content.length - 1) this.index = 0;
        this.update();
        Analytics.plus("work.swipeNext")
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
        Analytics.plus("work." + this.analyticsKey[this.index])
    },
    init: function(e) {
        this.content = e;
        this.height = window.innerHeight - 47 - 37;
        this.width = window.innerWidth;
        $("#lm-content").css({
            height: this.height
        });
        $("#lightbox-exit_").click(function(e) {
            MobileLightbox.hide()
        });
        $(".dg-item").click(function(e) {
            e.preventDefault();
            MobileLightbox.show($(this).attr("lightbox-item"))
        });
        $("#lm-exit").click(function(e) {
            e.preventDefault();
            MobileLightbox.hide()
        })
    }
};
var insertWorkImages = function() {
    $("#work-1").html("<img src='assets/img/resume/square1.jpg' />");
    $("#work-2").html("<img src='assets/img/resume/square2.jpg' />");
    $("#work-3").html("<img src='assets/img/resume/square3b.jpg' />");
    $("#work-4").html("<img src='assets/img/resume/square4.jpg' />");
    $("#work-5").html("<img src='assets/img/resume/square5.jpg' />");
    $("#work-6").html("<img src='assets/img/resume/square6.jpg' />");
    $("#work-7").html("<img src='assets/img/resume/square7b.jpg' />");
    $("#work-8").html("<img src='assets/img/resume/square8b.jpg' />")
};
var checkJourney = function(e) {
    if (Scroll.satisfied) {
        if (Analytics.journey.work == false) {
            if (e > Scroll.work) Analytics.plus("journey.work")
        }
        if (Analytics.journey.quoteA == false) {
            if (e > Scroll.quoteA) Analytics.plus("journey.quoteA")
        }
        if (Analytics.journey.life == false) {
            if (e > Scroll.life) Analytics.plus("journey.life")
        }
        if (Analytics.journey.quoteB == false) {
            if (e > Scroll.quoteB) Analytics.plus("journey.quoteB")
        }
        if (Analytics.journey.software == false) {
            if (e > Scroll.software) Analytics.plus("journey.software")
        }
        if (Analytics.journey.quoteC == false) {
            if (e > Scroll.quoteC) Analytics.plus("journey.quoteC")
        }
        if (Analytics.journey.coding == false) {
            if (e > Scroll.coding) Analytics.plus("journey.coding")
        }
        if (Analytics.journey.quoteD == false) {
            if (e > Scroll.quoteD) Analytics.plus("journey.quoteD")
        }
        if (Analytics.journey.message == false) {
            if (e > Scroll.message) Analytics.plus("journey.message")
        }
        if (Analytics.journey.career == false) {
            if (e > Scroll.career) Analytics.plus("journey.career")
        }
        if (Analytics.journey.thanks == false) {
            if (e > Scroll.thanks) Analytics.plus("journey.thanks")
        }
        if (Analytics.journey.curious == false) {
            if (e > Scroll.curious) Analytics.plus("journey.curious");
            $("#scroll-satisfied").html("<div id='resume-cat'></div>")
        }
        if (Analytics.journey.satisfied == false) {
            if (e > Scroll.satisfied) Analytics.plus("journey.satisfied")
        }
    }
};
if (browser.touch || browser.mobile) {
    $("#share-this_, #socialize").remove();
    Analytics.type = "mobile.";
    Analytics.plus("count");
    $("#resume-menu").remove();
    if (browser.device) {
        if (browser.device.name == "iphone") Analytics.plus("device.iphone");
        else if (browser.device.name == "android") Analytics.plus("device.android");
        else Analytics.plus("device.other"); if (browser.layout != undefined) {
            if (browser.layout == "portrait") Analytics.plus("orientation.portrait");
            else if (browser.layout == "landscape") Analytics.plus("orientation.landscape")
        }
    }
    $("#scrolling").css({
        width: "100%",
        height: "100%",
        "overflow-y": "scroll",
        "overflow-x": "hidden",
        position: "absolute",
        left: 0,
        top: 0
    });
    if (window.devicePixelRatio) {
        var p = 1 / window.devicePixelRatio;
        TweenMax.set("#bg-circle-1, #bg-circle-2, #bg-circle-3, #bg-circle-4", {
            scale: p
        })
    }
    TweenMax.set("#sunflare1, #sunflare2, #sunflare3, #sunflare4", {
        scale: .4
    });
    Scroll.init("scrolling");
    Scrollbar.initHeight = $("#scrolling")[0].scrollHeight;
    Scroll.first = true;
    Scroll.home = window.innerHeight >> 1;
    Scroll.returnedHome = false;
    Scroll.checkReady = false;
    Scroll.firstAnimation = false;
    Scroll.patienceLevel = "none";
    Scroll.points = {
        home: 0,
        work: $("#scroll-misc-work").offset().top + window.innerHeight + 60,
        life: $("#scroll-life").offset().top + window.innerHeight,
        software: $("#scroll-software").offset().top + window.innerHeight,
        coding: $("#scroll-coding").offset().top + window.innerHeight,
        contact: $("#scroll-message").offset().top + window.innerHeight - 20,
        career: $("#scroll-history").offset().top + window.innerHeight + 10
    };
    browser.onOrientationChange = function(e) {
        Analytics.plus("orientation.rotated")
    };
    Scroll.onupdate = function(e, t) {
        circle1[t]();
        circle2[t]();
        circle3[t]();
        circle4[t]();
        if (!Scroll.animating) ResumeMenu.close();
        Scrollbar.update(e);
        if (Scroll.checkReady) {
            if (Scroll.first) {
                Scroll.first = false;
                Analytics.plus("firstScroll." + t);
                Analytics.plus("patience." + Scroll.patienceLevel)
            } else if (!Scroll.returnedHome) {
                if (e < Scroll.home) {
                    Scroll.returnedHome = true;
                    Analytics.plus("journey.home")
                }
            }
        }
        if (!Scroll.firstAnimation && Scroll.first) {
            Analytics.plus("patience." + Scroll.patienceLevel);
            Analytics.plus("firstScroll." + t);
            Scroll.first = false
        }
        checkJourney(e)
    };
    MobileLightbox.init([{
        type: "video",
        html: '<iframe src="//player.vimeo.com/video/24545228?title=0&byline=0&portrait=0" width="500" height="297" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        width: 500,
        height: 297,
        title: "Droid Does"
    }, {
        type: "video",
        html: '<iframe src="//player.vimeo.com/video/88411662?title=0&byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        width: 500,
        height: 281,
        title: "Virtual Store"
    }, {
        type: "video",
        html: '<iframe src="//player.vimeo.com/video/42053021?title=0&byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        width: 500,
        height: 281,
        title: "Kizuna Cranes"
    }, {
        type: "img",
        src: "img/resume/mobile/work-burning-man.jpg",
        size: "auto",
        title: "Burning Man",
        width: 640,
        height: 717
    }, {
        type: "img",
        src: "img/resume/mobile/work-room-to-roam.jpg",
        size: "auto",
        title: "Room to Roam",
        width: 640,
        height: 752
    }, {
        type: "video",
        html: '<iframe src="//player.vimeo.com/video/31409357?title=0&byline=0&portrait=0" width="500px" height="300px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        width: 500,
        height: 300,
        title: "Galaxy Explorer"
    }, {
        type: "video",
        html: '<iframe src="//player.vimeo.com/video/50856914?title=0&byline=0&portrait=0" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        width: 500,
        height: 375,
        title: "Kinect Puppetry"
    }, {
        type: "img",
        src: "img/resume/mobile/work-phoenix-goddess.jpg",
        size: "auto",
        title: "Phoenix Goddess",
        width: 640,
        height: 752
    }]);
    queue.loadManifest([{
        src: "img/resume/square1.jpg"
    }, {
        src: "img/resume/square2.jpg"
    }, {
        src: "img/resume/square3b.jpg"
    }, {
        src: "img/resume/square4.jpg"
    }, {
        src: "img/resume/square5.jpg"
    }]);
    if (window.DeviceMotionEvent != undefined) {
        Analytics.plus("accelerometer");
        MobileMenu.init();
        window.ondevicemotion = function(e) {
            if (deviceLearning) {
                deviceY.push(e.accelerationIncludingGravity.y);
                deviceTotalY += e.accelerationIncludingGravity.y;
                if (deviceY.length > 30) {
                    deviceY = deviceTotalY / 30;
                    deviceLearning = false
                }
            } else if (MobileMenu.active) {
                if (e.accelerationIncludingGravity.y > deviceY + 3) {
                    MobileMenu.toggle()
                } else if (e.accelerationIncludingGravity.y < deviceY + 1) {
                    MobileMenu.ready = true
                }
            }
        }
    }
    $("#scrolling").focus();
    $(".mms-item").click(function() {
        var e = $(this).attr("id").split("-")[1];
        Analytics.plus("social." + e);
        Analytics.plus("social.clicked")
    })
} else {
    Analytics.type = "desktop.";
    Analytics.plus("count");
    $("#mobile-question").remove();
    SocialMenu.init();
    if (window.DeviceMotionEvent != undefined) {
        Analytics.plus("accelerometer")
    }
    draw();
    $.get("assets/html/resume/socialize.html", function(e) {
        $("#socialize").html(e);
        $(".social-btn").attr("state-up", false);
        $(".social-btn").mouseover(function() {
            Analytics.plus("social.hover");
            Analytics.plus("social.hoverTotal");
            var e = "#" + $(this).attr("id");
            TweenMax.to(e + " .social-icon", .2, {
                rotation: -25,
                top: 10
            });
            TweenMax.to(e + " .social-shadow", .2, {
                opacity: .8,
                scale: .6
            });
            if (browser.name != "safari") TweenMax.to(e + " .social-shine-inner", .5, {
                top: -50
            });
            TweenMax.to(e + " .social-icon", 1, {
                rotationY: 360
            })
        });
        $(".social-btn").mouseout(function() {
            var e = "#" + $(this).attr("id");
            TweenMax.to(e + " .social-icon", .2, {
                rotation: 0,
                top: 20,
                onComplete: function() {
                    TweenMax.set(e + " .social-icon", {
                        rotationY: 0
                    })
                }
            });
            TweenMax.to(e + " .social-shadow", .2, {
                opacity: 1,
                scale: 1
            });
            if (browser.name != "safari") TweenMax.set(e + " .social-shine-inner", {
                top: 53
            })
        });
        $(".social-btn").click(function() {
            var e = $(this).attr("id").split("-")[1];
            Analytics.plus("social." + e);
            Analytics.plus("social.clicked")
        });
        $("#social-scroll-mail").click(function(e) {
            e.preventDefault();
            Scroll.to($("#scroll-message").offset().top - 20)
        })
    });
    if (browser.name == "chrome") Analytics.plus("browser.chrome");
    else if (browser.name == "safari") Analytics.plus("browser.safari");
    else if (browser.name == "firefox") Analytics.plus("browser.firefox");
    else if (browser.name == "ie") Analytics.plus("browser.ie");
    else Analytics.plus("browser.other");
    $.get("assets/html/resume/share.html", function(e) {
        $("body").append(e);
        window.twttr = function(e, t, n) {
            var r, i, s = e.getElementsByTagName(t)[0];
            if (e.getElementById(n)) return;
            i = e.createElement(t);
            i.id = n;
            i.src = "https://platform.twitter.com/widgets.js";
            s.parentNode.insertBefore(i, s);
            return window.twttr || (r = {
                _e: [],
                ready: function(e) {
                    r._e.push(e)
                }
            })
        }(document, "script", "twitter-wjs");
        twttr.ready(function(e) {
            e.events.bind("click", function(e) {
                Analytics.plus("share.clicked");
                Analytics.plus("share.twitter")
            })
        })
    });
    Scroll.init();
    Scroll.checkReady = false;
    Scroll.first = true;
    Scroll.home = window.innerHeight >> 1;
    Scroll.returnedHome = false;
    Scroll.firstAnimation = false;
    Scroll.patienceLevel = "none";
    Scroll.onupdate = function(e, t) {
        circle1[t]();
        circle2[t]();
        circle3[t]();
        circle4[t]();
        if (!Scroll.animating) ResumeMenu.close();
        if (Scroll.checkReady) {
            if (Scroll.first) {
                Scroll.first = false;
                Analytics.plus("firstScroll." + t);
                Analytics.plus("patience." + Scroll.patienceLevel)
            } else if (!Scroll.returnedHome) {
                if (e < Scroll.home) {
                    Scroll.returnedHome = true;
                    Analytics.plus("journey.home")
                }
            }
        }
        if (!Scroll.firstAnimation && Scroll.first) {
            Analytics.plus("patience." + Scroll.patienceLevel);
            Analytics.plus("firstScroll." + t);
            Scroll.first = false
        }
        checkJourney(e)
    };
    Lightbox.init([{
        type: "video",
        html: '<iframe src="//player.vimeo.com/video/24545228?title=0&byline=0&portrait=0" width="500" height="297" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        width: 500,
        height: 297,
        about: "<span>Droid Does</span> - face tracking - concept, research & development, AS3 development"
    }, {
        type: "video",
        html: '<iframe src="//player.vimeo.com/video/88411662?title=0&byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        width: 500,
        height: 281,
        about: "<span>Virtual Store</span> - arduino programming, c++/cinder development, design, video production / editing"
    }, {
        type: "video",
        html: '<iframe src="//player.vimeo.com/video/42053021?title=0&byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        width: 500,
        height: 281,
        about: "<span>Kizuna Cranes</span> - front end development, crane illustration, video art direction / design / animation"
    }, {
        type: "img",
        html: "<img src='assets/img/resume/burning-man.jpg' />",
        size: "auto",
        about: "<span>Burning Man 2012</span> - photography"
    }, {
        type: "img",
        html: "<img src='assets/img/resume/room-to-roam.jpg' />",
        size: "auto",
        about: "<span>Room to Roam</span> - art direction, 3d modeling / lighting / texturing"
    }, {
        type: "video",
        html: '<iframe src="//player.vimeo.com/video/31409357?title=0&byline=0&portrait=0" width="500px" height="300px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        width: 500,
        height: 300,
        about: "<span>Galaxy Explorer</span> - concept, game design, illustrations, JS development. debuted at Google Creative Sandbox"
    }, {
        type: "video",
        html: '<iframe src="//player.vimeo.com/video/50856914?title=0&byline=0&portrait=0" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        width: 500,
        height: 375,
        about: "<span>Kinect Puppetry</span> - kinectSDK with c++/cinder development, character illustration"
    }, {
        type: "img",
        html: "<img src='assets/img/resume/phoenix-goddess.jpg' />",
        size: "auto",
        about: "<span>Phoenix Sunrise Goddess</span> - photoshop illustration"
    }]);
    queue.loadManifest([{
        src: "assets/img/resume/social-mail.png"
    }, {
        src: "assets/img/resume/social-linkedin.png"
    }, {
        src: "assets/img/resume/social-github.png"
    }, {
        src: "assets/img/resume/social-tumblr.png"
    }, {
        src: "assets/img/resume/social-vimeo.png"
    }, {
        src: "assets/img/resume/social-pinterest.png"
    }, {
        src: "assets/img/resume/social-instagram.png"
    }, {
        src: "assets/img/resume/social-twitter.png"
    }]);
    insertWorkImages();
    if (browser.name != "ie") {
        console.log("/////////////////////////////////////////////////");
        console.log("/////////////////////////////////////////////////");
        console.log("/////////////////////////////////////////////////");
        console.log("/////////////////////////////////////////////////");
        console.log("");
        console.log("");
        console.log("");
        console.log("Hello curious developer! please invoke function HelloLevin() - thanks! :)");
        console.log("");
        console.log("");
        console.log("");
        console.log("/////////////////////////////////////////////////");
        console.log("/////////////////////////////////////////////////");
        console.log("/////////////////////////////////////////////////");
        console.log("/////////////////////////////////////////////////")
    }
}
window.addEventListener("load", function() {
    Scroll.work = $("#scroll-misc-work").offset().top - window.innerHeight;
    Scroll.quoteA = $("#quote1").offset().top - window.innerHeight;
    Scroll.life = $("#scroll-life").offset().top - window.innerHeight;
    Scroll.quoteB = $("#quote2").offset().top - window.innerHeight;
    Scroll.software = $("#scroll-software").offset().top - window.innerHeight;
    Scroll.quoteC = $("#quote3").offset().top - window.innerHeight;
    Scroll.coding = $("#scroll-coding").offset().top - window.innerHeight;
    Scroll.quoteD = $("#quote4").offset().top - window.innerHeight;
    Scroll.message = $("#scroll-message").offset().top - window.innerHeight;
    Scroll.career = $("#scroll-history").offset().top - window.innerHeight;
    Scroll.thanks = $("#scroll-finish").offset().top - window.innerHeight;
    Scroll.curious = $("#scroll-curious").offset().top - window.innerHeight;
    Scroll.satisfied = $("#scroll-satisfied").offset().top - window.innerHeight - 300;
}, false)
