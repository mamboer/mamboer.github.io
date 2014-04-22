(function($){

    LV.DiamondSVG = function(e, t, n) {
        this.$el = e;
        this.id = e.attr("id");
        this.width = e.width();
        this.height = e.height();
        this.polygon = null;
        this.svgID = null;
        this.svg = null;
        this.snap = null;
        this.create = function(e, t) {
            this.svgID = "#" + e;
            this.snap = new Snap(this.svgID);
            var t = !! t ? t : {
                fill: "white"
            };
            var n = !! t.stroke ? t.strokeWidth : 0;
            this.pointA = new LV.Point(n, this.height >> 1);
            this.pointB = new LV.Point(this.width >> 1, n);
            this.pointC = new LV.Point(this.width - n, this.height >> 1);
            this.pointD = new LV.Point(this.width >> 1, this.height - n);
            this.polygon = new LV.Polygon([this.pointA, this.pointB, this.pointC, this.pointD], true);
            this.polygon.createSVG(this.snap).attr(t);
        };
        if (t != undefined) this.create(t, n);
    };

    LV.DiamondSVGs = {
        length: 0,
        add: function(e, t) {
            var n = "diamond-svg-" + this.length;
            e.html('<svg id="' + n + '" style="width: 100%; height: 100%"></svg>');
            var r = new LV.DiamondSVG(e, n, t);
            this[this.length] = r;
            this.length++
        },
        findById: function(e) {
            for (var t = 0, n = this.length; t < n; t++) {
                if ( !! this[t].id) {
                    if (e == this[t].id) return this[t];
                }
            }
        }
    };
    $(".svg-diamond").each(function() {
        if ( !! $(this).attr("diamondStroke")){
            LV.DiamondSVGs.add($(this), {
                stroke: "white",
                fill: "none",
                strokeWidth: 2
            });
        } else {
            LV.DiamondSVGs.add($(this));
        };
    });

})(jQuery);