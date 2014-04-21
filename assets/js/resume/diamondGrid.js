LV.DiamondGrid = function(e) {
    this.el = e;
    this.width = 380;
    this.minWidth = 400;
    this.side = 100;
    this.spaceX = 40;
    this.spaceY = 30;
    this.$el = $(e);
    this.$items = $(e).find(".dg-item");
    this.$itemsInner = $(e).find(".dg-item-inner");
    this.$spacers = $(e).find(".dg-spacer");
    this.$spacer1 = $(e).find(".dg-spacer-one");
    this.$spacer2 = $(e).find(".dg-spacer-two");
    this.rotate = function(e, t) {
        var t = t != undefined ? t : 1e3;
        var e = e != undefined ? e : 45;
        var n = 0;
        $(this.el + " .dg-item").each(function() {
            TweenMax.to($(this), t * .001, {
                delay: n * .1 * .8,
                rotationZ: e,
                ease: Back.easeOut
            });
            n++
        });
        var r = 0;
        $(this.el + " .dg-item-inner").each(function() {
            TweenMax.to($(this), t * .001, {
                delay: r * .1 * .8,
                rotationZ: -e,
                ease: Back.easeOut
            });
            r++
        })
    };
    this._open = null;
    this.open = function(e) {
        if (this._open) return;
        var e = !! e ? e : 0;
        this._open = true;
        $(this.el + " .dg-item_").css({
            width: "0%",
            height: "0%",
            left: "50%",
            top: "50%"
        });
        setTimeout(function() {
            this.rotate(45, 500);
            this.expand(500)
        }.bind(this), e)
    };
    this.openNormal = function(e) {
        if (this._open) return;
        this._open = true;
        var t = t != undefined ? t : 300;
        var n = 0;
        $(this.el + " .dg-item_").each(function() {
            TweenMax.to($(this), t * .001, {
                delay: n * .4 * .8,
                left: "0%",
                top: "0%",
                width: "100%",
                height: "100%",
                ease: Back.easeOut
            });
            n++
        })
    };
    this.close = function() {
        if (!this._open) return;
        this._open = false;
        var e = 0;
        $(this.el + " .dg-item").each(function() {
            TweenMax.set($(this), {
                rotationZ: 0
            });
            e++
        });
        var t = 0;
        $(this.el + " .dg-item-inner").each(function() {
            TweenMax.set($(this), {
                rotationZ: 0
            });
            t++
        });
        var n = 0;
        $(this.el + " .dg-item_").each(function() {
            TweenMax.to($(this), {
                left: "50%",
                top: "50%",
                width: "0%",
                height: "0%"
            });
            n++
        })
    };
    this.expand = function(e) {
        var e = e != undefined ? e : 300;
        var t = 0;
        $(this.el + " .dg-item_").each(function() {
            TweenMax.to($(this), e * .001, {
                delay: t * .1 * .8,
                left: "0%",
                top: "0%",
                width: "100%",
                height: "100%",
                ease: Back.easeOut
            });
            t++
        })
    };
    this.shrink = function(t) {
        var t = t != undefined ? t : 300;
        $(e + " .dg-item_").animate({
            width: "50%",
            height: "50%",
            left: "25%",
            top: "25%"
        }, t, "easeOutQuad")
    };
    this.reset = function() {
        TweenMax.to(this.el + " .dg-item", .001, {
            rotationZ: 0,
            ease: Elastic.easeOut
        });
        TweenMax.to(this.el + " .dg-item-inner", .001, {
            rotationZ: 0,
            ease: Elastic.easeOut
        })
    };
    this._update = function(e) {
        this.$el.css({
            width: e + 1,
            "font-size": e + "px"
        });
        this.$items.css({
            "font-size": e + "px"
        });
        return;
        var t = parseInt(e * .7894736842105263);
        this.side = t / 3;
        var n = this.side * .2;
        this.$el.css({
            width: e,
            marginTop: n,
            marginLeft: -e >> 1,
            paddingTop: this.side * .3
        });
        this.$items.css({
            width: this.side,
            height: this.side,
            "margin-top": this.side * -.3
        });
        this.spaceX = this.side * .4;
        this.$spacers.css({
            width: this.spaceX
        });
        var r = this.side + this.spaceX;
        this.$spacer1.css({
            width: this.side + this.spaceX
        });
        this.$spacer2.css({
            width: r >> 1
        })
    };
    this.update = function(e) {
        var t = e / 20;
        t = Math.floor(t * 20);
        this._update(t);
        return;
        if (e >= this.minWidth) {
            var n = e * .05263157894737;
            n *= 2;
            this._update(e - n)
        } else {
            this._update(e);
            $(this.el + " .dg-item_").css({
                width: "100%",
                height: "100%",
                left: "0%",
                top: "0%"
            });
            $(this.el + " .dg-item").attr("style", "");
            $(this.el + " .dg-item").attr("rotatex", "0");
            $(this.el + " .dg-item").attr("rotatey", "0");
            $(this.el + " .dg-item").attr("rotatez", "0")
        }
    };
    this.onresize = function(e) {
        var t = window.outerWidth;
        this.update(this.$el.parent().width());
        if (t > this.minWidth - 1) {
            this.open(1e3)
        } else {
            this.close()
        }
        return;
        var n = t / 20;
        n = Math.floor(n * 20);
        this._update(n);
        console.log(n);
        return;
        if (n >= 320) {
            var r = n * .05263157894737;
            r *= 2;
            this._update(n - r)
        } else this._update(t)
    };
    window.addEventListener("resize", this.onresize.bind(this), false)
};

LV.DiamondGrid.inst = new LV.DiamondGrid("#diamond");

LV.DiamondGrid.inst.minWidth = 640;
LV.DiamondGrid.inst.update($("#diamond-container").width());


LV.Scroll.markers.add("#open-diamond-grid", {
    onHit: function() {
        if (window.innerWidth >= 640) {
            LV.DiamondGrid.inst.open();
        } else {
            LV.DiamondGrid.inst.openNormal();
        };
    }
});