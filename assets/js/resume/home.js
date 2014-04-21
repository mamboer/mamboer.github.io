(function($){

    var s4 = LV.Scroll.segments.add({
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

})(jQuery);