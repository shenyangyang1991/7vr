/*account*/
(function($, win, doc){
	var user = $.cookie('uif');
	if (user) {
		user = JSON.parse(user);
		$('#phone').text(user.user_info.phone);
		
	}
})(jQuery, window, document);