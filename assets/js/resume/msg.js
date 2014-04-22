//message module
(function($){

    LV.Message = {
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
                    LV.Message.busy = false;
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
                            LV.Message.hide();
                        }
                    });
                    LV.Analytics.plus("messages");
                } else {
                    $("#message-sent").html(". 额! .<br /><br/><span>消息服务器堵塞.. 你可以给我email:</span><br /><span style=\"font-family:'Gotham Light'; font-size: 16px;\">cocoayoyo[AT]gmail.com</span>");
                    LV.Message.hide();
                }
            }, "json");
        },
        init:function(){
            $("#send-btn").on('click',function() {
                var m = LV.Message._validate();
                if(!m) return false;
                LV.Message.send(m);
            });
            this.animate();

        },//init
        _validate:function(){
            if (LV.Message.busy) return false;

            var e = $("#input-name input").val(),
                t = $("#input-email input").val(),
                n = $("#input-message textarea").val(),
                r = true;
            
            if (e.length == 0) {
                LV.Message.showError("name");
                r = false;
            }
            if (r) {
                if (t.length == 0) {
                    $("#error-email .error-label").html("请输入EMail地址");
                    LV.Message.showError("email");
                    r = false;
                } else if (t.length < 6 || t.indexOf("@") == -1 || t.indexOf(".") == -1 || t.indexOf(".") < t.indexOf("@")) {
                    $("#error-email .error-label").html("额.. EMail地址无效");
                    LV.Message.showError("email");
                    r = false;
                }
            }
            if (r) {
                if (n.length == 0) {
                    $("#error-message .error-label").html("随便写点东西吧！");
                    LV.Message.showError("message");
                    r = false;
                } else if (n.length < 5) {
                    $("#error-message .error-label").html("能多写几个字吧！");
                    LV.Message.showError("message");
                    r = false;
                }
            }
            if (!r) {
                LV.Message.busy = true;
                $("#sending-label").html("WOMP");
                $("#sending").css("display", "block");
                return false;
            } else {
                LV.Message.busy = true;
                $("#sending-label").html("发送中...");
                $("#sending").css("display", "block");
            }
            var i = {
                name: LV.Utils.capitaliseFirstLetter(e).replace(/[|&;$%"'<>()+,]/g, ""),
                email: t.replace(/[|&;$%"'<>()+,]/g, ""),
                message: n.replace(/[|&;$%"'<>()+,]/g, "")
            };

            return i;
        },
        animate:function(){
            TweenMax.set("#message-diamond-svg", {
                rotationZ: -180,
                scale: 0
            });
            var s1 = LV.Scroll.segments.add("#message-diamond", {
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
            var s2 = LV.Scroll.segments.add("#input-name", {
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
            var s3 = LV.Scroll.segments.add("#send-btn", {
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
        }//animate
    };
    
    LV.Message.init();

})(jQuery);


