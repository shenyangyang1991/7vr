/*init*/
(function($, win, doc){
	$.vr = {};
})(jQuery, window, document);

/*ajax*/
(function($, win, doc){
	$.vr.ajax = {
		post: function(param) {
			$.ajax({
				url: param.url,
				data: param.data,
				dataType: 'json',
				error: function() {
					alert('网络错误!');
				},
				success: param.success,
				timeout: 60000,
				type: 'POST'
				
			});
		}
	}
})(jQuery, window, document);

/*isLogin*/
(function($, win, doc){
	$.vr.utils = {
		isLogin : function() {
			if ($.cookie("usr_tk")) {
				return true;
			} else {
				return false;
			}
		},
		loginOrSign : function(is) {
			if (is == "login") {
				$.vr.login.show();
			} else if (is =="register") {
				$.vr.register.show();
			}
		}
		
	}
})(jQuery, window, document);

/*plus*/
(function($, win, doc){
	var __plusFuns = [], __plusArgs = [];
	$.vr.plus = {
		addPlus : function(plus, args) {
			if (plus && typeof plus == "function") {
				__plusFuns.push(plus);
				__plusArgs.push(args);
			}
		},
		loadPlus : function() {
			for (var i = 0; i < __plusFuns.length; i ++) {
				__plusFuns[i](__plusArgs[i]);
			}
		}
	}
})(jQuery, window, document);

(function($, win, doc) {
	var isLogins = function() {
		if (location.href.indexOf('personal.html') > 0 || location.href.indexOf('account.html') > 0)
			if ($.cookie("usr_tk")) {
				
			} else {
				location.href = 'index.html';
			}
	}
	$.vr.plus.addPlus(isLogins, '');
})(jQuery, window, document);

/*bomb*/
(function($, win, doc){
	var bomb_static = {
		CONTAINER : '<div class="bomb-box"></div>',
		OVERLAY : '<div class="wrapper overlay"></div>',
		CONTENT : '<div class="body-main"></div>'
	}
	$.vr.bomb = function(id) {
		$(bomb_static.CONTAINER).attr('id', id).appendTo(doc.body);
		$(bomb_static.OVERLAY).appendTo($('#'+id));
		$(bomb_static.CONTENT).appendTo($('#'+id));
	};
})(jQuery, window, document);

/*login*/
(function($, win, doc){
	$.vr.login = {
		show: function() {
			$.vr.bomb('login');
			$('#login .body-main').load('component/login/login.html', function() {
				if ($.cookie('ao'))
					$('#auto-login').attr('checked','checked');
			});
		},
		hide: function() {
			$('#login').remove();
		},
		auto: function(that) {
			if ($(that).is(':checked')) {
				$.cookie('ao', 'auto-play', { expires: 7 });
			} else {
				$.cookie('ao', null);
			}
		},
		forget: function() {
			$('#login').remove();
			$.vr.forget.show();
		},
		reigster: function() {
			$('#login').remove();
			$.vr.register.show();
		},
		signin: function() {
			var __m = $('#mobile').val(),
				__p = $('#passwd').val();
			
			if (__m == "请输入手机号") {
				__m = "";
			}
			if (!$.trim(__m)) {
				alert('请输入手机号！');
				return;
			}
			
			if (!$.trim(__p)) {
				alert('请输入密码！');
				return;
			}
			

			$.vr.ajax.post({
				url: 'php/index.php',
				data: {url:'login', username: __m, password: __p},
				success: function(data) {
					console.log(data);
					if (data && data.code == "1") {
						var t = data.token;
						if ($.cookie('ao')) {
							$.cookie('usr_tk', t, { expires: 7 });
						} else {
							$.cookie('usr_tk', t);
						}
						
						$.cookie('uif', JSON.stringify(data.data));
						
						location.reload();
					} else {
						alert('登录失败！原因：账号密码不正确');
					}
				}
			});
		}
	};
})(jQuery, window, document);
/*download*/
(function($, win, doc){
	$.vr.download = {
		download: function(url) {
			if (!$.vr.utils.isLogin()) {
				$.vr.login.show();
			}else {
				window.open(url);
			}
		}
	}
})(jQuery, window, document);
/*server*/
(function($, win, doc){
	$.vr.server = {
		server: function(url, id) {
			$.vr.ajax.post({
				url: 'php/index.php',
				data: {url:'clicke',class_label_id: id},
				success: function(data) {
					
				}
			});
			
			window.open(url);
		}
	}
})(jQuery, window, document);
/*equipment*/
(function($, win, doc){
	$.vr.equipment = {
		equipment: function(url, id) {
			$.vr.ajax.post({
				url: 'php/index.php',
				data: {url:'clicke',class_label_id: id},
				success: function(data) {
					
				}
			});
			
			window.open(url);
		}
	}
})(jQuery, window, document);


/*forget*/
(function($, win, doc){
	var __sid = "";
	function getSid() {
		return __sid;
	}
	var __i = false;
	function countDown() {

		$('.cbtn').text('60秒后，可重新获取');
		var count = 60;
		var __timer = setInterval(function() {
			count --;
			if (count == 0) {
				$('.cbtn').text('获取动态码');
				__i = false;
				clearInterval(__timer);
				return;
			}
			$('.cbtn').text(count + '秒后，可重新获取');
			
		}, 1000);
	}
	
	function ccode() {
		$('#icode').val('图片验证码');
		$.vr.ajax.post({
					url: 'php/index.php',
					data: {url: 'getimg'},
					success: function(data) {
						if (data && data.code == "1") {
							__sid = data.data.img_sid;
							$('#imgcode').attr('src', data.data.img_src);
						} else {
							alert('获取图片失败！');
						}
					}
				});
	}
	$.vr.forget = {
		show: function() {
			$.vr.bomb('forget');
			$('#forget .body-main').load('component/forget/forget.html',function() {
				ccode();
			})
		},
		again: function() {
			ccode();
		},
		getCode: function() {
			
			if (__i) {return;}
			__i = true;
			
			if (!getSid()) {
				alert('请点击图片，重新获取图片验证码！');
				__i = false;
				return;
			}
			
			var ph = $('#mobile').val();
			if (ph == "请输入手机号") {
				ph = "";
			}
			if (!$.trim(ph)) {
				alert('请输入手机号！');
				__i = false;
				return;
			}
			
			
			var ic = $('#icode').val();
			if (ic == "图片验证码") {
				ic = "";
			}
			if (!$.trim(ic)) {
				alert('请输入图片验证码！');
				__i = false;
				return;
			}
			
			$.vr.ajax.post({
					url: 'php/index.php',
					data: {url: 'getcode', img_code: ic, img_sid: getSid(), username: ph},
					success: function(data) {
						if (data && data.code == "1") {
							
							countDown();
							ccode();
						} else {
							alert('获取短信验证码错误！原因:'+data.msg);
							__i = false;
						}
					}
				});
			
			
		},
		hide: function() {
			$('#forget').remove();
		},
		login: function() {
			$('#forget').remove();
			$.vr.login.show();
		},
		signin: function() {
			var __m = $('#mobile').val(),
				__p = $('#passwd').val(),
				__c = $('#xcode').val();
			if (__m == "请输入手机号") {
				__m = "";
			}
			if (__c == "验证码") {
				__c = "";
			}
			if (!$.trim(__m)) {
				alert('请输入手机号！');
				return;
			}
			
			if (!$.trim(__p)) {
				alert('请输入密码！');
				return;
			}
			if (!$.trim(__c)) {
				alert('请输入短信验证码！');
				return;
			}

			$.vr.ajax.post({
				url: 'php/index.php',
				data: {url:'resetpwd', phone: __m, password: __p, code: __c},
				success: function(data) {
					console.log(data);
					if (data && data.code == "1") {
						alert('找回密码成功！请登录');
						$('#forget').remove();
						$.vr.login.show();
					} else {
						alert('修改密码失败！原因：'+data.msg);
					}
				}
			});
		}
	};
})(jQuery, window, document);

/*protocol*/
(function($, win, doc){
	$.vr.protocol = {
		show: function() {
			$.vr.bomb('protocol');
			$('#protocol .body-main').load('component/protocol/protocol.html');
		},
		hide: function() {
			$('#protocol').remove();
		}
	};
})(jQuery, window, document);

/*register*/
(function($, win, doc){
	var __is = false;
	function get() {
		return __is;
	}
	var __sid = "";
	function getSid() {
		return __sid;
	}
	var __i = false;
	function countDown() {

		$('.cbtn').text('60秒后，可重新获取');
		var count = 60;
		var __timer = setInterval(function() {
			count --;
			if (count == 0) {
				$('.cbtn').text('获取动态码');
				__i = false;
				clearInterval(__timer);
				return;
			}
			$('.cbtn').text(count + '秒后，可重新获取');
			
		}, 1000);
	}
	
	function ccode() {
		$('#icode').val('图片验证码');
		$.vr.ajax.post({
					url: 'php/index.php',
					data: {url: 'getimg'},
					success: function(data) {
						if (data && data.code == "1") {
							__sid = data.data.img_sid;
							$('#imgcode').attr('src', data.data.img_src);
						} else {
							alert('获取图片失败！');
						}
					}
				});
	}
	
	$.vr.register = {
		show: function() {
			$.vr.bomb('register');
			$('#register .body-main').load('component/register/register.html',function() {
				ccode();
			});
		},
		again: function() {
			ccode();
		},
		hide: function() {
			$('#register').remove();
		},
		login: function() {
			$('#register').remove();
			$.vr.login.show();
		},
		getCode: function() {
			
			if (__i) {return;}
			__i = true;
			
			if (!getSid()) {
				alert('请点击图片，重新获取图片验证码！');
				__i = false;
				return;
			}
			
			var ph = $('#mobile').val();
			if (ph == "请输入手机号") {
				ph = "";
			}
			if (!$.trim(ph)) {
				alert('请输入手机号！');
				__i = false;
				return;
			}
			
			
			var ic = $('#icode').val();
			if (ic == "图片验证码") {
				ic = "";
			}
			if (!$.trim(ic)) {
				alert('请输入图片验证码！');
				__i = false;
				return;
			}
			
			$.vr.ajax.post({
					url: 'php/index.php',
					data: {url: 'getcode', img_code: ic, img_sid: getSid(), username: ph},
					success: function(data) {
						if (data && data.code == "1") {
							countDown();
							ccode();
						} else {
							alert('获取短信验证码错误！原因:'+data.msg);
							__i = false;
						}
					}
				});
			
			
		},
		signin: function() {
			
			if (!get()) {
				alert('请同意平台协议后注册信息！');
				return;
			}
			
			var __m = $('#mobile').val(),
				__p = $('#passwd').val(),
				__c = $('#xcode').val();
			if (__m == "请输入手机号") {
				__m = "";
			}
			if (__c == "验证码") {
				__c = "";
			}
			if (!$.trim(__m)) {
				alert('请输入手机号！');
				return;
			}
			
			if (!$.trim(__p)) {
				alert('请输入密码！');
				return;
			}
			if (!$.trim(__c)) {
				alert('请输入短信验证码！');
				return;
			}

			$.vr.ajax.post({
				url: 'php/index.php',
				data: {url:'register', username: __m, password: __p, code: __c},
				success: function(data) {
					console.log(data);
					if (data && data.code == "1") {
						var t = data.token;
						
						$.cookie('usr_tk', t);
						
						$.cookie('uif', JSON.stringify(data.data));
						
						location.reload();
					} else {
						alert('注册失败！原因：'+data.msg);
					}
				}
			});
		},
		protocol: function() {
			$.vr.protocol.show();
		},
		auto: function() {
			__is = true;
		}
	};
})(jQuery, window, document);

/*form*/
(function($, win, doc){
	$.vr.form = {
		placeholderFocus: function(that, content) {
			var __v = $(that).val();
			if ($.trim(__v) == content) {
				$(that).val('');
			}
		},
		placeholderBlur: function(that, content) {
			var __v = $(that).val();
			if ($.trim(__v) && $.trim(__v) != content) {
				
			} else {
				$(that).val(content);
			}
		},
		passwordFocus: function(that, sliding) {
			$(that).hide();
			$(that).prev().focus();
		},
		passwordBlur: function(that) {
			var __v = $(that).val();
			if ($.trim(__v)) {
				
			} else {
				$(that).next().show();
			}
		}
	};
})(jQuery, window, document);
/*loginout*/
(function($, win, doc){
	$.vr.loginout = function() {
		$.cookie('uif', '');
		$.cookie('usr_tk', '');
		location.reload();
	};
})(jQuery, window, document);
/*navbar*/
(function($, win, doc){
	$.vr.navbar = function(opts) {
		this.ele = opts.container;
	}
	var navbarIsActive = function(name) {
		if (location.href.indexOf(name) > 0) {
			return true;
		}
		return false;
	}
	var __scrollStatus = false;
	var scrollEvent = function(ele) {
		$(win).scroll(function() {
//			if (__scrollStatus) return;
			setTimeout(function() {
//				console.log($(win).scrollTop())
				if ($(win).scrollTop() > 700) {
//					if (__scrollStatus) return;
//					ele.removeClass('hover').addClass('fixed');
					ele.css('top', $(win).scrollTop())
					ele.css('background','#1b1b1b');
					__scrollStatus = true;
				} else {
					if (!__scrollStatus) return;
//					ele.removeClass('fixed').addClass('hover');
					ele.removeAttr('style');
					__scrollStatus = false;
				}
			}, 10)
		});
	}
	
	$.vr.navbarevent= {
		submenu : function(that) {
			if ($(that).hasClass('down')) {
				$(that).find('.navbar-link-sub').hide();
				$(that).removeClass('down');
			} else {
				$(that).find('.navbar-link-sub').show();
				$(that).addClass('down');
			}
		}
	}
	
	$.vr.navbar.prototype.render = function() {
		this.wrap = $($.vr.navbar_static.NAVBAR_WRAPPER_ELE);
		this.logo = $($.vr.navbar_static.NAVBAR_LOGO_ELE);
		this.links = $($.vr.navbar_static.NAVBAR_LINK_ELE);
		
		this.wrap.append(this.logo);
		this.wrap.append(this.links);
		for (var keys in $.vr.navbar_link) {
			var __lnk = $($.vr.navbar_static.NAVBAR_LINK_ITEM_ELE),
				__content = $.vr.navbar_link[keys];
			
			if (__content.__link == 'submenu') {
				var __subs = $($.vr.navbar_static.NAVBAR_LINK_SUB_ELE);
				__subs.append($($.vr.navbar_static.NAVBAR_LINK_SUB_ITEM_ELE).attr('href','personal.html').text('个人资料'))
				__subs.append($($.vr.navbar_static.NAVBAR_LINK_SUB_ITEM_ELE).attr('href','account.html').text('账户安全'))
				__subs.append($($.vr.navbar_static.NAVBAR_LINK_SUB_ITEM_ELE).attr('href','javascript:$.vr.loginout();').text('退出'))
				__lnk.addClass('submenu').attr('href', 'javascript:$.vr.navbarevent.submenu("#navbar .submenu");')
					.text(__content.__txt)
					.append($('<b class="caret"></b>'))
					.append(__subs);
			} else {
				__lnk.attr('href', __content.__link).text(__content.__txt);
			}
			
			if (__content.__is) {
				__lnk.addClass('active')
			}
			this.links.append(__lnk);
		}
		if (location.href.indexOf('index') == -1 && !(/^\/$/.test(location.pathname))) {
			this.ele.css('background','#1b1b1b');
		} else {
			scrollEvent(this.ele);
		}
		this.ele.append(this.wrap);
	}
	
	$.vr.navbar_link = {
		NAVBAR_LINK_HOME : {
			__link : 'index.html',
			__txt : '网站首页',
			__is : (navbarIsActive('index') || /^\/$/.test(location.pathname))
		},
		NAVBAR_LINK_CLASSES : {
			__link : 'classes.html',
			__txt : '会员课程',
			__is : navbarIsActive('classes')
		},
		NAVBAR_LINK_DOWNLOAD : {
			__link : 'download.html',
			__txt : '软件下载',
			__is : navbarIsActive('download')
		},
		NAVBAR_LINK_EQUIPMENT : {
			__link : 'equipment.html',
			__txt : '设备租赁',
			__is : navbarIsActive('equipment')
		},
		NAVBAR_LINK_SERVER : {
			__link : 'server.html',
			__txt : '摄影服务',
			__is : navbarIsActive('server')
		},
		//
		NAVBAR_LINK_USER : {
			__link : ($.vr.utils.isLogin() ? 'submenu' : 'javascript:$.vr.utils.loginOrSign("login")'),
			__txt : $.vr.utils.isLogin() ? '个人中心' : '登录/注册',
			__is : ($.vr.utils.isLogin() && (navbarIsActive('personal') || navbarIsActive('account')))
		}
	}
	
	$.vr.navbar_static = {
		NAVBAR_WRAPPER_ELE : '<div class="navbar-wrapper"></div>',
		NAVBAR_LOGO_ELE : '<a class="navbar-logo pull-left" href="index.html"></a>',
		NAVBAR_LINK_ELE : '<div class="navbar-link pull-right"></div>',
		NAVBAR_LINK_ITEM_ELE : '<a class="navbar-link-i pull-left"></a>',
		NAVBAR_LINK_SUB_ELE : '<div class="navbar-link-sub"></div>',
		NAVBAR_LINK_SUB_ITEM_ELE : '<a class="navbar-link-sub-i"></a>'
	}
	
	function navbarplus() {
		var navbar = new $.vr.navbar({
			container : $('#navbar')
		});
		
		navbar.render();
	}
	
	$.vr.plus.addPlus(navbarplus, '');
})(jQuery, window, document);

/*run*/
(function($, win, doc){
	$.vr.plus.loadPlus();
})(jQuery, window, document);