(function($){
    var s4b = LV.Scroll.segments.add({
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

    LV.share = s4b;

    //desktop feature
    LV.share.initForDesktop = function(){
        s4b.timeline = new TimelineLite;
        s4b.timeline.to($("#share-this_"), .8, {
            delay: .2,
            opacity: 1
        });
        s4b.timeline.pause();
    };


})(jQuery);