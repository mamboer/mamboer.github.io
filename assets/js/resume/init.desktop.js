(function($){

    if( ( LV.Utils.browser.touch || LV.Utils.browser.mobile ) ) return;

    LV.Analytics.type = "desktop.";
    LV.Analytics.plus("count");

    $("#mobile-question").remove();
    LV.SocialMenu.init();
    if (window.DeviceMotionEvent != undefined) {
        LV.Analytics.plus("accelerometer")
    }
    LV.BackgroundCircle.render();
    
    LV.FishEyeMenu.init();

    LV.share.initUI();

    if ( LV.Utils.browser.name == "chrome" ) {
        LV.Analytics.plus("browser.chrome");
    } else if ( LV.Utils.browser.name == "safari" ) {
        LV.Analytics.plus("browser.safari");
    } else if ( LV.Utils.browser.name == "firefox" ) {
        LV.Analytics.plus("browser.firefox");
    } else if ( LV.Utils.browser.name == "ie" ) {
        LV.Analytics.plus("browser.ie");
    } else {
        LV.Analytics.plus("browser.other");
    }
    
    LV.Scroll.init(LV.Utils.udf,LV.Utils.udf,{
        checkReady : false,
        first : true,
        home : (window.innerHeight >> 1),
        returnedHome : false,
        firstAnimation : false,
        patienceLevel : "none"
    });
    
    
    LV.Lightbox.init([{
        type: "video",
        html: '<iframe src="//player.vimeo.com/video/24545228?title=0&byline=0&portrait=0" width="500" height="297" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        width: 500,
        height: 297,
        about: "<span>Droid Does</span> - face tracking - concept, research & development, AS3 development"
    }, {
        type: "video",
        html: '<iframe src="//player.vimeo.com/video/88411662?title=0&byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        width: 500,
        height: 281,
        about: "<span>Virtual Store</span> - arduino programming, c++/cinder development, design, video production / editing"
    }, {
        type: "video",
        html: '<iframe src="//player.vimeo.com/video/42053021?title=0&byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        width: 500,
        height: 281,
        about: "<span>Kizuna Cranes</span> - front end development, crane illustration, video art direction / design / animation"
    }, {
        type: "img",
        html: "<img src='assets/img/resume/burning-man.jpg' />",
        size: "auto",
        about: "<span>Burning Man 2012</span> - photography"
    }, {
        type: "img",
        html: "<img src='assets/img/resume/room-to-roam.jpg' />",
        size: "auto",
        about: "<span>Room to Roam</span> - art direction, 3d modeling / lighting / texturing"
    }, {
        type: "video",
        html: '<iframe src="//player.vimeo.com/video/31409357?title=0&byline=0&portrait=0" width="500px" height="300px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        width: 500,
        height: 300,
        about: "<span>Galaxy Explorer</span> - concept, game design, illustrations, JS development. debuted at Google Creative Sandbox"
    }, {
        type: "video",
        html: '<iframe src="//player.vimeo.com/video/50856914?title=0&byline=0&portrait=0" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
        width: 500,
        height: 375,
        about: "<span>Kinect Puppetry</span> - kinectSDK with c++/cinder development, character illustration"
    }, {
        type: "img",
        html: "<img src='assets/img/resume/phoenix-goddess.jpg' />",
        size: "auto",
        about: "<span>Phoenix Sunrise Goddess</span> - photoshop illustration"
    }]);


    if (LV.Utils.browser.name != "ie") {
        console.log("/////////////////////////////////////////////////");
        console.log("/////////////////////////////////////////////////");
        console.log("/////////////////////////////////////////////////");
        console.log("/////////////////////////////////////////////////");
        console.log("");
        console.log("");
        console.log("");
        console.log(" 码神你好! 试试LV.hi() - :)");
        console.log("");
        console.log("");
        console.log("");
        console.log("/////////////////////////////////////////////////");
        console.log("/////////////////////////////////////////////////");
        console.log("/////////////////////////////////////////////////");
        console.log("/////////////////////////////////////////////////")
    }

})(jQuery);