$(function() {
	$('.preloader').delay(1500).fadeOut('slow');

	$('.header__slider').slick({
		infinite: true,
		fade: true,
		autoplay: true,
		autoplaySpeed: 10000,
		prevArrow: '<img class="slider-arrows slider-arrows__left wow fadeInRight" data-wow-delay=".5s" src="img/arrows-left.svg" alt=""></img>',
		nextArrow: '<img class="slider-arrows slider-arrows__right wow fadeInRight" data-wow-delay=".5s" src="img/arrows-right.svg" alt=""></img>',
		asNavFor: '.slider-dots-head',
	});

	$('.slider-dots-head').slick({
		slidesToShow: 4,
		slidesToScroll: 4,
		autoplay: true,
		autoplaySpeed: 13000,
		asNavFor: '.header__slider',
		responsive: [{
			breakpoint: 760,
			settings: {
				vertical: true,
				verticalSwiping: true,
			}
		},
		{
			breakpoint: 581,
			settings: "unslick"
		}]
	});

	$('.surf-slider').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		prevArrow: '<img class="slider-arrows slider-arrows__left wow fadeInRight" data-wow-delay="1.3s" data-wow-offset="170" src="img/arrows-left.svg" alt=""></img>',
		nextArrow: '<img class="slider-arrows slider-arrows__right wow fadeInRight" data-wow-delay="1.3s" data-wow-offset="170" src="img/arrows-right.svg" alt=""></img>',
		asNavFor: '.slider-map',
		focusOnSelect: true,
		responsive: [
		{
			breakpoint: 1367,
			settings: {
				slidesToShow: 3,
			}
		},
		{
			breakpoint: 965,
			settings: {
				slidesToShow: 2,
			}
		},
		{
			breakpoint: 715,
			settings: {
				slidesToShow: 1,
				centerMode: true,
				centerPadding: '120px'
			}
		},
		{
			breakpoint: 611,
			settings: {
				slidesToShow: 1,
				centerMode: true,
				centerPadding: '90px'
			}
		},
		{
			breakpoint: 521,
			settings: {
				slidesToShow: 1,
				centerMode: true,
				centerPadding: '50px'
			}
		},
		{
			breakpoint: 441,
			settings: {
				slidesToShow: 1,
			}
		}
		]
	});

	$('.slider-map').slick({
		slidesToShow: 8,
		slidesToScroll: 1,
		arrows: false,
		asNavFor: '.surf-slider',
		focusOnSelect: true,
		responsive: [
		{
			breakpoint: 1031,
			settings: {
				slidesToShow: 3,
			}
		},
		{
			breakpoint: 965,
			settings: {
				slidesToShow: 2,
			}
		},
		{
			breakpoint: 715,
			settings: {
				slidesToShow: 1,
				centerMode: true,
				centerPadding: '120px'
			}
		},
		{
			breakpoint: 611,
			settings: {
				slidesToShow: 1,
				centerMode: true,
				centerPadding: '90px'
			}
		},
		{
			breakpoint: 521,
			settings: {
				slidesToShow: 1,
				centerMode: true,
				centerPadding: '50px'
			}
		},
		{
			breakpoint: 441,
			settings: {
				slidesToShow: 1,
			}
		}
		]
	});

	$('.holder__slider, .shop__slider').slick({
		infinite: true,
		fade: true,
		prevArrow: '<img class="slider-arrows slider-arrows__left wow fadeInRight" data-wow-delay=".5s" data-wow-offset="200" src="img/arrows-left.svg" alt=""></img>',
		nextArrow: '<img class="slider-arrows slider-arrows__right wow fadeInRight" data-wow-delay=".5s" data-wow-offset="200" src="img/arrows-right.svg" alt=""></img>',
	});

	$('<div class="quantity-nav"><div class="quantity-button quantity-up"><img src="img/plus.svg" alt=""></div><div class="quantity-button quantity-down"><img src="img/minus.svg" alt=""></div></div>').insertAfter('.quantity input');
	$('.quantity').each(function() {
		var spinner = $(this),
		input = spinner.find('input[type="number"]'),
		btnUp = spinner.find('.quantity-up'),
		btnDown = spinner.find('.quantity-down'),
		min = input.attr('min'),
		max = input.attr('max');

		btnUp.click(function() {
			var oldValue = parseFloat(input.val()),
			newVal = (oldValue >= max) ? oldValue : oldValue + 1;
			spinner.find("input").val(newVal);
			spinner.find("input").trigger("change");
		});

		btnDown.click(function() {
			var oldValue = parseFloat(input.val()),
			newVal = (oldValue <= min) ? oldValue : oldValue - 1;
			spinner.find("input").val(newVal);
			spinner.find("input").trigger("change");
		});
	});

	var itemNum = 1;

	function count() {
		let sum = ($('.guests-' + itemNum).val() - 1) * $('.sum-' + itemNum).data('guests') 
		+ $('.nights-' + itemNum).val() * $('.sum-' + itemNum).data('nights');
		$('.sum-' + itemNum).html(sum);
	}

	$('.quantity-button').on('click', function() { 
		itemNum = $('.sleep__slider-item').closest(".slick-active").index() + 1;
		count();
	});

	$('.surfboard-box__circle').on('click', function() { 
		$(this).toggleClass('active');
	});

	var date = new Date(),
	month = date.getMonth() + 1,
	currMonth = (month < 10) ? '0' + month : month;

	$('.header__date-day').html(date.getDate());
	$('.header__date-month').html(currMonth);
	$('.header__date-year').html(date.getFullYear());

	const navToggle = $("#navToggle");
	const menu = $(".menu");

	navToggle.on("click", function(e) {
		e.preventDefault();
		menu.toggleClass("show");
	});

	new WOW().init();

	$(".header__arrows, .menu__list li").on("click", "a", function (e) {
		e.preventDefault();
		var id  = $(this).attr('href'),
		top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 800);
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

	$('.logo, .slider-item__info-link, .btn').on("click", function (e) {
		e.preventDefault();
	});

});