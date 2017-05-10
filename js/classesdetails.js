(function($, win, doc) {
	
	function GetQueryString(name) { 
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i"); 
            var r = window.location.search.substr(1).match(reg);
            if (r!=null) return (r[2]); return null; 
        }
	
	var Classes = function() {
		var that = this;
		this.container = '#classes-details .container';
		this.init = function() {
			
			var __id = GetQueryString('id'),
				__h = GetQueryString('h');
				
			if (!__id) {
				alert('网页出错！');
				return;
			}
			// loadding
			$.vr.ajax.post({
				url: 'php/index.php',
				data: {url:'classesdetails', course_id: __id},
				success: function(data) {
					console.log(data);
					if (data && data.code == "1") {
						that.render(data.data, __h);
					} else {
						alert('获取数据失败！请重试');
					}
				}
			});
		}
		this.render = function(data, h) {
			
			
			$('.cd-video').append('<video id="example_video_1" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" poster="'+data.course_img_url+'"><source src="'+data.hours[h].file_video_url+'" type="video/mp4" /></video>');

			videojs("example_video_1", {}, function(){
				// Player (this) is initialized and ready.
			});
			
			
			$('.cd-h').text(data.hours[h].hours_name);
			$('.cd-c-h').text(data.course_name);
			$('.cd-c-txt').find('span').each(function(k,v){
				switch(k) {
					case 0: 
						$(v).text(data.ks_num+'课时');
						break;
					case 1:
						$(v).text(data.ks_time+'分钟');
						break;
					case 2:
						$(v).text(data.create_date);
				}
			});
			$('.cd-c-i img').attr('src', data.author_img_url);
			$('.cd-c-name').text(data.author_name);
			$('.cd-c-f').text(data.author_introduce);
			$('.cj').text(data.course_introduce);
			$('.sy').text(data.fit_people);
			
			for (var i = 0; i < data.hours.length; i ++) {
				var _a = $('<a href="classes-details.html?id='+data.course_id+'&h='+i+'" class="cd-list-l-c"></a>'),
					_h = $('<div class="cd-l-c-h"></div>'),
					_tx = $('<div class="cd-l-c-txt"></div>'),
					_num = $('<div class="num pull-left">'+(i+1)+'</div>'),
					_hh = $('<div class="cd-l-c-h-h pull-left">'+data.hours[i].hours_name+'</div>');
				
				_h.append(_num);
				_h.append(_hh);
				_a.append(_h);
				_tx.text(data.hours[i].hours_introduce).appendTo(_a);
				
				$('.cd-list-p').append(_a);
			}
		}
	}
	
	var c = new Classes();
	c.init();
})(jQuery, window, document);
