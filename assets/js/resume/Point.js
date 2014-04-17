var Point = function(e, t) {
    this.x = e;
    this.y = t
};
Point.prototype = {
    distance: function(e) {
        return {
            x: this.distanceX(e),
            y: this.distanceY(e)
        }
    },
    distanceX: function(e) {
        return e.x - this.x
    },
    distanceY: function(e) {
        return e.y - this.y
    },
    angle: function(e, t) {
        return Trig.angle(this, e, t)
    },
    setXY: function(e, t) {
        this.x = e;
        this.y = t
    }
};