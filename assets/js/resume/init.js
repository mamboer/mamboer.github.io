(function($){

    var bootUp = {
        hi:function() {
            LV.Analytics.plus("devTools");
            return "感谢访问FASO.ME!!!"
        },
        rock:function(){

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
            }, false);

        }
    };

    bootUp.rock();

    LV.hi = bootUp.hi;

})(jQuery);