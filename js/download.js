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
					console.log(data);
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
				for (var i = 0; i < data.length; i ++) {
					that.wrapper(data[i]);
				}
			}
		}
		
		this.wrapper = function(data) {
			var _b = $(staticTemp.CLASSES_BLOCK),
				_h = $(staticTemp.CLASSES_NAME),
				_l = $(staticTemp.CLASSES_LIST_B),
				_lw = $(staticTemp.CLASSES_LIST_W);
			$(that.container).append(_b);
			_h.text(data.name).appendTo(_b);
			$(staticTemp.CLASSES_REMARK).text(data.content).appendTo(_b);
			$(staticTemp.CLASSES_STATUS).text('(共'+data.kc_num+'课程，'+data.ks_time+'分钟，'+data.look_num+'浏览量)').appendTo(_b);
			for (var i = 0; i < data.course.length; i ++) {
				var _li = $(staticTemp.CLASSES_LIST_I),
				_c = $(staticTemp.CLASSES_CONTENT),
				_st = $(staticTemp.CLASSES_STA),
				_sta = $(staticTemp.CLASSES_STA_W);
				var th = $(staticTemp.CLASSES_TH);
				$(staticTemp.CLASSES_TH_IMG).attr('src',data.course[i].course_img_url).appendTo(th);
				_li.append(th);
				$(staticTemp.CLASSES_TXT).text(data.course[i].course_introduce).appendTo(_c);
				$(staticTemp.CLASSES_STA_C).text(data.course[i].ks_num+'课时 ').appendTo(_sta);
				$(staticTemp.CLASSES_STA_M).text(data.course[i].ks_time+'分钟').appendTo(_sta);
				_sta.appendTo(_st);
				_st.appendTo(_c);
				_li.append(_c);
				_lw.append(_li);
			}
			
			
			_l.append(_lw);
			_b.append(_l);
		}
	}
	
	var c = new Classes();
	c.init();
})(jQuery, window, document);
