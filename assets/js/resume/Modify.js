window.Modify = window.Modify != undefined ? window.Modify : {};
Modify.svgElement = function(e) {
    e.saveAttr = function(e) {
        this.attr("_" + e, this.attr(e))
    };
    e.showing = true;
    e.hide = function() {
        if (!this.showing) return;
        this.showing = false;
        this.saveAttr("fill-opacity");
        this.saveAttr("stroke-opacity");
        this.attr({
            "fill-opacity": 0,
            "stroke-opacity": 0
        })
    };
    e.show = function() {
        if (this.showing) return;
        this.showing = true;
        this.attr({
            "fill-opacity": this.attr("_fill-opacity"),
            "stroke-opacity": this.attr("_stroke-opacity")
        })
    }
};