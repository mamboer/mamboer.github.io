//@sourceURL=assets/js/resume/main.js

var draw = function() {
    if (LV.Utils.browser.mobile || LV.Utils.browser.touch) {
        if (MobileMenu.showing || MobileLightbox.showing) {
            requestAnimationFrame(draw);
            return
        }
    }
    LV.BackgroundCircle.update();
    requestAnimationFrame(draw)
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
        this.pointA = new LV.Point(n, this.height >> 1);
        this.pointB = new LV.Point(this.width >> 1, n);
        this.pointC = new LV.Point(this.width - n, this.height >> 1);
        this.pointD = new LV.Point(this.width >> 1, this.height - n);
        this.polygon = new LV.Polygon([this.pointA, this.pointB, this.pointC, this.pointD], true);
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
        e = LV.Utils.map(e, 0, 820, 340, 820);
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
                LV.Scroll.firstAnimation = true;
                LV.Scroll.patienceLevel = "loaded";
                if (LV.Utils.browser.touch || LV.Utils.browser.mobile) {
                    Scrollbar.show();
                    if (LV.Scroll.first || LV.Scroll.top < window.innerHeight) LV.Scroll.to(window.innerHeight, 1e3, function() {
                        LV.Scroll.checkReady = true;
                        Scrollbar.hide()
                    });
                    else LV.Scroll.checkReady = true
                } else {
                    SocialMenu.close(true);
                    if (LV.Scroll.first || LV.Scroll.top < window.innerHeight) LV.Scroll.to(window.innerHeight, 1e3, function() {
                        LV.Scroll.checkReady = true
                    });
                    else LV.Scroll.checkReady = true
                }
                IntroAnimation.play(0);
                break;
            case 0:
                var t = .7;
                var n = window.innerWidth > 800 ? 1 : LV.Utils.map(window.innerWidth, 320, 800, .55, 1);
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
                if (LV.Utils.browser.touch || LV.Utils.browser.mobile) {
                    $("#mq-yes").click(function() {
                        LV.Analytics.plus("handed.right");
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
                                if (LV.Utils.browser.layout == "portrait" && window.DeviceMotionEvent != undefined) {
                                    $("#mq-question .mq-label").css({
                                        marginTop: 8
                                    });
                                    $("#mq-question .mq-label").html("Tilt phone to<br />SHOW/HIDE menu");
                                    e = 3.2;
                                    MobileMenu.active = true
                                } else $("#mq-question .mq-label").html("Got it, thanks!");
                                $("#mq-question .mq-label").hide();
                                LV.Scroll.patienceLevel = "message";
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
                                        LV.Scroll.patienceLevel = "smiley"
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
                        LV.Analytics.plus("handed.left");
                        TweenMax.to("#mq-no .mq-shine", .1, {
                            yoyo: true,
                            repeat: 3,
                            opacity: 1,
                            onComplete: function() {
                                var e = 2.2;
                                if (LV.Utils.browser.layout == "portrait" && window.DeviceMotionEvent != undefined) {
                                    $("#mq-question .mq-label").css({
                                        marginTop: 8
                                    });
                                    $("#mq-question .mq-label").html("Tilt phone to<br />SHOW/HIDE menu");
                                    e = 3.2;
                                    MobileMenu.active = true
                                } else $("#mq-question .mq-label").html("Got it, thanks!");
                                $("#mq-question .mq-label").hide();
                                LV.Scroll.patienceLevel = "message";
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
                                        LV.Scroll.patienceLevel = "smiley"
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
                            LV.Scroll.patienceLevel = "question"
                        }
                    })
                } else {
                    /*
                    FB.Event.subscribe("edge.create", function(e) {
                        LV.Analytics.plus("share.clicked");
                        LV.Analytics.plus("share.facebook")
                    });
                    $("#pin-it").click(function() {
                        LV.Analytics.plus("share.clicked");
                        LV.Analytics.plus("share.pinterest")
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
                        if (!LV.Utils.browser.touch && !LV.Utils.browser.mobile) TweenMax.to("#desktop-message", .5, {
                            marginTop: -220,
                            opacity: 1,
                            onComplete: function() {
                                LV.Scroll.patienceLevel = "message";
                                TweenMax.to("fake", 3.5, {
                                    onComplete: function() {
                                        $("#desktop-message .mq-label").html(":)");
                                        $("#desktop-message .mq-label").hide();
                                        setTimeout(function() {
                                            $("#desktop-message .mq-label").show()
                                        }, 1);
                                        LV.Scroll.patienceLevel = "smiley"
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
                        if (LV.Utils.browser.touch || LV.Utils.browser.mobile) draw()
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
    if (!LV.Utils.browser.mobile && !LV.Utils.browser.touch) {
        if (t < 4e3) t = 4e3
    }
    t *= .001;
    TweenMax.to("#rlb-progress", t, {
        width: "100%",
        onComplete: function() {
            if (LV.Utils.browser.mobile || LV.Utils.browser.touch) insertWorkImages()
        }
    });
    TweenMax.to("#rlb-progress", .05, {
        delay: t - .1,
        yoyo: true,
        repeat: 5,
        opacity: 0,
        onComplete: function() {
            if (LV.Utils.browser.touch || LV.Utils.browser.mobile) {
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
            if (!LV.Scroll.first && LV.Scroll.top > window.innerHeight) e = "100%";
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
    if (!LV.Utils.browser.mobile && !LV.Utils.browser.touch) {
        LV.share.initForDesktop();
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
                    if (LV.Utils.browser.name != "safari") TweenMax.to(t + " .social-shine-inner", .5, {
                        delay: e * .2 * .8,
                        top: -50
                    });
                    TweenMax.to(t + " .social-icon", 1, {
                        delay: e * .2 * .8,
                        rotationY: 360,
                        onComplete: function() {
                            if (LV.Utils.browser.name != "safari") {
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
                LV.Analytics.plus("messages")
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
        name: LV.Utils.capitaliseFirstLetter(e).replace(/[|&;$%"'<>()+,]/g, ""),
        email: t.replace(/[|&;$%"'<>()+,]/g, ""),
        message: n.replace(/[|&;$%"'<>()+,]/g, "")
    };
    Message.send(i)
});
var $el = document.getElementById("scrolling");
var swipeListener = new LV.SwipeListener($el, {
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
            t = LV.Utils.map(n, 50, 100, 1, 2)
        } else {
            t = LV.Utils.map(n, 100, 200, 2, 2.5)
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
var mobileSwipeListener = new LV.SwipeListener($lightboxMobile, {
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
    LV.Analytics.plus("share.clicked");
    LV.Analytics.plus("share.google")
};
var SocialMenu = {
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

var HelloLevin = function() {
    LV.Analytics.plus("devTools");
    return "thanks!!!"
};
var MobileMenu = {
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
                LV.Scroll.to(0);
                LV.Analytics.plus("menu.used");
                LV.Analytics.plus("menu.home")
            })
        });
        $("#mm-work").click(function(e) {
            MobileMenu.hide(function() {
                LV.Scroll.to(LV.Scroll.points.work);
                LV.Analytics.plus("menu.used");
                LV.Analytics.plus("menu.work")
            })
        });
        $("#mm-life").click(function(e) {
            MobileMenu.hide(function() {
                LV.Scroll.to(LV.Scroll.points.life);
                LV.Analytics.plus("menu.used");
                LV.Analytics.plus("menu.life")
            })
        });
        $("#mm-software").click(function(e) {
            MobileMenu.hide(function() {
                LV.Scroll.to(LV.Scroll.points.software);
                LV.Analytics.plus("menu.used");
                LV.Analytics.plus("menu.software")
            })
        });
        $("#mm-coding").click(function(e) {
            MobileMenu.hide(function() {
                LV.Scroll.to(LV.Scroll.points.coding);
                LV.Analytics.plus("menu.used");
                LV.Analytics.plus("menu.coding")
            })
        });
        $("#mm-contact").click(function(e) {
            MobileMenu.hide(function() {
                LV.Scroll.to(LV.Scroll.points.contact);
                LV.Analytics.plus("menu.used");
                LV.Analytics.plus("menu.contact")
            })
        });
        $("#mm-career").click(function(e) {
            MobileMenu.hide(function() {
                LV.Scroll.to(LV.Scroll.points.career);
                LV.Analytics.plus("menu.used");
                LV.Analytics.plus("menu.career")
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
            MobileLightbox.hide();
        });
        $(".dg-item").click(function(e) {
            e.preventDefault();
            MobileLightbox.show($(this).attr("lightbox-item"))
        });
        $("#lm-exit").click(function(e) {
            e.preventDefault();
            MobileLightbox.hide();
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
if (LV.Utils.browser.touch || LV.Utils.browser.mobile) {
    $("#share-this_, #socialize").remove();
    LV.Analytics.type = "mobile.";
    LV.Analytics.plus("count");
    $("#resume-menu").remove();
    if (LV.Utils.browser.device) {
        if (LV.Utils.browser.device.name == "iphone") LV.Analytics.plus("device.iphone");
        else if (LV.Utils.browser.device.name == "android") LV.Analytics.plus("device.android");
        else LV.Analytics.plus("device.other"); if (LV.Utils.browser.layout != undefined) {
            if (LV.Utils.browser.layout == "portrait") LV.Analytics.plus("orientation.portrait");
            else if (LV.Utils.browser.layout == "landscape") LV.Analytics.plus("orientation.landscape")
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
    LV.Scroll.init("scrolling");
    Scrollbar.initHeight = $("#scrolling")[0].scrollHeight;
    LV.Scroll.first = true;
    LV.Scroll.home = window.innerHeight >> 1;
    LV.Scroll.returnedHome = false;
    LV.Scroll.checkReady = false;
    LV.Scroll.firstAnimation = false;
    LV.Scroll.patienceLevel = "none";
    LV.Scroll.points = {
        home: 0,
        work: $("#scroll-misc-work").offset().top + window.innerHeight + 60,
        life: $("#scroll-life").offset().top + window.innerHeight,
        software: $("#scroll-software").offset().top + window.innerHeight,
        coding: $("#scroll-coding").offset().top + window.innerHeight,
        contact: $("#scroll-message").offset().top + window.innerHeight - 20,
        career: $("#scroll-history").offset().top + window.innerHeight + 10
    };
    LV.Utils.browser.onOrientationChange = function(e) {
        LV.Analytics.plus("orientation.rotated")
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
        LV.Analytics.plus("accelerometer");
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
        LV.Analytics.plus("social." + e);
        LV.Analytics.plus("social.clicked")
    })
} else {
    LV.Analytics.type = "desktop.";
    LV.Analytics.plus("count");
    $("#mobile-question").remove();
    SocialMenu.init();
    if (window.DeviceMotionEvent != undefined) {
        LV.Analytics.plus("accelerometer")
    }
    draw();
    $.get("assets/html/resume/socialize.html", function(e) {
        $("#socialize").html(e);
        $(".social-btn").attr("state-up", false);
        $(".social-btn").mouseover(function() {
            LV.Analytics.plus("social.hover");
            LV.Analytics.plus("social.hoverTotal");
            var e = "#" + $(this).attr("id");
            TweenMax.to(e + " .social-icon", .2, {
                rotation: -25,
                top: 10
            });
            TweenMax.to(e + " .social-shadow", .2, {
                opacity: .8,
                scale: .6
            });
            if (LV.Utils.browser.name != "safari") TweenMax.to(e + " .social-shine-inner", .5, {
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
            if (LV.Utils.browser.name != "safari") TweenMax.set(e + " .social-shine-inner", {
                top: 53
            })
        });
        $(".social-btn").click(function() {
            var e = $(this).attr("id").split("-")[1];
            LV.Analytics.plus("social." + e);
            LV.Analytics.plus("social.clicked")
        });
        $("#social-scroll-mail").click(function(e) {
            e.preventDefault();
            LV.Scroll.to($("#scroll-message").offset().top - 20)
        })
    });
    if (LV.Utils.browser.name == "chrome") LV.Analytics.plus("browser.chrome");
    else if (LV.Utils.browser.name == "safari") LV.Analytics.plus("browser.safari");
    else if (LV.Utils.browser.name == "firefox") LV.Analytics.plus("browser.firefox");
    else if (LV.Utils.browser.name == "ie") LV.Analytics.plus("browser.ie");
    else LV.Analytics.plus("browser.other");
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
                LV.Analytics.plus("share.clicked");
                LV.Analytics.plus("share.twitter")
            })
        })
    });
    LV.Scroll.init();
    LV.Scroll.checkReady = false;
    LV.Scroll.first = true;
    LV.Scroll.home = window.innerHeight >> 1;
    LV.Scroll.returnedHome = false;
    LV.Scroll.firstAnimation = false;
    LV.Scroll.patienceLevel = "none";
    
    LV.Lightbox.init([{
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
    if (LV.Utils.browser.name != "ie") {
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
    LV.Scroll.work = $("#scroll-misc-work").offset().top - window.innerHeight;
    LV.Scroll.quoteA = $("#quote1").offset().top - window.innerHeight;
    LV.Scroll.life = $("#scroll-life").offset().top - window.innerHeight;
    LV.Scroll.quoteB = $("#quote2").offset().top - window.innerHeight;
    LV.Scroll.software = $("#scroll-software").offset().top - window.innerHeight;
    LV.Scroll.quoteC = $("#quote3").offset().top - window.innerHeight;
    LV.Scroll.coding = $("#scroll-coding").offset().top - window.innerHeight;
    LV.Scroll.quoteD = $("#quote4").offset().top - window.innerHeight;
    LV.Scroll.message = $("#scroll-message").offset().top - window.innerHeight;
    LV.Scroll.career = $("#scroll-history").offset().top - window.innerHeight;
    LV.Scroll.thanks = $("#scroll-finish").offset().top - window.innerHeight;
    LV.Scroll.curious = $("#scroll-curious").offset().top - window.innerHeight;
    LV.Scroll.satisfied = $("#scroll-satisfied").offset().top - window.innerHeight - 300;
}, false)
