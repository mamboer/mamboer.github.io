var Polygon = function(e, t) {
    this.length = 0;
    this.addPoint(e);
    this.snap = null;
    this.svg = null;
    if (t) this.closePoly()
};
Polygon.prototype = {
    addPoint: function(e) {
        if (!e) return;
        if (Array.isArray(e)) {
            for (var t = 0, n = e.length; t < n; t++) {
                this[this.length] = e[t];
                this.length++
            }
        } else if (e instanceof Point) {
            this[this.length] = e;
            this.length++
        }
    },
    closePoly: function() {
        if (this.length > 0) {
            this.addPoint(this[0])
        }
    },
    getArray: function() {
        var e = [];
        for (var t = 0, n = this.length; t < n; t++) {
            e.push(this[t].x);
            e.push(this[t].y)
        }
        return e
    },
    createSVG: function(e) {
        this.snap = e;
        this.svg = this.snap.polygon(this.getArray());
        return this.svg
    }
};