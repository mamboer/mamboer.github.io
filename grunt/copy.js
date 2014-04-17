module.exports = {
    main: {
        expand: true,
        cwd: '../../bootstrap/bootstrap/dist/',
        src: '**',
        dest: 'assets/dist/'
    },
    snap_svg:{
        expand:true,
        cwd:'../../Snap.svg/dist/',
        src:'**',
        dest:'assets/js/libs/'
    },
    greensock_js:{
        expand:true,
        cwd:'../../JS/GreenSock-JS/src/uncompressed/',
        src:['TweenLite.js','TweenMax.js'],
        dest:'assets/js/libs/greensock/'
    },
    preloadjs:{
        expand:true,
        cwd:'../../JS/PreloadJS/lib/',
        src:'preloadjs-0.4.1.combined.js',
        dest:'assets/js/libs/PreloadJS/'
    },
    jquery_easing:{
        expand:true,
        cwd:'../../JS/jquery.easing/',
        src:'jquery.easing.1.3.js',
        dest:'assets/js/libs/jquery-plugins/'
    },
    css_normalize:{
        expand:true,
        cwd:'../../CSS/normalize.css/',
        src:'normalize.css',
        dest:'assets/css/'
    }
};