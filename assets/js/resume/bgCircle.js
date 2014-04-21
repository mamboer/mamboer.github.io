(function($){

    LV.BackgroundCircle = function(e) {
        this.el = e;
        this.$el = $(e);
        this.width = this.$el.width();
        this.height = this.$el.height();
        this.scale = 1;
        if (window.devicePixelRatio) {
            this.scale = 1 / window.devicePixelRatio
        }
        this.directionY = -1;
        this.directionX = 1;
        this.offset = this.$el.offset();
        this.x = this.offset.left;
        this.y = this.offset.top;
        this.minY = (-this.height >> 1) - 10;
        this.maxY = window.innerHeight + (this.height >> 1) * this.scale + 10;
        this.minX = (-this.width >> 1) - 10;
        this.maxX = window.innerWidth + (this.width >> 1) * this.scale + 10;
        this.direction = null;
        this.down = function() {
            this.directionX = Math.random() * 2 - 1;
            TweenMax.to(this, .25, {
                directionY: -4,
                overwrite: 5,
                ease: Quad.easeIn
            });
            TweenMax.to(this, 1, {
                delay: .6,
                directionY: -.5 + Math.random() * -.5,
                overwrite: 5,
                ease: Quad.easeOut
            })
        };
        this.up = function() {
            this.directionX = Math.random() * 2 - 1;
            TweenMax.to(this, .25, {
                directionY: 4,
                overwrite: 5,
                ease: Quad.easeIn
            });
            TweenMax.to(this, 1, {
                delay: .6,
                directionY: .5 + Math.random() * .5,
                overwrite: 5,
                ease: Quad.easeOut
            })
        };
        this.update = function() {
            this.y += this.directionY;
            this.x += this.directionX;
            if (this.y < this.minY) this.y = this.maxY;
            else if (this.y > this.maxY) this.y = this.minY;
            if (this.x < this.minX) this.x = this.maxX;
            else if (this.x > this.maxX) this.x = this.minX;
            this.$el.css({
                top: this.y,
                left: this.x
            })
        };
        this.randomize = function(e, t, n, r) {
            var i = e + (t - e) * Math.random();
            var s = n + (r - n) * Math.random();
            this.$el.css({
                left: i,
                top: s
            });
            this.offset = this.$el.offset();
            this.x = i;
            this.y = s
        }
    };
    var circle1 = new LV.BackgroundCircle("#bg-circle-1");
    var circle2 = new LV.BackgroundCircle("#bg-circle-2");
    var circle3 = new LV.BackgroundCircle("#bg-circle-3");
    var circle4 = new LV.BackgroundCircle("#bg-circle-4");
    circle1.randomize(0, window.innerWidth >> 2, 0, window.innerHeight);
    circle2.randomize(window.innerWidth >> 2, window.innerWidth >> 1, 0, window.innerHeight);
    circle3.randomize(window.innerWidth >> 1, window.innerWidth * .75, 0, window.innerHeight);
    circle4.randomize(window.innerWidth * .75, window.innerWidth, 0, window.innerHeight);

    LV.BackgroundCircle.onScrollUpdate = function(e,t){

        circle1[t]();
        circle2[t]();
        circle3[t]();
        circle4[t]();
    };

    LV.BackgroundCircle.update = function(){
        circle1.update();
        circle2.update();
        circle3.update();
        circle4.update();
    };


})(jQuery);