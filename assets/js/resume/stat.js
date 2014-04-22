(function($){

    TweenMax.set(".stat", {
        left: "30%",
        opacity: 0
    });
    
    var $stats = $(".stat").each(function() {
        var id = this.id;
        var t = LV.Scroll.segments.add("#" + id, {
            onScroll: function(e, t) {
                e.timeline.seek(t);
                e.timeline2.seek(t)
            },
            offset: .03
        });
        t.timeline = new TimelineLite;
        t.timeline.to("#" + id, 1, {
            left: "0%",
            opacity: 1
        });
        t.timeline.pause();
        var n = $(this).attr("stat-level");
        t.timeline2 = new TimelineLite;
        t.timeline2.to("#" + id + " .stat-progress", 1, {
            width: n + "%"
        });
        t.timeline2.pause();
    });

    var updateStats = function() {
        var e = window.innerWidth;
        if (e < 980) {
            e -= 160;
            e = LV.Utils.map(e, 0, 820, 340, 820);
            if (window.innerWidth <= 640) {
                $stats.css({
                    "font-size": window.innerWidth + "px",
                    width: window.innerWidth + "px"
                })
            } else {
                $stats.css({
                    "font-size": e + "px",
                    width: e + "px"
                })
            }
        } else {
            $stats.css({
                "font-size": "820px",
                width: "820px"
            })
        }
    };

    LV.Utils.$win.on("resize.lv_stat",function(e){
        updateStats();
    });
    
    updateStats();


})(jQuery);

