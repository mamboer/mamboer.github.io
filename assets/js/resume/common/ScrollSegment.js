LV.ScrollSegment = function(e, t) {
    if (typeof e == "string") {
        this.el = e;
        this.$el = $(e);
    } else {
        for (key in e) {
            this[key] = e[key];
        };
    }
    this._range = .2;
    this.range = 0;
    this._offset = .05;
    this.offset = 0;
    for (key in t) {
        this[key] = t[key];
    }
    this.hit = false;
    this.finished = 0;
    this.update();
};
LV.ScrollSegment.prototype = {
    update: function() {
        if (!this.el) {
            this.deltaY = this.endY - this.startY;
            return;
        }
        this.pos = this.$el.offset();
        this.startY = this.endY = this.pos.top - window.innerHeight;
        var e = window.innerHeight;
        this.startY += (this._offset + this.offset) * e;
        this.endY += (this._range + this.range) * e;
        this.endY += (this._offset + this.offset) * e;
        this.deltaY = this.endY - this.startY;
        this.startY = parseInt(this.startY);
        this.endY = parseInt(this.endY);
        this.deltaY = parseInt(this.deltaY)
    },
    check: function() {
        if (!this.hit && LV.Scroll.top > this.startY) {
            this.hit = true;
            if (this.onHit) this.onHit();
        }
        if (LV.Scroll.top > this.startY) {
            if (LV.Scroll.top < this.endY) {
                var e = (LV.Scroll.top - this.startY) / this.deltaY;
                if (this.onScroll) this.onScroll(this, e);
                this.finished = 0
            } else {
                if (this.finished == 1) return;
                this.finished = 1;
                if (this.onScroll) this.onScroll(this, 1);
            }
        } else {
            if (this.finished == -1) return;
            this.finished = -1;
            if (this.onScroll) this.onScroll(this, 0);
        }
    }
};