(function($){
    
    var s5 = LV.Scroll.segments.add({
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
    
    var s6 = LV.Scroll.segments.add({
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

})(jQuery);