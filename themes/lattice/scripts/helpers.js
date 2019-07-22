'use strict';

const pathFn      = require('path');
const _           = require('lodash');
const cheerio     = require('cheerio');
const util        = require('hexo-util');
const md5         = require('blueimp-md5')
const publicDir   = hexo.public_dir;
const sourceDir   = hexo.source_dir;
const route       = hexo.route;

const postImgDir  = 'img/post/';  

const localizedPath = ['docs', 'api'];    

// Utils
function startsWith(str, start){
    return str.substring(0, start.length) === start;
}

// Hexo extensions
hexo.extend.helper.register('raw_link', function(path){
    return hexo.theme.config.post.raw_link + path;
});

hexo.extend.helper.register('page_anchor', function(str){
  var $ = cheerio.load(str, {decodeEntities: false});
  var headings = $('h1, h2, h3, h4, h5, h6');

  if (!headings.length) return str;

  headings.each(function(){
    var id = $(this).attr('id');

    $(this)
      .addClass('post-heading')
      .append('<a class="post-anchor" href="#' + id + '" aria-hidden="true"></a>');
  });

  return $.html();
});

hexo.extend.helper.register('post_img', function(path){
    // console.log(path)
    if(path.indexOf('http://') === 0 || path.indexOf('https://') === 0 || path.indexOf('//') ===0) return path;
    path = this.url_for((hexo.theme.config.post.img_dir || postImgDir) + path);
    return path;
});

hexo.extend.helper.register('header_menu', function(className){
  var menu = this.site.data.menu,
    result = '',
    self = this,
    lang = this.page.lang,
    isDefaultLang = lang === 'zh-cn',
    path1 = this.path,
    isActive = function(path0){
        if(path0 === 'index.html') {
            return path1 === path0;    
        }
        return (path1.indexOf(path0)!==-1);    
    },
    isAbs = function(path0) {
        let except = hexo.theme.config.header_menu.exceptions || [];
        if(path0.indexOf('http') === 0 && except.indexOf(path0) === -1) {
            return true;
        }
        return false;
    };

  _.each(menu, function(path, title){
    if (!isDefaultLang && ~localizedPath.indexOf(title)) path = lang + '/' + path;
    var activeClass  = isActive(path) ? " active" : "";
    result += '<li class="' + className + '-item' + activeClass + '">';
    if(isAbs(path)) {
        result += '<a target="_blank" href="' + self.url_for(path) + '" class="' + className + '-link">' + self.__('menu.' + title) + '</a>';
    } else {
        result += '<a href="' + self.url_for(path) + '" class="' + className + '-link">' + self.__('menu.' + title) + '</a>';
    }
    result += '</li>';
  });

  return result;
});

/**
 * categories menu
 */
hexo.extend.helper.register('cate_menu', function(className){
  var menu = this.site.data.cates,
    result = '',
    self = this,
    lang = this.page.lang,
    isDefaultLang = lang === 'zh-cn',
    path1 = this.path,
    isActive = function(path0){
        if(path0 === 'index.html') {
            return path1 === path0;    
        }
        return (path1.indexOf(path0) !== -1);    
    }

  menu.forEach(function(obj) {
      var path = obj.url;
      if (!isDefaultLang) path = lang + '/' + path;
      var activeClass  = isActive(path) ? " active" : "";
      result += '<li class="' + className + '-item' + activeClass + '">';
      result += '<a href="' + self.url_for(path) + '" class="' + className + '-link">' + obj.text + '</a>';
      result += '</li>';
  });

  return result;
});

hexo.extend.helper.register('lang_name', function(lang){
    var data = this.site.data.languages[lang];
    return data.name || data;
});

hexo.extend.helper.register('canonical_path_for_nav', function(){
    var path = this.page.canonical_path;

    if (startsWith(path, 'docs/') || startsWith(path, 'api/')){
        return path;
    }
    return '';
});
hexo.extend.helper.register('page_keywords', function(asStr){
    var tags = this.page.tags,
        siteKeywords = hexo.config.keywords.split(', ');

    if (tags) {
        tags.each(function(tag){
            siteKeywords.splice(0, 0, tag.name);
        }); 
    }
    if (asStr) {
        return siteKeywords.join(',');
    }
    return siteKeywords;
});

/**
 * post unique key
 * @param path post path
 * @param customKey custom post unique key
 */
hexo.extend.helper.register('post_key', function(path, customKey){
    customKey = customKey || md5(path);
    return customKey;
});

hexo.extend.helper.register('num_toArray', function(num) {
    var ret = [];
    var idx = 1;
    while(idx < num) {
        ret.push(idx);
        idx ++;
    }
    return ret;
});