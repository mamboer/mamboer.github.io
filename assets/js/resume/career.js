$(".career-item").each(function() {
    var id = this.id;
    var t = LV.Scroll.segments.add("#" + id, {
        onScroll: function(e, t) {
            e.timeline.seek(t)
        },
        offset: -.2
    });
    t.timeline = new TimelineLite;
    t.timeline.to("#" + id, 1, {
        top: 0,
        left: 0,
        opacity: 1
    });
    t.timeline.pause();
});