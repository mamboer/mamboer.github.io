$(".quote").each(function() {
    var id = this.id;
    var t = LV.Scroll.segments.add("#" + id, {
        onScroll: function(e, t) {
            e.timeline.seek(t);
            e.timeline2.seek(t);
            e.timeline3.seek(t)
        }
    });
    t.timeline = new TimelineLite;
    t.timeline.to("#" + id, 1, {
        top: 0,
        opacity: 1
    });
    t.timeline.pause();
    t.timeline2 = new TimelineLite;
    t.timeline2.to("#" + id + " .quote-text", .8, {
        top: 0,
        opacity: 1
    });
    t.timeline2.pause();
    t.timeline3 = new TimelineLite;
    t.timeline3.to("#" + id + " .quote-by", .8, {
        delay: .2,
        left: 0,
        opacity: 1
    });
    t.timeline3.pause();
});