$(function() {

	/*---------------------------Hide the preloader---------------------------*/
	$('.preloader').delay(1000).fadeOut('slow');


	/*---------------------------Filter---------------------------*/
	const worksSlider = $('[data-slider="slick"]');
	let filter = $("[data-filter]");

	filter.on("click", function(e) {
		e.preventDefault();
		let cat = $(this).data('filter');

		if (cat == 'all')
			$("[data-cat]").removeClass("hide");
		else {
			$("[data-cat]").each(function() {
				let workCat = $(this).data('cat');

				if (workCat != cat)
					$(this).addClass('hide');
				else
					$(this).removeClass('hide');
			});
		}
	});


	/*---------------------------Menu---------------------------*/

	$("nav, .about").on("click", "a", function (e) {
		e.preventDefault();
		var id  = $(this).attr('href'),
		top = $(id).offset().top;
		top -= ($(window).width() > 576) ? 30 : 120;
		$('body,html').animate({scrollTop: top}, 800);
	});


	/*---------------------------Modal---------------------------*/

	const modalCall = $("[data-modal]");
	const modalClose = $("[data-close]");

	modalCall.on("click", function(e) {
		e.preventDefault();

		let $this = $(this);
		let modalId = $this.data('modal');

		$(modalId).addClass('show');
		$("body").addClass('no-scroll');

		setTimeout(function() {
			$(modalId).find(".modal__dialog").css({
				transform: "scale(1)"
			});
		}, 200);

		worksSlider.slick('setPosition');
	});

	modalClose.on("click", function(e) {
		e.preventDefault();

		let $this = $(this);
		let modalParent = $this.parents('.modal');

		modalParent.find(".modal__dialog").css({
			transform: "scale(0)"
		});

		setTimeout(function() {
			modalParent.removeClass('show');
			$("body").removeClass('no-scroll');
		}, 200);
	});


	$(".modal").on("click", function(e) {
		let $this = $(this);

		$this.find(".modal__dialog").css({
			transform: "scale(0)"
		});

		setTimeout(function() {
			$this.removeClass('show');
			$("body").removeClass('no-scroll');
		}, 200);
	});

	$(".modal__dialog").on("click", function(e) {
		e.stopPropagation();
	});


	/*---------------------------Slider: https://kenwheeler.github.io/slick/---------------------------*/

	worksSlider.slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		arrows: false,
		dots: true,
		autoplay: true,
		autoplaySpeed: 2000
	});

	$(".slickPrev").on("click", function(e) {
		e.preventDefault();
		let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');
		currentSlider.slick("slickPrev");
	});

	$(".slickNext").on("click", function(e) {
		e.preventDefault();
		let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');
		currentSlider.slick("slickNext");
	});


	/*---------------------------Mobile nav---------------------------*/

	$("#navToggle").on("click", function(e) {
		e.preventDefault();
		$("#nav").toggleClass("show");
	});


	/*---------------------------Back to top button---------------------------*/

	$(window).scroll(function() {
		if ($(this).scrollTop() > 50)
			$('.top').addClass('active');
		else
			$('.top').removeClass('active');
	});

	$('.top').click(function() {
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});


	/*---------------------------Remove standard link behavior---------------------------*/

	$("#more-works").on("click", function(e) { e.preventDefault(); });
	$(".news__link").on("click", function(e) { e.preventDefault(); });
});