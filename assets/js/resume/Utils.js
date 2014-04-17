window.Math = window.Math != undefined ? window.Math : {};
Math.sq = function(e) {
    return e * e
};
window.Utils = window.Utils != undefined ? window.Utils : {};
Utils.map = function(e, t, n, r, i, s) {
    var o = (e - t) / (n - t);
    var u = i - r;
    var a = u * o;
    var f = r + a;
    if (s) {
        if (f > i) f = i;
        else if (f < r) f = r
    }
    return f
};