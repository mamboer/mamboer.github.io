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

    LV.share.initUI = function(){

        $.get("assets/html/resume/share.html", function(data) {
            $("body").append(data);
            window.twttr = function(e, t, n) {
                var r, i, s = e.getElementsByTagName(t)[0];
                if (e.getElementById(n)) return;
                i = e.createElement(t);
                i.id = n;
                i.src = "https://platform.twitter.com/widgets.js";
                s.parentNode.insertBefore(i, s);
                return window.twttr || (r = {
                    _e: [],
                    ready: function(e) {
                        r._e.push(e)
                    }
                })
            }(document, "script", "twitter-wjs");
            twttr.ready(function(e) {
                e.events.bind("click", function(e) {
                    LV.Analytics.plus("share.clicked");
                    LV.Analytics.plus("share.twitter")
                })
            });
        });

    };


})(jQuery);