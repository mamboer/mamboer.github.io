(function($) {

	var pkg = new PKG(),
		$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar'),
		$main = $('#main');

	function heredoc(fn) {
		return fn.toString().split('\n').slice(1,-1).join('\n') + '\n';
	}

	pkg.define('basic', {
		init: function(){
			// app full screen mode
			if ("standalone" in window.navigator && window.navigator.standalone) {
					$body.addClass('app-fullscreen');
			}
			// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});
			// Fix: Placeholder polyfill.
			$('form').placeholder();
		}
	});

	// Search
	pkg.define('search', {
		init: function(){
			// Search (header).
			var $search = $('#search'),
				$search_input = $search.find('input'),
                searchTimer;

			$body
				.on('click', '[href="#search"]', function(e) {

					e.preventDefault();

					// Not visible?
						if (!$search.hasClass('visible')) {

							// Reset form.
								$search[0].reset();

							// Show.
								$search.addClass('visible');

							// Focus input.
								$search_input.focus();

                            clearTimeout(searchTimer);
						}

				});

			$search_input
				.on('keydown', function(event) {

					if (event.keyCode == 27)
						$search_input.blur();

				})
				.on('blur', function() {
					searchTimer = window.setTimeout(function() {
						$search.removeClass('visible');
					}, 200);
				});
		}
	});

	// Back Top
	pkg.define('backTop', {
		init: function(){
			var $backTop = $('#backTop');
			$window.on('scroll.backtop', debounce(function () {
					if ($window.scrollTop() > 100) {
							$backTop.show();
					} else {
							$backTop.hide();
					}
			}));

			// scroll body to 0px on click
			$backTop.on('click',function () {
					$('body,html').animate({
							scrollTop: 0
					}, 800);
					return false;
			});
		}
	});

	//Theme switcher
	pkg.define('theme', {
		ls: localStorage || {getItem:function(){}, setItem:function(){}},
		key: 'o2.theme',
		theme: 'light',
		init: function(){
				var theme = this.ls.getItem(this.key) || this.theme;
				var me = this;
				this.$items = $('#theme-list li').on('click',function(e){
						if(theme === 'dark'){
								theme = 'light';
						} else {
								theme = 'dark';
						}
						me.setTheme(theme);
				});
				this.setTheme(theme);
		},
		setTheme:function(theme){
				this.$items.removeClass('active');
				this.$items.filter('[data-v="' + theme +'"]').addClass('active');
				this.theme = theme;
				this.ls.setItem(this.key, theme);
				$body.removeClass('dark light').addClass(theme);
		}
	});

	//Console
	pkg.define('console', {
		init: function(){
			var styles = [
				'color:#ffffff',
				'display:block',
				'padding:20px',
				'font-size:36px',
				'text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15)'
			];
			console.log('%c'+App.name, styles.join(';'));
		}
	});

	$(function() {
  	pkg.init();
	});

})(jQuery);
