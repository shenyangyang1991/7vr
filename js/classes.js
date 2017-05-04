(function($, win, doc) {
	var staticTemp = {
		CLASSES_BLOCK : "<div class='em-l'></div>",
		CLASSES_NAME : "<div class='em-l-h'></div>",
		CLASSES_REMARK : "<p></p>",
		CLASSES_STATUS : "<p></p>",
		CLASSES_LIST_B : "<div class='em-l-list'></div>",
		CLASSES_LIST_W : "<div class='em-l-wrapper'></div>",
		CLASSES_LIST_I : "<a class='em-l-item pull-left' href='classes-details.html'></a>",
		CLASSES_TH : "<div class='thumbnail'></div>",
		CLASSES_TH_IMG : "<img/>",
		CLASSES_CONTENT : "<div class='em-l-i-content'></div>",
		CLASSES_TXT : "<div class='em-i-txt'></div>",
		CLASSES_STA : "<div class='em-i-status'></div>",
		CLASSES_STA_W : "<span class='pull-left'></span>",
		CLASSES_STA_C : "<span></span>",
		CLASSES_STA_M : "<span></span>",
		
	}
	
	var Classes = function() {
		this.container = '#equipment .container';
		this.init = function() {
			// loadding
			$.vr.ajax.post({
				url: 'php/index.php',
				data: {url:'classesinfo'},
				success: function(data) {
					console.log(data);
				}
			});
		}
		this.render = function(data) {
			
		}
	}
	
	var c = new Classes();
	c.init();
})(jQuery, window, document);
