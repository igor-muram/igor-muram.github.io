$(function () {

	/* Preloader */
	$('.preloader__wrapper').delay(800).fadeOut('slow');


	/* Menu */
	$('.header__burger').click(function () {
		$('.header-nav').addClass('active');
	});

	$('.header-nav__close, .header-nav__list li a').click(function () {
		$('.header-nav').removeClass('active');
	});


	/* Likes */
	$('.likes').click(function () {
		$(this).toggleClass('active');

		let likes = $(this).children(".likes__count").data('likes');

		if ($(this).hasClass("active"))
			likes++;

		$(this).children(".likes__count").html(likes);
	});


	/* Back to top button */
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50)
			$('.top').addClass('active');
		else
			$('.top').removeClass('active');
	});

	$('.top').click(function () {
		$('html, body').stop().animate({ scrollTop: 0 }, 'slow', 'swing');
	});


	/* Modal windows */
	$('.registration-link, .authorization-link, .contact-link, .remove-link, .change-link, .add-news-btn, .close, .js-no').click(function () {
		$('.container').toggleClass('blur');
		$('body').toggleClass('no-scroll');
	});

	$('.registration-link').click(function () {
		$('.popup-registration').toggleClass('active');
	});

	$('.authorization-link').click(function () {
		$('.popup-authorization').toggleClass('active');
	});

	$('.contact-link').click(function () {
		$('.popup-contact').toggleClass('active');
	});

	$('.remove-link').click(function () {
		$('.popup-remove').toggleClass('active');
	});

	$('.change-link').click(function () {
		$('.popup-change').toggleClass('active');
	});

	$('.remove-link, .change-link').click(function () {
		$('.news-item__options, .news-item__dots').removeClass('active');
	});

	$('.add-news-btn').click(function () {
		$('.popup-add-news').toggleClass('active');
	});

	$('.close, .js-no').click(function () {
		$('.popup').removeClass('active');
	});

	$('.js-yes').click(function () {
		let content = $(this).closest('.popup__content'),
			confirm = $(this).closest('.popup').find('.confirm-text'),
			preloader = $(this).closest('.popup').find('.popup-preloader');

		content.addClass('hide');
		preloader.addClass('active').show().delay(600).fadeOut('fast');

		setTimeout(function () {
			confirm.show().delay(1100).fadeOut('fast');
		}, 800);

		setTimeout(function () {
			$('.container').removeClass('blur');
			$('body').removeClass('no-scroll');
			preloader.removeClass('active');
			content.removeClass('hide');
			$('.popup-remove').addClass('none').removeClass('active');
		}, 2000);

		setTimeout(function () {
			$('.popup-remove').removeClass('none');
		}, 2100);
	});


	/* Tabs */
	$('.popup-authorization').on("click", ".tab", function () {
		$('.popup-authorization').find('.active').removeClass('active');

		$(this).addClass('active');
		$('.tab-form').eq($(this).index()).addClass('active');
	});


	/* Dots */
	$('.news-item__dots').click(function () {
		$(this).closest('.news-item').find('.news-item__options').toggleClass('active');
		$(this).toggleClass('active');
	});

	$(document).click(function (e) {
		let options = $('.news-item__options'),
			dots = $('.news-item__dots');

		if (!options.is(e.target) && !dots.is(e.target) && dots.has(e.target).length === 0 && options.has(e.target).length === 0) {
			options.removeClass("active");
			dots.removeClass("active");
		}
	});
});