var Browser = function(e) {
    this.userAgent = navigator.userAgent;
    this.ua = this.userAgent.toLowerCase();
    this.name = null;
    this.version = null;
    this.versionFull = null;
    if (window.orientation != undefined) this.mobile = true;
    else this.mobile = false; if ("ontouchstart" in window || "onmsgesturechange" in window) this.touch = true;
    else this.touch = false;
    this.osDetected = function(e) {
        this.os = {
            name: e,
            version: null,
            versionFull: null
        }
    };
    this.deviceDetected = function(e) {
        this.device = {
            name: e,
            osVersion: null,
            osVersionFull: null
        }
    };
    if (this.ua.indexOf("iphone") != -1) {
        this.deviceDetected("iphone")
    } else if (this.ua.indexOf("ipad") != -1) {
        this.deviceDetected("ipad")
    } else if (this.ua.indexOf("android") != -1) {
        this.deviceDetected("android");
        if (this.ua.indexOf("version/") != -1) this.device.osVersion = this.ua.split("version/")[1].split(".")[0];
        if (this.ua.indexOf("android ") != -1) this.device.osVersionFull = this.ua.split("android ")[1].split(";")[0]
    }
    if (this.device && (this.device.name == "iphone" || this.device.name == "ipad")) {
        if (this.ua.indexOf("version/") != -1) this.device.osVersion = this.ua.split("version/")[1].split(".")[0];
        if (this.userAgent.indexOf(" OS ")) {
            if (this.userAgent.indexOf(" like ")) this.device.osVersionFull = this.userAgent.split(" OS ")[1].split(" like ")[0].split("_").join(".")
        }
    }
    this.ielt9 = false;
    this.name = this.ua.match(/android/gi);
    if (this.name == null) this.name = this.ua.match(/chrome/gi);
    if (this.name == null) this.name = this.ua.match(/safari/gi);
    if (this.name == null) this.name = this.ua.match(/firefox/gi);
    if (this.name == null) this.name = this.ua.match(/msie/gi);
    if (this.name && this.name instanceof Array) this.name = this.name[0];
    switch (this.name) {
        case "android":
            if (this.ua.indexOf("version/") != -1) this.version = this.ua.split("version/")[1].split(".")[0];
            if (this.ua.indexOf("android ") != -1) {
                this.fullVersion = this.ua.split("android ")[1].split(";")[0]
            }
            break;
        case "chrome":
            if (this.ua.indexOf("chrome/") != -1) this.version = this.ua.split("chrome/")[1].split(".")[0];
            if (this.ua.indexOf(" safari/") != -1) {
                this.versionFull = this.ua.split(" chrome/")[1].split(" safari/")[0]
            }
            break;
        case "safari":
            if (this.ua.indexOf("crios/") != -1) {
                this.name = "chrome";
                this.version = this.ua.split("crios/")[1].split(".")[0]
            } else if (this.ua.indexOf("version/") != -1) {
                this.version = this.ua.split("version/")[1].split(".")[0];
                if (this.mobile) {
                    if (this.ua.indexOf(" mobile/") != -1) {
                        this.versionFull = this.ua.split("version/")[1].split(" mobile/")[0]
                    }
                } else {
                    if (this.ua.indexOf(" safari/") != -1) {
                        this.versionFull = this.ua.split("version/")[1].split(" safari/")[0]
                    }
                }
            }
            break;
        case "firefox":
            if (this.ua.indexOf("firefox/") != -1) {
                this.version = this.ua.split("firefox/")[1].split(".")[0];
                this.versionFull = this.ua.split("firefox/")[1]
            }
            break;
        case "msie":
            this.name = "ie";
            if (this.ua.indexOf("msie ") != -1) this.version = this.ua.split("msie ")[1].split(".")[0];
            else if (this.ua.indexOf("msie/") != -1) this.version = this.ua.split("msie/")[1].split(".")[0];
            if (this.ua.indexOf("msie ") != -1) {
                this.versionFull = this.ua.split("msie ")[1].split(";")[0]
            }
            if (this.version < 9) this.ielt9 = true;
            break
    }
    if (this.device && this.device.osVersion) this.device.osVersion = Number(this.device.osVersion);
    if (this.version) this.version = Number(this.version);
    delete this.ua;
    delete this.userAgent;
    delete this.deviceDetected;
    delete this.osDetected;
    this.saveOrientation = function() {
        this.orientation = window.orientation;
        if (window.orientation == 0 || window.orientation == 180) this.layout = "portrait";
        else this.layout = "landscape"
    };
    if (this.mobile) {
        this.saveOrientation();
        var t = function() {
            this.saveOrientation();
            if (this.onOrientationChange) this.onOrientationChange(this)
        };
        window.addEventListener("orientationchange", t.bind(this), false)
    }
};