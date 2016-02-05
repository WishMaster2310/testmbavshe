$(function() {
	// bind slick.js http://github.com/kenwheeler/slick
  $('.b-workshop-slider').slick({
    prevArrow: '<div class="b-slider__arrow b-slider__arrow--prev"></div>',
    nextArrow: '<div class="b-slider__arrow b-slider__arrow--next"></div>',
    dots: true,
    dotsClass: 'b-slider__dots',
    infinite: false,
    draggable: false
  });

  $('.b-speaker-slider').slick({
    prevArrow: '<div class="b-slider__arrow b-slider__arrow--prev"></div>',
    nextArrow: '<div class="b-slider__arrow b-slider__arrow--next"></div>',
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    dotsClass: 'b-slider__dots',
    infinite: false,
    draggable: false
  });

  // bind slider-header rotation
  $('.b-workshop-slider').on('afterChange', function(slick, currentSlide) {
    var stackName = $('.b-workshop-slider__item').eq(currentSlide.currentSlide).attr('data-stackname');
    var stackDate = $('.b-workshop-slider__item').eq(currentSlide.currentSlide).attr('data-stackdate');
    $('#j-wokshopStackName span').text(stackName);
    $('#j-wokshopStackDate span').text(stackDate);
  });

	// init first slider-header
  $('.b-workshop-slider').slick('slickGoTo', 0);

  
  $('.b-workshop-speaker__btn').on('click', function(e) {
    e.preventDefault();
    $(this).closest('.b-workshop').toggleClass('b-workshop--active')
  });
});
