(function() {

	var isHeaderStaticPosition = true;

	function scrollToTarget (target, offset, speed) {

		var distance = target.offset().top;
		var _speed = speed || 400;
		if (offset) {distance += Math.floor(offset);};
		$("html, body").animate({scrollTop: distance}, _speed);
	}

	$(document).ready(function() {

		$('.j-modal').on('click', function(e) {
			e.preventDefault();

			var _target = $(this).attr('href');
			$(_target).arcticmodal();
		});

		$('.j-modal-close').on('click', function(e) {
			e.preventDefault();

			$.arcticmodal('close');
		});

		$('.j-scrollto').on('click', function(e) {
				e.preventDefault();
				var target = $(this).attr('href') || $(this).data('target');
				var offset = target === '#top' ? 0 : $(target).offset().top - $('.header').outerHeight();

				$('html, body').animate({
					scrollTop: offset
				}, 400);
		});

	});	

	$(window).on('scroll', onScrollCallback);

	function onScrollCallback () {
			if($(this).scrollTop() > 80  && isHeaderStaticPosition) {
				
				$('html body').prepend('<div class="header-placeholder" />');
				$('.header-placeholder').height($('.header').outerHeight())
				$('.header').addClass('header_fixed');
				isHeaderStaticPosition = false
			
			}	else if ($(this).scrollTop() < 80  && !isHeaderStaticPosition) {

				isHeaderStaticPosition = true
				$('.header-placeholder').remove();
				$('.header').removeClass('header_fixed');
			}
	};

	$(document).ready(function() {

		$('.header-top__menulink').on('click', function(e) {
			if ($('.header-mobilemenu').hasClass('active')) {
				$('.header-mobilemenu').removeClass('active');
				$('body').removeClass('m-noscrol');
				$(this).removeClass('active');
			} else {
				$('.header-mobilemenu').addClass('active');
				$('body').addClass('m-noscrol');
				$(this).addClass('active');
			}
			
		});

		$('.daychanger .firstday').click(function(){
			$('.daychanger .firstday').addClass('active');
			$('.daychanger .secondday').removeClass('active');
			$('.daychanger .secondday img.white').hide();
			$('.daychanger .firstday img.gray').hide();
			$('.daychanger .secondday img.gray').show();
			$('.daychanger .firstday img.white').show();
			$('.scheduleone').show();
			$('.scheduletwo').hide();
			$('.daysheading h2.firstday').show();
			$('.daysheading h2.secondday').hide();
		});

		$('.daychanger .secondday').click(function(){
			$('.daychanger .secondday').addClass('active');
			$('.daychanger .firstday').removeClass('active');
			$('.daychanger .secondday img.white').show();
			$('.daychanger .firstday img.gray').show();
			$('.daychanger .secondday img.gray').hide();
			$('.daychanger .firstday img.white').hide();
			$('.scheduletwo').show();
			$('.scheduleone').hide();
			$('.daysheading h2.secondday').show();
			$('.daysheading h2.firstday').hide();
		});

	});	



})();