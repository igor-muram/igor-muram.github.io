$(function() {
	
	/* Preloader */
	$('.preloader__wrapper').delay(800).fadeOut('slow');


	/* Video */
	$('.js-video-poster, .play').on('click', function(e) {
		e.preventDefault();
		let wrapper = $(this).closest('.js-video-wrapper');
		videoPlay(wrapper);
		$('.play').fadeOut();
	});

	function videoPlay(wrapper) {
		let iframe = wrapper.find('.video-box'),
				src 	 = iframe.data('src');
		wrapper.addClass('active');
		iframe.attr('src', src);
	}

	$('.js-video-poster, .play').on('click', function() {
		var $video = $('.video-element'),
			src = $video.data('src');
	 
		$video.attr('src', src + '&autoplay=1');
	});


	/* Back to top button */
	$(window).scroll(function() {
		if ($(this).scrollTop() > 50)
			$('.top').addClass('active');
		else
			$('.top').removeClass('active');
	});

	$('.top').click(function() {
		$('html,body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});


	/* Menu */
	$('.header__burger').click(function() {
		$('.header-nav').addClass('active');
	});

	$('.header-nav__close').click(function() {
		$('.header-nav').removeClass('active');
	});

});