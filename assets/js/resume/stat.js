TweenMax.set(".stat", {
    left: "30%",
    opacity: 0
});
$(".stat").each(function() {
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