define("ox/common/1.0.1/main",["./util","./nav","./iscript"],function(a){a("./util"),a("./nav")}),define("ox/common/1.0.1/util",[],function(){Date.prototype.format=function(a){var b={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(a)&&(a=a.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var c in b)new RegExp("("+c+")").test(a)&&(a=a.replace(RegExp.$1,1==RegExp.$1.length?b[c]:("00"+b[c]).substr((""+b[c]).length)));return a}}),define("ox/common/1.0.1/nav",["ox/common/1.0.1/iscript"],function(a){a("ox/common/1.0.1/iscript"),$(document).ready(function(){var a=$("#nav a");a.each(function(a,b){return location.href.indexOf(b.getAttribute("href"))>0?(b.className="current",!1):void 0})})}),define("ox/common/1.0.1/iscript",[],function(){$(document).ready(function(){var a=window.iScripts||[];if(len=iScripts.length,0!==len){for(var b=0;len>b;b++)a[b]._onLoad&&a[b]._onLoad.call(a[b]);delete window.iScripts}})});