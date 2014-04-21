window.Math = window.Math != undefined ? window.Math : {};
Math.sq = function(e) {
    return e * e
};

//utils module
LV.Utils = {

    map : function(e, t, n, r, i, s) {
        var o = (e - t) / (n - t);
        var u = i - r;
        var a = u * o;
        var f = r + a;
        if (s) {
            if (f > i) f = i;
            else if (f < r) f = r
        }
        return f
    },

    capitaliseFirstLetter : function (e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
    },

    browser : new LV.Browser(),

    $body : $('body'),

    $win : $(window),

    $doc : $(document),

    $html : $('html')

};