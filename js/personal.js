/*personal*/
(function($, win, doc){
	var user = $.cookie('uif');
	if (user) {
		user = JSON.parse(user);
		$('#nickname').val(user.user_info.nickname);
		switch(user.user_info.sex) {
			case "0": 
				$('#none').attr('checked','checked');
				break;
			case "1":
				$('#man').attr('checked','checked');
				break;
			case "2":
				$('#woman').attr('checked','checked');
				break;
		}
		if (user.user_info.autograph) {
			$('.textarea').val(user.user_info.autograph);
		}
		
		$('.f-content img').attr('src',user.user_info.face_url);
	}
})(jQuery, window, document);