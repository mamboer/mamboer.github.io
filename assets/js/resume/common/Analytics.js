//Analytics module
LV.Analytics = {
    type: "desktop.",
    ready: true,
    plus: function(e) {
        if (!this.ready) return;
        var t = e.split(".");
        if (t.length == 1) {
            if (this[e] != undefined) {
                if (this[e] == true) return;
                else this[e] = true
            }
        } else if (t.length == 2) {
            if (this[t[0]] != undefined && this[t[0]][t[1]] != undefined) {
                if (this[t[0]][t[1]] == true) return;
                else this[t[0]][t[1]] = true
            }
        }
        //$.post("analytics/plus/" + this.type + e)
    },
    work: {
        viewed: false
    },
    journey: {
        home: false,
        work: false,
        quoteA: false,
        life: false,
        quoteB: false,
        software: false,
        quoteC: false,
        coding: false,
        quoteD: false,
        message: false,
        career: false,
        thanks: false,
        curious: false,
        satisfied: false
    },
    resized: false,
    menu: {
        viewed: false,
        used: false
    },
    social: {
        hover: false,
        clicked: false
    },
    share: {
        hover: false,
        clicked: false,
        google: false
    },
    devTools: false,
    orientation: {
        rotated: false
    },
    accelerometer: false,
    googleClicked : function() {
        this.plus("share.clicked");
        this.plus("share.google");
    }
};