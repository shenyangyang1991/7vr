(function($, win, doc) {
	var staticTemp = {
		DOWNLOAD_BLOCK : "<div class='dl-l'></div>",
		DOWNLOAD_LIST_I : "<div class='dl-i'></div>",
		DOWNLOAD_TH : "<div class='dl-icon pull-left'></div>",
		DOWNLOAD_TH_IMG : "<img/>",
		DOWNLOAD_CONTENT : "<div class='dl-context pull-left'></div>",
		DOWNLOAD_H : "<div class='dl-h'></div>",
		DOWNLOAD_TXT : "<div class='dl-txt'></div>",
		DOWNLOAD_BTN : "<div class='dl-btn pull-right'></div>"
		
	}
	
	var Classes = function() {
		var that = this;
		this.container = '#download .container';
		this.init = function() {
			// loadding
			$.vr.ajax.post({
				url: 'php/index.php',
				data: {url:'downloadinfo'},
				success: function(data) {
					//console.log(data);
					if (data && data.code == "1") {
						that.render(data.data);
					} else {
						alert('获取数据失败！请重试');
					}
				}
			});
		}
		this.render = function(data) {
			if (data && data.length > 0) {
				var _b = $(staticTemp.DOWNLOAD_BLOCK);
				$(that.container).append(_b);
				for (var i = 0; i < data.length; i ++) {
					that.wrapper(data[i]);
				}
			}
		}
		
		this.wrapper = function(data) {
			
			var _l = $(staticTemp.DOWNLOAD_LIST_I),
				_th = $(staticTemp.DOWNLOAD_TH),
				_c = $(staticTemp.DOWNLOAD_CONTENT);
			
			$(staticTemp.DOWNLOAD_TH_IMG).attr('src', data.img_url).appendTo(_th);
			_th.appendTo(_l);
			$(staticTemp.DOWNLOAD_H).text(data.title).appendTo(_c);
			$(staticTemp.DOWNLOAD_TXT).text(data.content).appendTo(_c);
			_c.appendTo(_l);
			$(staticTemp.DOWNLOAD_BTN).text('会员下载').appendTo(_l);
			$('.dl-l').append(_l);
		}
	}
	
	var c = new Classes();
	c.init();
})(jQuery, window, document);
