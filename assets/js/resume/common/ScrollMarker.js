LV.ScrollMarker = function(e, t) {
    this.el = e;
    this.$el = $(e);
    this.offset = -window.innerHeight >> 1;
    for (key in t) {
        this[key] = t[key]
    }
    this.hit = false;
    this.update();
};
LV.ScrollMarker.prototype = {
    update: function() {
        this.pos = this.$el.offset();
        this.startY = this.pos.top;
        this.startY += this.offset;
    },
    check: function() {
        if (!this.hit && LV.Scroll.top > this.startY) {
            this.hit = true;
            if (this.onHit) this.onHit();
        }
    }
};