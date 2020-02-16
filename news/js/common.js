$(function() {
	
	/* Preloader */
	$('.preloader__wrapper').delay(800).fadeOut('slow');


	/* Menu */
	$('.header__burger').click(function() {
		$('.header-nav').addClass('active');
	});

	$('.header-nav__close, .header-nav__list li a').click(function() {
		$('.header-nav').removeClass('active');
	});


	/* Likes */
	$('.likes').click(function() {
		$(this).toggleClass('active');

		let likes = $(this).children(".likes__count").data('likes');

		if ($(this).hasClass("active"))
			likes++;

		$(this).children(".likes__count").html(likes);
	});


	/* Back to top button */
	$(window).scroll(function() {
		if ($(this).scrollTop() > 50)
			$('.top').addClass('active');
		else
			$('.top').removeClass('active');
	});

	$('.top').click(function() {
		$('html, body').stop().animate({ scrollTop: 0 }, 'slow', 'swing');
	});

});