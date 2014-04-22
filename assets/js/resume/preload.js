(function($){

    var M = {
        initWorkImages:function(){
            $("#work-1").html("<img src='assets/img/resume/square1.jpg' />");
            $("#work-2").html("<img src='assets/img/resume/square2.jpg' />");
            $("#work-3").html("<img src='assets/img/resume/square3b.jpg' />");
            $("#work-4").html("<img src='assets/img/resume/square4.jpg' />");
            $("#work-5").html("<img src='assets/img/resume/square5.jpg' />");
            $("#work-6").html("<img src='assets/img/resume/square6.jpg' />");
            $("#work-7").html("<img src='assets/img/resume/square7b.jpg' />");
            $("#work-8").html("<img src='assets/img/resume/square8b.jpg' />");
        },
        onComplete:function() {
            var e = (new Date).getTime() - this.preloadStart;
            var t = e < 5e3 ? 5e3 - e : 500;
            if (!LV.Utils.browser.mobile && !LV.Utils.browser.touch) {
                if (t < 4e3) t = 4e3;
            };
            t *= .001;

            TweenMax.to("#rlb-progress", t, {
                width: "100%",
                onComplete: function() {
                    if (LV.Utils.browser.mobile || LV.Utils.browser.touch) M.initWorkImages();
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
                        onStart: LV.IntroAnimation.play,
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

            LV.Scrollbar.init("#scrolling", {
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
                });
            }
        },
        onProgress:function(e) {
            var t = Math.round(e.progress * 100 * .8);
            if (t == 0) t = 1;
            this.$progress.css({
                width: t + "%"
            });
        },
        preloadStart : (new Date).getTime(),
        init:function(){
            this.$progress = $("#rlb-progress");
            this.queue = new createjs.LoadQueue(true);
            this.queue.on("complete", this.onComplete, this);
            this.queue.on("progress", this.onProgress, this);
        }
    };

    M.init();

    LV.preload = M;

})(jQuery);