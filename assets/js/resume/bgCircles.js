LV.BackgroundCircles = {
    0: "#bg-circle-1",
    1: "#bg-circle-2",
    2: "#bg-circle-3",
    3: "#bg-circle-4",
    length: 4,
    randomize: function() {
        var e = window.innerWidth >> 2;
        for (var t = 0, n = this.length; t < n; t++) {
            $(this[t]).css({
                left: e * t + e * Math.random(),
                top: Math.random() * window.innerHeight
            })
        }
    },
    start: function() {
        this.randomize();
    },
    direction: null,
    down: function() {
        if (this.direction == "down") return;
        this.direction = "down";
        for (var e = 0, t = this.length; e < t; e++) {
            TweenMax.to(this[e], Math.random() * 100, {
                top: -$(this[e]).height() - Math.random() * 1e3,
                left: "+=500",
                overwrite: 5,
                ease: Quad.easeOut
            })
        }
    },
    up: function() {
        if (this.direction == "up") return;
        this.direction = "up";
        for (var e = 0, t = this.length; e < t; e++) {
            TweenMax.to(this[e], Math.random() * 100, {
                top: $(this[e]).height() + Math.random() * 1e3,
                left: "-=500",
                overwrite: 5,
                ease: Quad.easeOut
            })
        }
    }
};