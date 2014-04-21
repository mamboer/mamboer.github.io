//message module
(function($){

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

})(jQuery);


