$(function() {

	/* Preloader */
	$('.preloader').delay(1500).fadeOut('slow');
	

	/* Slider */
	$('.header-slider').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 4000,
		vertical: true,
		dots: true,
		dotsClass: 'header-dots',
		arrows: false
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
	$("#navToggle").on("click", function(e) {
		e.preventDefault();
		$(".header-menu__list").slideToggle();
	});


	/* Scroll to section */
	$(".header-menu__list li").on("click", "a", function (e) {
		e.preventDefault();
		let id  = $(this).attr('href'),
		top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 800);
	});


	/* Wow JS initialization */
	wow = new WOW({ mobile: false });
	wow.init();

});