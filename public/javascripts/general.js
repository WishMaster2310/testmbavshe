$(function() {
	$('.j-popup').on('click', function() {
		var t = $(this).attr('href');
		
		$(t).arcticmodal()
	})
});