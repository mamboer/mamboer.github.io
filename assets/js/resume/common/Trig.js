LV.Trig = {
    pothag: function(e, t) {
        var n = Math.sq(e);
        var r = Math.sq(t);
        var i = n + r;
        return Math.sqrt(i)
    },
    xFromAngleHypotenuse: function(e, t) {
        return t * Math.cos(LV.Trig.toRad(e))
    },
    yFromAngleOpposite: function(e, t) {
        return t * Math.tan(LV.Trig.toRad(e))
    },
    xyFromAngleHypotenuse: function(e, t) {
        var n = {};
        n.x = LV.Trig.xFromAngleHypotenuse(e, t);
        n.y = LV.Trig.yFromAngleOpposite(e, n.x);
        return n
    },
    toDegrees: function(e) {
        return e * 57.29577951308232
    },
    toRad: function(e) {
        return e * .017453292519943295
    },
    angle: function(e, t, n) {
        var r;
        if (e instanceof LV.Point) r = e.distance(t);
        else r = {
            x: t.x - e.x,
            y: t.y - e.y
        };
        var i = LV.Trig.pothag(r.x, r.y);
        var s = (Math.sq(r.y) + Math.sq(i) - Math.sq(r.x)) / (2 * r.y * i);
        s = Math.acos(s);
        if (n) {
            s = LV.Trig.toDegrees(s);
            if (e.x > t.x) {
                s += 90;
                if (isNaN(s)) s = 180
            } else {
                s -= 180;
                s = Math.abs(s);
                s += 270;
                if (s == 360) s = 0;
                else if (s > 360) s -= 360;
                if (isNaN(s)) s = 0
            }
        }
        return s
    },
    UP: 1,
    UP_RIGHT: 2,
    RIGHT: 3,
    DOWN_RIGHT: 4,
    DOWN: 5,
    DOWN_LEFT: 6,
    LEFT: 7,
    UP_LEFT: 8,
    direction: function(e) {
        if (e <= 22.5 || e > 337.5) {
            return LV.Trig.RIGHT
        } else if (e <= 67.5) {
            return LV.Trig.DOWN_RIGHT
        } else if (e <= 112.5) {
            return LV.Trig.DOWN
        } else if (e <= 157.5) {
            return LV.Trig.DOWN_LEFT
        } else if (e <= 202.5) {
            return LV.Trig.LEFT
        } else if (e <= 247.5) {
            return LV.Trig.UP_LEFT
        } else if (e <= 292.5) {
            return LV.Trig.UP
        } else if (e <= 337.5) {
            return LV.Trig.UP_RIGHT
        }
    }
};