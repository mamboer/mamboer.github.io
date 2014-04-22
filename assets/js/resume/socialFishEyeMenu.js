(function($){

    LV.FishEyeMenu = {
        _initEvts:function(){
            $(".social-btn").on("mouseenter",function() {
                LV.Analytics.plus("social.hover");
                LV.Analytics.plus("social.hoverTotal");
                var id = "#" + this.id;
                TweenMax.to(id + " .social-icon", .2, {
                    rotation: -25,
                    top: 10
                });
                TweenMax.to(id + " .social-shadow", .2, {
                    opacity: .8,
                    scale: .6
                });
                if (LV.Utils.browser.name != "safari") {
                    TweenMax.to(id + " .social-shine-inner", .5, {
                        top: -50
                    });
                }
                TweenMax.to(id + " .social-icon", 1, {
                    rotationY: 360
                })
            }).on('mouseleave',function() {
                var id = "#" + this.id;
                TweenMax.to(id + " .social-icon", .2, {
                    rotation: 0,
                    top: 20,
                    onComplete: function() {
                        TweenMax.set(id + " .social-icon", {
                            rotationY: 0
                        })
                    }
                });
                TweenMax.to(id + " .social-shadow", .2, {
                    opacity: 1,
                    scale: 1
                });
                if (LV.Utils.browser.name != "safari") {
                    TweenMax.set(id + " .social-shine-inner", {
                        top: 53
                    });
                };
            }).on('click',function() {
                var id = this.id.split("-")[1];
                LV.Analytics.plus("social." + id);
                LV.Analytics.plus("social.clicked")
            });

            $("#social-scroll-mail").click(function(e) {
                e.preventDefault();
                LV.Scroll.to($("#scroll-message").offset().top - 20);
            })
        },
        init:function(){
            $.get("assets/html/resume/socialize.html", function(data) {
                $("#socialize").html(data);
                
                $(".social-btn").attr("state-up", false);
                
                LV.FishEyeMenu._initEvts();

            });
        }

    };

})(jQuery);