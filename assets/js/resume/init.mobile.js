(function($){

    if( !( LV.Utils.browser.touch || LV.Utils.browser.mobile ) ) return;

    $("#share-this_, #socialize").remove();
    $("#resume-menu").remove();
    
    LV.Analytics.type = "mobile.";
    LV.Analytics.plus("count");
    
    if (LV.Utils.browser.device) {
        
        if (LV.Utils.browser.device.name == "iphone") {
            LV.Analytics.plus("device.iphone");
        } else if ( LV.Utils.browser.device.name == "android" ) {
            LV.Analytics.plus("device.android");
        } else {
            LV.Analytics.plus("device.other"); 
        }

        if ( LV.Utils.browser.layout != undefined ) {
            if ( LV.Utils.browser.layout == "portrait" ) {
                LV.Analytics.plus("orientation.portrait");
            } else if ( LV.Utils.browser.layout == "landscape" ) {
                LV.Analytics.plus("orientation.landscape")
            };
        };
    };

    var $scrolling = $("#scrolling").css({
        width: "100%",
        height: "100%",
        "overflow-y": "scroll",
        "overflow-x": "hidden",
        position: "absolute",
        left: 0,
        top: 0
    });

    if (window.devicePixelRatio) {
        var p = 1 / window.devicePixelRatio;
        TweenMax.set("#bg-circle-1, #bg-circle-2, #bg-circle-3, #bg-circle-4", {
            scale: p
        });
    }

    TweenMax.set("#sunflare1, #sunflare2, #sunflare3, #sunflare4", {
        scale: .4
    });

    LV.Scroll.init("scrolling",LV.Utils.udf,{
        initHeight : $scrolling[0].scrollHeight,
        first : true,
        home : (window.innerHeight >> 1),
        returnedHome : false,
        checkReady : false,
        firstAnimation : false,
        patienceLevel : "none",
        points : {
            home: 0,
            work: $("#scroll-misc-work").offset().top + window.innerHeight + 60,
            life: $("#scroll-life").offset().top + window.innerHeight,
            software: $("#scroll-software").offset().top + window.innerHeight,
            coding: $("#scroll-coding").offset().top + window.innerHeight,
            contact: $("#scroll-message").offset().top + window.innerHeight - 20,
            career: $("#scroll-history").offset().top + window.innerHeight + 10
        }
    });
    
    LV.Utils.browser.onOrientationChange = function(e) {
        LV.Analytics.plus("orientation.rotated")
    };

    LV.MobileLightbox.init([{
        type: "video",
        html: '<iframe src="//player.vimeo.com/video/24545228?title=0&byline=0&portrait=0" width="500" height="297" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        width: 500,
        height: 297,
        title: "Droid Does"
    }, {
        type: "video",
        html: '<iframe src="//player.vimeo.com/video/88411662?title=0&byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        width: 500,
        height: 281,
        title: "Virtual Store"
    }, {
        type: "video",
        html: '<iframe src="//player.vimeo.com/video/42053021?title=0&byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        width: 500,
        height: 281,
        title: "Kizuna Cranes"
    }, {
        type: "img",
        src: "img/resume/mobile/work-burning-man.jpg",
        size: "auto",
        title: "Burning Man",
        width: 640,
        height: 717
    }, {
        type: "img",
        src: "img/resume/mobile/work-room-to-roam.jpg",
        size: "auto",
        title: "Room to Roam",
        width: 640,
        height: 752
    }, {
        type: "video",
        html: '<iframe src="//player.vimeo.com/video/31409357?title=0&byline=0&portrait=0" width="500px" height="300px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        width: 500,
        height: 300,
        title: "Galaxy Explorer"
    }, {
        type: "video",
        html: '<iframe src="//player.vimeo.com/video/50856914?title=0&byline=0&portrait=0" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        width: 500,
        height: 375,
        title: "Kinect Puppetry"
    }, {
        type: "img",
        src: "img/resume/mobile/work-phoenix-goddess.jpg",
        size: "auto",
        title: "Phoenix Goddess",
        width: 640,
        height: 752
    }]);

    LV.preload.queue.loadManifest([{
        src: "assets/img/resume/square1.jpg"
    }, {
        src: "assets/img/resume/square2.jpg"
    }, {
        src: "assets/img/resume/square3b.jpg"
    }, {
        src: "assets/img/resume/square4.jpg"
    }, {
        src: "assets/img/resume/square5.jpg"
    }]);


    var deviceLearning = true;
    var deviceY = [];
    var deviceTotalY = 0;

    if (window.DeviceMotionEvent != undefined) {
        LV.Analytics.plus("accelerometer");
        LV.MobileMenu.init();
        window.ondevicemotion = function(e) {
            if (deviceLearning) {
                deviceY.push(e.accelerationIncludingGravity.y);
                deviceTotalY += e.accelerationIncludingGravity.y;
                if (deviceY.length > 30) {
                    deviceY = deviceTotalY / 30;
                    deviceLearning = false
                }
            } else if (LV.MobileMenu.active) {
                if (e.accelerationIncludingGravity.y > deviceY + 3) {
                    LV.MobileMenu.toggle()
                } else if (e.accelerationIncludingGravity.y < deviceY + 1) {
                    LV.MobileMenu.ready = true
                }
            }
        };
    };

    $scrolling.focus();

    $(".mms-item").click(function() {
        var e = this.id.split("-")[1];
        LV.Analytics.plus("social." + e);
        LV.Analytics.plus("social.clicked")
    })

})(jQuery);