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
	});

});