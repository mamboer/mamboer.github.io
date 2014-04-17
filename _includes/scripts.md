<script src="{{ site.url }}/assets/sea-modules/seajs/seajs/2.2.1/sea.js"></script>
<script>
    //seajs configuration
    seajs.config({
        debug:true,
        alias:{
            "jquery":"/assets/js/libs/jquery/2.1.0/jquery-2.1.0.min.js",
            "common":"/assets/dist/js/common.min.js",
            "jquery.tagclound":"/assets/js/jquery.tagcloud.js",
            "han":"/assets/js/han.js"
        },
        preload:['common']
    });
    var app = window['seajsMod']||{mod:'main'};
    app.app=app.app||'common';
    if(location.href.indexOf('localhost')>0){
        seajs.use("faso/%/src/$".replace('%',app.app).replace('$',app.mod));
    }else{
        seajs.use("faso/%/1.0.1/$".replace('%',app.app).replace('$',app.mod));
    }
</script>
<script type="text/javascript" src="http://tajs.qq.com/stats?sId=31671173" charset="UTF-8"></script>