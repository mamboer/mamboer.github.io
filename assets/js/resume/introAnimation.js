(function($){
    
    var fixGlitch = function(){};

    LV.IntroAnimation = {
        play: function(e) {
            switch (e) {
                case -1:
                    LV.Scroll.firstAnimation = true;
                    LV.Scroll.patienceLevel = "loaded";
                    if (LV.Utils.browser.touch || LV.Utils.browser.mobile) {
                        LV.Scrollbar.show();
                        if (LV.Scroll.first || LV.Scroll.top < window.innerHeight) LV.Scroll.to(window.innerHeight, 1e3, function() {
                            LV.Scroll.checkReady = true;
                            LV.Scrollbar.hide();
                        });
                        else LV.Scroll.checkReady = true;
                    } else {
                        LV.SocialMenu.close(true);
                        if (LV.Scroll.first || LV.Scroll.top < window.innerHeight) LV.Scroll.to(window.innerHeight, 1e3, function() {
                            LV.Scroll.checkReady = true;
                        });
                        else LV.Scroll.checkReady = true;
                    }
                    LV.IntroAnimation.play(0);
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
                        onComplete: LV.IntroAnimation.play,
                        onCompleteParams: [1]
                    });
                    break;
                case 1:
                    LV.IntroAnimation.play(2);
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
                                    LV.Scrollbar.show();
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
                                    LV.Scrollbar.show();
                                    setTimeout(function() {
                                        $("#mq-question .mq-label").show();
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
                                                $("#mq-question .mq-label").show();
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
                        onComplete: LV.IntroAnimation.play,
                        onCompleteParams: [4]
                    });
                    TweenMax.to("fake", .6, {
                        left: "80%",
                        onComplete: LV.IntroAnimation.play,
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
                                                $("#desktop-message .mq-label").show();
                                            }, 1);
                                            LV.Scroll.patienceLevel = "smiley";
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
                            if (LV.Utils.browser.touch || LV.Utils.browser.mobile) LV.BackgroundCircle.render()
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
            }//switch
        }
    };

})(jQuery);