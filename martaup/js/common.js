$(function() {
	$('.preloader').delay(1500).fadeOut('slow');
	
	$('.header-slider').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 4000,
		vertical: true,
		dots: true,
		dotsClass: 'header-dots',
		arrows: false,
		responsive: [{
			breakpoint: 900,
			settings: "unslick"
		}]
	});

	$(window).scroll(function() {
		if ($(this).scrollTop() > 50)
			$('.top').addClass('active');
		else
			$('.top').removeClass('active');
	});

	$('.top').click(function() {
		$('html,body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});

	$("#navToggle").on("click", function(e) {
		e.preventDefault();
		$(".menu__list").slideToggle();
	});

});