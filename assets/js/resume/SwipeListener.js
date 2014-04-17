var SwipeListener = function(e, t, n) {
    this.element = e;
    this.startTime;
    this.offsetX = e.offsetLeft;
    this.offsetY = e.offsetTop;
    this.reset();
    this.minX = 0;
    this.minY = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.width = e.offsetWidth;
    this.height = e.offsetHeight;
    this.options = t || {};
    if (this.element.addEventListener) {
        this.element.addEventListener("mousedown", this, false);
        this.element.addEventListener("touchstart", this, false);
        this.element.addEventListener("drag", this, false);
        this.element.addEventListener("touchmove", this, false);
        window.addEventListener("mouseup", this, false);
        window.addEventListener("touchleave", this, false);
        window.addEventListener("touchcancel", this, false);
        window.addEventListener("touchend", this, false);
        window.addEventListener("resize", this, false)
    }
    if (this.options.minX) this.minX = this.options.minX;
    if (this.options.minY) this.minY = this.options.minY;
    if (this.options.minXPercent) this.minX = this.options.minXPercent;
    if (this.options.minYPercent) this.minY = this.options.minYPercent;
    this.onResize();
    if (typeof t == "function") t(this);
    else if (n && typeof n == "function") n(this)
};
SwipeListener.prototype = {
    reset: function() {
        this.x = null;
        this.y = null;
        this.startX = null;
        this.startY = null;
        this.endX = null;
        this.endY = null;
        this.globalX = null;
        this.globalY = null;
        this.globalStartX = null;
        this.globalStartY = null;
        this.globalEndX = null;
        this.globalEndY = null;
        this.moved = false;
        this.deltaTime = null
    },
    isTouchDevice: function() {
        return "ontouchstart" in window || "onmsgesturechange" in window
    },
    handleEvent: function(e) {
        switch (e.type) {
            case "touchstart":
                this.onTouchStart(e);
                break;
            case "drag":
            case "touchmove":
                this.onTouchMove(e);
                break;
            case "touchcancel":
            case "touchleave":
            case "touchend":
                this.onTouchEnd(e);
                break;
            case "resize":
                this.onResize(e);
                break
        }
    },
    onTouchStart: function(e) {
        this.reset();
        this.startTime = new Date;
        if (e.touches && e.touches[0]) {
            this.globalStartX = e.touches[0].pageX;
            this.globalStartY = e.touches[0].pageY
        } else {
            this.globalStartX = e.x;
            this.globalStartY = e.y
        }
        this.startX = this.globalStartX - this.offsetX;
        this.startY = this.globalStartY - this.offsetY;
        if (this.options.onTouchStart) this.options.onTouchStart(this)
    },
    onTouchMove: function(e) {
        if (e.touches && e.touches[0]) {
            this.globalX = e.touches[0].pageX;
            this.globalY = e.touches[0].pageY
        } else {
            this.globalX = e.x;
            this.globalY = e.y
        }
        this.moved = true;
        var t = this.globalX - this.globalStartX;
        var n = this.globalY - this.globalStartY;
        this.deltaX = t;
        this.deltaY = n;
        this.x = this.globalX - this.offsetX;
        this.y = this.globalY - this.offsetY;
        if (this.options.onTouchMove) this.options.onTouchMove(this)
    },
    onTouchEnd: function(e) {
        var t = new Date - this.startTime;
        if (!this.moved) {
            if (this.options.onTouchCancel) this.options.onTouchCancel(this);
            this.reset();
            return
        }
        this.deltaTime = t;
        if (e.touches) {
            if (e.touches[0]) {
                this.globalEndX = e.touches[0].pageX;
                this.globalEndY = e.touches[0].pageY
            } else {
                this.globalEndX = this.globalX;
                this.globalEndY = this.globalY
            }
        } else {
            this.globalEndX = e.x;
            this.globalEndY = e.y
        }
        this.endX = this.globalEndX - this.offsetX;
        this.endY = this.globalEndY - this.offsetY;
        var n = this.globalEndX - this.globalStartX;
        var r = this.globalEndY - this.globalStartY;
        this.deltaX = n;
        this.deltaY = r;
        var i = Math.abs(n);
        var s = Math.abs(r);
        var o = i / this.width;
        var u = s / this.height;
        if (this.options.onTouchEnd) this.options.onTouchEnd(this);
        if (i > s) {
            if (this.minX < i) {
                if (n < 0) {
                    if (this.options.onSwipeLeft) {
                        this.options.onSwipeLeft(this)
                    }
                } else {
                    if (this.options.onSwipeRight) {
                        this.options.onSwipeRight(this)
                    }
                }
            }
        } else {
            if (this.minY < s) {
                if (r < 0) {
                    if (this.options.onSwipeUp) {
                        this.options.onSwipeUp(this)
                    }
                } else {
                    if (this.options.onSwipeDown) {
                        this.options.onSwipeDown(this)
                    }
                }
            }
        } if (this.options.onSwipe) this.options.onSwipe(this);
        this.reset()
    },
    onResize: function(e) {
        this.width = this.element.offsetWidth;
        this.height = this.element.offsetHeight;
        if (this.options.onResize) this.options.onResize(this)
    }
};