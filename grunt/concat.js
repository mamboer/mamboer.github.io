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
            'assets/js/resume/Utils.js',
            'assets/js/resume/Modify.js',
            'assets/js/resume/Polygon.js',
            'assets/js/resume/Point.js',
            'assets/js/resume/Trig.js',
            'assets/js/resume/SwipeListener.js',
            'assets/js/resume/Browser.js'
        ],
        dest:'assets/dist/js/common.resume.js'
    }
};