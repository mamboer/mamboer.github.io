module.exports = {
    //for test
    dist: {
        src: ['assets/js/libs/jquery/2.1.0/jquery-2.1.0.min.js', 'assets/dist/js/bootstrap.js'],
        dest: 'assets/dist/js/common.js',
    },
    //resume sub app
    resume:{
        src:[
            'assets/js/libs/jquery/2.1.0/jquery-2.1.0.min.js',
            'assets/js/libs/snap.svg.js',
            'assets/js/libs/greensock/TweenMax.js',
            'assets/js/libs/greensock/TweenLite.js',
            'assets/js/libs/PreloadJS/preloadjs-0.4.1.combined.js',
            'assets/js/libs/jquery-plugins/jquery.easing.1.3.js',
            'assets/js/resume/common/NS.js',
            'assets/js/resume/common/Browser.js',
            'assets/js/resume/common/Utils.js',
            'assets/js/resume/common/Modify.js',
            'assets/js/resume/common/Polygon.js',
            'assets/js/resume/common/Point.js',
            'assets/js/resume/common/Trig.js',
            'assets/js/resume/common/SwipeListener.js',
            'assets/js/resume/common/RAF.js',
            'assets/js/resume/common/Analytics.js'
        ],
        dest:'assets/dist/js/common.resume.js'
    }
};