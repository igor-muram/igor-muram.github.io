$(function() {

	// Preloader
	$('.preloader__wrapper').delay(1000).fadeOut('slow');
	$('html').addClass('scroll');

	// Slider
	$('.slider__box').slick({
		prevArrow: '<img class="slider__arrow slider__arrow-left" src="img/arrow-left.svg">',
		nextArrow: '<img class="slider__arrow slider__arrow-right" src="img/arrow-right.svg">',
		dots: true,
		autoplay: true,
 		autoplaySpeed: 2500,
 		fade: true,
		cssEase: 'linear',
	});

	// Button
	let buttons = document.getElementsByClassName('button'),
			forEach = Array.prototype.forEach;

	forEach.call(buttons, function (b) {
		if (!b.classList.contains('disabled'))
			b.addEventListener('click', addElement);
  });

	function addElement(e) {
		let addDiv = document.createElement('div'),
				mValue = Math.max(this.clientWidth, this.clientHeight),
				rect = this.getBoundingClientRect(),
				sDiv = addDiv.style,
				px = 'px';

		sDiv.width = sDiv.height = mValue + px;
		sDiv.left = e.clientX - rect.left - (mValue / 2) + px;
		sDiv.top = e.clientY - rect.top - (mValue / 2) + px;

		addDiv.classList.add('ripple');
		this.appendChild(addDiv);
	}

	// Menu
	$('.menu__btn').on('click', function() {
		$('.menu__list').toggleClass('active');
		$(this).toggleClass('active');
		$('html').toggleClass('scroll');
	});

	$('.menu__item, .login, .phone').on('click', function() {
		$('.menu__list').removeClass('active');
		$('.menu__btn').removeClass('active');
		$('html').addClass('scroll');
	});

	// Scroll to section
	$(".menu__link, .footer__menu-link").on("click", function (e) {
		e.preventDefault();
		let id  = $(this).attr('href'),
		top = $(id).offset().top;
		$('body, html').animate({scrollTop: top}, 800);
	});

	// Back to top button
	$(window).scroll(function() {
		if ($(this).scrollTop() > 50)
			$('.top').addClass('active');
		else
			$('.top').removeClass('active');
	});

	$('.top').click(function() {
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});

});