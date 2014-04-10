define(function(require){

    //自定义js模块
    require('./iscript');

    $(document).ready(function(){
        var $items = $('#nav a');
        $items.each(function(i,o){
            if(location.href.indexOf(o.getAttribute('href'))>0){
                o.className='current';
                return false;
            }
        });
    });
});