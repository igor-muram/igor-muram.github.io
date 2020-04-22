$(function() {

	$('.preloader').delay(1500).fadeOut('slow');

	var CircleContainerSize = $('#trigonometric1Plot1').height() + 2;
	function InitCircleContainerSize(plot, container)
	{
		var _width = $(window).width();
		if (container == ".trigonometric-column")
		{
			if (_width >= 576 && _width <= 767)
				CircleContainerSize = 394;
			else if (_width >= 768 && _width <= 991) 
				CircleContainerSize = 453;
			else if (_width >= 992 && _width <= 1199) 
				CircleContainerSize = 467;
			else if (_width <= 575 || _width >= 1200)
				CircleContainerSize = $('#trigonometric1Plot1').height() + 2;
		}
		$(plot).css("height", CircleContainerSize + "px");
		$(plot).css("width", CircleContainerSize + "px");
		$(plot).css("left", ($(container).width() - CircleContainerSize) / 2.0 + "px");
	}

	InitCircleContainerSize("#trigonometric1Plot3", ".trigonometric-column");
	InitCircleContainerSize("#trigonometric2Plot3", ".trigonometric-column");
	InitCircleContainerSize("#methodsPlot1", ".methods-column");
	InitCircleContainerSize("#methodsPlot2", ".methods-column");
	InitCircleContainerSize("#methodsPlot3", ".methods-column");
	InitCircleContainerSize("#methodsPlot4", ".methods-column");
	InitCircleContainerSize("#methodsPlot5", ".methods-column");

	$('#my-menu').mmenu({
		extensions: [ 'widescreen', 'effect-menu-slide', 'pagedim-black' ],
		navbars: [{ "position": "top", "content": [ "searchfield" ] }],
		navbar: { title: 'Содержание' },
		searchfield: { "panel": true, "placeholder": "Поиск", "noResults": "Нет подходящих результатов" }}, { searchfield: { "clear": true },
	});

	$('.hamburger').on("click", function(e) {
		$('#particles-js').hide();
		$('.logo').fadeOut('slow');
		$('.developers-container').fadeOut('slow');
	});

	var api = $('#my-menu').data('mmenu');
	api.bind('open:finish', function() {
		$('.hamburger').addClass('is-active');
	}).bind('close:finish', function() {
		api.closeAllPanels();
		$('.hamburger').removeClass('is-active');
		$('#particles-js').fadeIn('fast');
		$('.logo').fadeIn('fast');
		$('.developers-container').fadeIn('fast');
	});

	$(window).scroll(function() {
		if ($(this).scrollTop() > 50)
			$('.top').addClass("active");
		else
			$('.top').removeClass("active");
	});

	$('.top').click(function() {
		$('html,body').stop().animate({ scrollTop: 0 }, 'slow', 'swing');
	});

	function panelCollapseCheck()
	{
		var _width = $(window).width();
		if (_width <= 575)
			$('.panel-collapse').width(_width * 0.77);
		else if (_width >= 576 && _width <= 767 || _width >= 992 && _width <= 1199)
			$('.panel-collapse').width(_width * 0.86);
		else if (_width >= 768 && _width <= 991 || _width >= 1301 && _width <= 1499)
			$('.panel-collapse').width(_width * 0.89);
		else if (_width >= 1200 && _width <= 1300)
			$('.panel-collapse').width(_width * 0.88);
		else if (_width >= 1500)
			$('.panel-collapse').width(_width * 0.9);
	}

	$(window).resize(function() {
		panelCollapseCheck();
	});

	$('.panel-heading').on("click", function(e) {
		$(this).toggleClass('in').next().slideToggle();
		$('.panel-heading').not(this).removeClass('in').next().slideUp();
		panelCollapseCheck();
	});

	$('.example1').on("click", function(e) {
		$(".ceilExample1").toggleClass('is-checked');
	});

	$('.example2').on("click", function(e) {
		$(".ceilExample2").toggleClass('is-checked');
	});

	$('.mirrorUD').on("click", function(e) {
		$(".ceilMirrorUD").toggleClass('is-checked');
	});

	$('.mirrorLR').on("click", function(e) {
		$(".ceilMirrorLR").toggleClass('is-checked');
	});

	$('.moduleUD').on("click", function(e) {
		$(".ceilModuleUD").toggleClass('is-checked');
	});

	$('.moduleLR').on("click", function(e) {
		$(".ceilModuleLR").toggleClass('is-checked');
	});

	$("div.markdown-body").removeClass('container-lg');

});

//---------------------------particles-js---------------------------//

if (document.title == "Графики функций" || document.title == "Разработчики" || document.title == "Страница не найдена") { particlesJS('particles-js', { "particles": { "number": { "value": 65, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#2A2A34" }, "shape": {  "type": "circle", "stroke": { "width": 0, "color": "#2A2A34" }, "polygon": { "nb_sides": 5 }, "image": { "src": "img/github.svg", "width": 620, "height": 690 } }, "opacity": {  "value": 1, "random": false, "anim": {  "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } }, "line_linked": { "enable": true, "distance": 180, "color": "#2A2A34", "opacity": 0.67, "width": 1.15 }, "move": { "enable": true, "speed": 2.7, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600,     "rotateY": 1200    } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false, "mode": "bubble" }, "onclick": { "enable": false, "mode": "repulse" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 0.6 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true }); }

//---------------------------methods---------------------------//

else if (document.title == "Способы задания функций и кривых")
{
	var methodsPlot1Board  = JXG.JSXGraph.initBoard('methodsPlot1', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-2.4, 2.4, 2.4, -2.4], registerEvents: false, showNavigation: false, keepaspectratio: true, showCopyright: false, axis: true, grid: true });
	var methodsPlot1 = methodsPlot1Board.create('functiongraph', [function(x) { return Math.sqrt(4 - x * x); }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var methodsPlot2 = methodsPlot1Board.create('functiongraph', [function(x) { return -Math.sqrt(4 - x * x); }], { strokeWidth: 2, strokeColor: '#000', dash: 3 });
	var point1 = methodsPlot1Board.create('point', [2, 0], { name: '', size: 3, color: '#000' });
	var label1 = methodsPlot1Board.create('text', [2.1, -0.25, '$$2$$'], { fontSize: 19, color: '#000' });

	var methodsPlot2Board  = JXG.JSXGraph.initBoard('methodsPlot2', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-2.4, 2.4, 2.4, -2.4], registerEvents: false, showNavigation: false, keepaspectratio: true, showCopyright: false, axis: true, grid: true });
	var methodsPlot3 = methodsPlot2Board.create('functiongraph', [function(x) { return Math.sqrt(4 - x * x); }], { strokeWidth: 2, strokeColor: '#000', dash: 3 });
	var methodsPlot4 = methodsPlot2Board.create('functiongraph', [function(x) { return -Math.sqrt(4 - x * x); }], { strokeWidth: 3, strokeColor: '#ff0000' });
	var point2 = methodsPlot2Board.create('point', [2, 0], { name: '', size: 3, color: '#000' });
	var label2 = methodsPlot2Board.create('text', [2.1, -0.25, '$$2$$'], { fontSize: 19, color: '#000' });

	var methodsPlot3Board  = JXG.JSXGraph.initBoard('methodsPlot3', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-2.4, 2.4, 2.4, -2.4], registerEvents: false, showNavigation: false, keepaspectratio: true, showCopyright: false, axis: true, grid: true });
	var methodsPlot5 = methodsPlot3Board.create('functiongraph', [function(x) { if (x >= 0) return Math.sqrt(4 - x * x); }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var methodsPlot6 = methodsPlot3Board.create('functiongraph', [function(x) { if (x >= 0) return -Math.sqrt(4 - x * x); }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var methodsPlot7 = methodsPlot3Board.create('functiongraph', [function(x) { if (x <= 0) return Math.sqrt(4 - x * x); }], { strokeWidth: 2, strokeColor: '#000', dash: 3 });
	var methodsPlot8 = methodsPlot3Board.create('functiongraph', [function(x) { if (x <= 0) return -Math.sqrt(4 - x * x); }], { strokeWidth: 2, strokeColor: '#000', dash: 3 });
	var point3 = methodsPlot3Board.create('point', [2, 0], { name: '', size: 3, color: '#000' });
	var label3 = methodsPlot3Board.create('text', [2.1, -0.25, '$$2$$'], { fontSize: 19, color: '#000' });

	var methodsPlot4Board  = JXG.JSXGraph.initBoard('methodsPlot4', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-2.4, 2.4, 2.4, -2.4], registerEvents: false, showNavigation: false, keepaspectratio: true, showCopyright: false, axis: true, grid: true });
	var methodsPlot9 = methodsPlot4Board.create('functiongraph',[function(x) { if (x >= 0) return Math.sqrt(4 - x * x); }], { strokeWidth: 2, strokeColor: '#000', dash: 3 });
	var methodsPlot10 = methodsPlot4Board.create('functiongraph',[function(x) { if (x >= 0) return -Math.sqrt(4 - x * x); }], { strokeWidth: 2, strokeColor: '#000', dash: 3 });
	var methodsPlot11 = methodsPlot4Board.create('functiongraph',[function(x) { if (x <= 0) return Math.sqrt(4 - x * x); }], { strokeWidth: 3, strokeColor: '#ff0000' });
	var methodsPlot12 = methodsPlot4Board.create('functiongraph',[function(x) { if (x <= 0) return -Math.sqrt(4 - x * x); }], { strokeWidth: 3, strokeColor: '#ff0000' });
	var point4 = methodsPlot4Board.create('point', [2, 0], { name: '', size: 3, color: '#000' });
	var label4 = methodsPlot4Board.create('text', [2.1, -0.25, '$$2$$'], { fontSize: 19, color: '#000' });

	var methodsPlot5Board  = JXG.JSXGraph.initBoard('methodsPlot5', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-2.4, 2.4, 2.4, -2.4], registerEvents: false, showNavigation: false, keepaspectratio: true, showCopyright: false, axis: true, grid: true });
	var methodsPlot13 = methodsPlot5Board.create('circle', [[0, 0], [0, 2]], { strokeColor: '#6535bf', strokeWidth: 3 });
	var point5 = methodsPlot5Board.create('point', [2, 0], { name: '', size: 3, color: '#000' });
	var label5 = methodsPlot5Board.create('text', [2.1, -0.25, '$$2$$'], { fontSize: 19, color: '#000' });

	var size = 0;
	function CircleContainerSize(string1, string2, string3, string4, string5)
	{
		var _width = $(window).width();
		if (_width <= 400)
			size = 300;
		else if (_width >= 460 && _width <= 1499) 
			size = 410;
		else
			size = 365;
		$(string1).css("height", size + "px");
		$(string1).css("width", size + "px");
		$(string1).css("left", ($('.methods-column').width() - size) / 2.0 + "px");
		$(string2).css("height", size + "px");
		$(string2).css("width", size + "px");
		$(string2).css("left", ($('.methods-column').width() - size) / 2.0 + "px");
		$(string3).css("height", size + "px");
		$(string3).css("width", size + "px");
		$(string3).css("left", ($('.methods-column').width() - size) / 2.0 + "px");
		$(string4).css("height", size + "px");
		$(string4).css("width", size + "px");
		$(string4).css("left", ($('.methods-column').width() - size) / 2.0 + "px");
		$(string5).css("height", size + "px");
		$(string5).css("width", size + "px");
		$(string5).css("left", ($('.methods-column').width() - size) / 2.0 + "px");

		methodsPlot1Board.resizeContainer(size, size, true, true);
		methodsPlot1Board.setBoundingBox([-2.4, 2.4, 2.4, -2.4], false);
		methodsPlot2Board.resizeContainer(size, size, true, true);
		methodsPlot2Board.setBoundingBox([-2.4, 2.4, 2.4, -2.4], false);
		methodsPlot3Board.resizeContainer(size, size, true, true);
		methodsPlot3Board.setBoundingBox([-2.4, 2.4, 2.4, -2.4], false);
		methodsPlot4Board.resizeContainer(size, size, true, true);
		methodsPlot4Board.setBoundingBox([-2.4, 2.4, 2.4, -2.4], false);
		methodsPlot5Board.resizeContainer(size, size, true, true);
		methodsPlot5Board.setBoundingBox([-2.4, 2.4, 2.4, -2.4], false);
	}
	CircleContainerSize("#methodsPlot1", "#methodsPlot2", "#methodsPlot3", "#methodsPlot4", "#methodsPlot5");

	$(window).resize(function() { 
		CircleContainerSize("#methodsPlot1", "#methodsPlot2", "#methodsPlot3", "#methodsPlot4", "#methodsPlot5");
	});
}

//---------------------------straight---------------------------//

else if (document.title == "Прямая")
{
	var straightPlot1Board  = JXG.JSXGraph.initBoard('straightPlot1', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-1, 4, 4, -1], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var straightPlot1 = straightPlot1Board.create('functiongraph', [function(x) { return x / 3 + 2; }], { strokeWidth: 3, strokeColor: '#007800' });
	var line1 = straightPlot1Board.create('line', [[0, 2], [3, 2]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });
	var line2 = straightPlot1Board.create('line', [[3, 2], [3, 3]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });
	var label1 = straightPlot1Board.create('text', [-0.25, 2.25, '$$b$$'], { fontSize: 20, color: '#ff0000' });
	var label2 = straightPlot1Board.create('text', [1.5, 2.3, '$$α$$'], { fontSize: 20, color: '#1e28ff' });
	var point1 = straightPlot1Board.create('point', [0, 2], { name: '', size: 3, color: '#000' });
	var txt1 = straightPlot1Board.create('text', [3.83, -0.2, '$$x$$'], { fontSize: 20, color: '#000' });
	var txt2 = straightPlot1Board.create('text', [0.1, 3.85, '$$y$$'], { fontSize: 20, color: '#000' });

	var straightPlot2Board  = JXG.JSXGraph.initBoard('straightPlot2', {
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-1, 4, 4, -1], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var straightPlot2 = straightPlot2Board.create('functiongraph', [function(x) { return -3 * x / 2 + 3; }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var line3 = straightPlot2Board.create('line', [[0, 0], [2, 0]], { straightFirst: false, straightLast: false, strokeColor: '#ff0000', strokeWidth: 3, dash: 3 });
	var line4 = straightPlot2Board.create('line', [[0, 0], [0, 3]], { straightFirst: false, straightLast: false, strokeColor: '#007800', strokeWidth: 3, dash: 3 });
	var label3 = straightPlot2Board.create('text', [2.1, 0.2, '$$a$$'], { fontSize: 20, color: '#ff0000' });
	var label4 = straightPlot2Board.create('text', [0.1, 3.2, '$$b$$'], { fontSize: 20, color: '#007800' });
	var point2 = straightPlot2Board.create('point', [2, 0], { name: '', size: 3, color: '#000' });
	var point3 = straightPlot2Board.create('point', [0, 3], { name: '', size: 3, color: '#000' });
	var txt3 = straightPlot2Board.create('text', [3.85, -0.2, '$$x$$'], { fontSize: 20, color: '#000' });
	var txt4 = straightPlot2Board.create('text', [0.1, 3.85, '$$y$$'], { fontSize: 20, color: '#000' });

	var straightPlot3Board  = JXG.JSXGraph.initBoard('straightPlot3', {
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-1, 4, 4, -1], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var straightPlot3 = straightPlot3Board.create('functiongraph', [function(x) { return 3; }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var line5 = straightPlot3Board.create('line', [[2, -1.1], [2, 4.1]], { straightFirst: false, straightLast: false, strokeColor: '#007800', strokeWidth: 3 });
	var label5 = straightPlot3Board.create('text', [2.1, -0.7, '$$x=c$$'], { fontSize: 20, color: '#007800' });
	var label6 = straightPlot3Board.create('text', [-0.9, 3.25, '$$y=b$$'], { fontSize: 20, color: '#1e28ff' });
	var label7 = straightPlot3Board.create('text', [2.1, 0.2, '$$c$$'], { fontSize: 20, color: '#007800' });
	var label8 = straightPlot3Board.create('text', [0.1, 2.7, '$$b$$'], { fontSize: 20, color: '#1e28ff' });
	var point4 = straightPlot3Board.create('point', [2, 0], { name: '', size: 3, color: '#000' });
	var point5 = straightPlot3Board.create('point', [0, 3], { name: '', size: 3, color: '#000' });
	var txt5 = straightPlot3Board.create('text', [3.85, -0.2, '$$x$$'], { fontSize: 20, color: '#000' });
	var txt6 = straightPlot3Board.create('text', [0.1, 3.85, '$$y$$'], { fontSize: 20, color: '#000' });

	var straightPlot4Board  = JXG.JSXGraph.initBoard('straightPlot4', {
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-2, 6, 15, -6], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var straightPlot4 = straightPlot4Board.create('functiongraph', [function(x) { return x - 4; }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var straightPlot5 = straightPlot4Board.create('functiongraph', [function(x) { return x / 3 - 4; }], { strokeWidth: 3, strokeColor: '#007800' });
	var straightPlot6 = straightPlot4Board.create('functiongraph', [function(x) { return -x + 4; }], { strokeWidth: 3, strokeColor: '#6535bf' });
	var straightPlot7 = straightPlot4Board.create('functiongraph', [function(x) { return -x / 3 + 4; }], { strokeWidth: 3, strokeColor: '#ff0000' });
	var straightPlot8 = straightPlot4Board.create('functiongraph', [function(x) { return Math.sqrt(3) * x - 4; }], { strokeWidth: 3, strokeColor: '#000' });
	var point6 = straightPlot4Board.create('point', [0, 4], { name: '', size: 3, color: '#000' });
	var point7 = straightPlot4Board.create('point', [0, -4], { name: '', size: 3, color: '#000' });
	var point8 = straightPlot4Board.create('point', [4, 0], { name: '', size: 3, color: '#000' });
	var point9 = straightPlot4Board.create('point', [12, 0], { name: '', size: 3, color: '#000' });
	var point10 = straightPlot4Board.create('point', [2.309, 0], { name: '', size: 3, color: '#000' });
	var txt7 = straightPlot4Board.create('text', [6.3, 4.5, '$$y=x-4$$'], { fontSize: 20, color: '#1e28ff' });
	var txt8 = straightPlot4Board.create('text', [8.3, -2.4, '$$y=0.33 ⋅ x-4$$'], { fontSize: 20, color: '#007800' });
	var txt9 = straightPlot4Board.create('text', [6, -4.5, '$$y=-x+4$$'], { fontSize: 20, color: '#6535bf' });
	var txt10 = straightPlot4Board.create('text', [8.3, 2.5, '$$y=-0.33 ⋅ x+4$$'], { fontSize: 20, color: '#ff0000' });
	var txt11 = straightPlot4Board.create('text', [0.1, 4.5, '$$4$$'], { fontSize: 18, color: '#000' });
	var txt12 = straightPlot4Board.create('text', [0.05, -4.4, '$$-4$$'], { fontSize: 18, color: '#000' });
	var txt13 = straightPlot4Board.create('text', [3.9, -0.7, '$$4$$'], { fontSize: 18, color: '#000' });
	var txt14 = straightPlot4Board.create('text', [2.15, -0.7, '$$2.3$$'], { fontSize: 18, color: '#000' });
	var txt15 = straightPlot4Board.create('text', [11.85, -0.7, '$$12$$'], { fontSize: 18, color: '#000' });
	var txt16 = straightPlot4Board.create('text', [2.4, 4.5, '$$y=√3x-4$$'], { fontSize: 20, color: '#000' });
	var txt17 = straightPlot4Board.create('text', [4.7, 0.35, '$$45°$$'], { fontSize: 19, color: '#000' });
	var txt18 = straightPlot4Board.create('text', [2.7, 0.35, '$$60°$$'], { fontSize: 19, color: '#000' });
	var txt19 = straightPlot4Board.create('text', [14.7, -0.5, '$$x$$'], { fontSize: 20, color: '#000' });
	var txt20 = straightPlot4Board.create('text', [0.1, 5.7, '$$y$$'], { fontSize: 20, color: '#000' });

	$(window).resize(function() { 
		straightPlot1Board.resizeContainer($('#straightPlot1').width(), $('#straightPlot1').height(), true, true);
		straightPlot1Board.setBoundingBox([-1, 4, 4, -1], false);
		straightPlot2Board.resizeContainer($('#straightPlot2').width(), $('#straightPlot2').height(), true, true);
		straightPlot2Board.setBoundingBox([-1, 4, 4, -1], false);
		straightPlot3Board.resizeContainer($('#straightPlot3').width(), $('#straightPlot3').height(), true, true);
		straightPlot3Board.setBoundingBox([-1, 4, 4, -1], false);
		straightPlot4Board.resizeContainer($('#straightPlot4').width(), $('#straightPlot4').height(), true, true);
		straightPlot4Board.setBoundingBox([-2, 6, 15, -6], false);
	});
}

//---------------------------parabola---------------------------//

else if (document.title == "Парабола")
{
	var parabolaPlot1Board  = JXG.JSXGraph.initBoard('parabolaPlot1', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-1, 11, 6, -5], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var parabolaPlot1 = parabolaPlot1Board.create('functiongraph', [function(x) { return 4 * (x - 3) * (x - 3) + 3; }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var parabolaPlot2 = parabolaPlot1Board.create('functiongraph', [function(x) { return -4 * (x - 3) * (x - 3) + 3; }], { strokeWidth: 3, strokeColor: '#007800' });
	var label1 = parabolaPlot1Board.create('text', [-0.5, 3.05, '$$m$$'], { fontSize: 20, color: '#ff0000' });
	var label2 = parabolaPlot1Board.create('text', [2.93, -0.6, '$$p$$'], { fontSize: 20, color: '#6535bf' });
	var label3 = parabolaPlot1Board.create('text', [4.6, 8.5, '$$a>0$$'], { fontSize: 20, color: '#1e28ff' });
	var label4 = parabolaPlot1Board.create('text', [4.6, -2.5, '$$a<0$$'], { fontSize: 20, color: '#007800' });
	var label5 = parabolaPlot1Board.create('text', [5.75, -0.55, '$$x$$'], { fontSize: 20, color: '#000' });
	var label6 = parabolaPlot1Board.create('text', [0.1, 10.6, '$$y$$'], { fontSize: 20, color: '#000' });
	var line1 = parabolaPlot1Board.create('line', [[-0.08, 3], [0.08, 3]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });
	var line2 = parabolaPlot1Board.create('line', [[3, -0.2], [3, 0.2]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });
	var point1 = parabolaPlot1Board.create('point', [3, 3], { name: '', size: 3, color: '#000' });

	var parabolaPlot2Board  = JXG.JSXGraph.initBoard('parabolaPlot2', {
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-1, 11, 6, -5], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var parabolaPlot3 = parabolaPlot2Board.create('functiongraph', [function(x) { return 20 * (x - 1) * (x - 1) - 3.7; }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var parabolaPlot4 = parabolaPlot2Board.create('functiongraph', [function(x) { return 16 * (x - 3.06) * (x - 3.06); }], { strokeWidth: 3, strokeColor: '#007800' });
	var parabolaPlot5 = parabolaPlot2Board.create('functiongraph', [function(x) { return 14 * (x - 5) * (x - 5) + 3.7; }], { strokeWidth: 3, strokeColor: '#6535bf' });
	var point2 = parabolaPlot2Board.create('point', [1.43, 0], { name: '', size: 2, color: '#000' });
	var point3 = parabolaPlot2Board.create('point', [0.57, 0], { name: '', size: 2, color: '#000' });
	var point4 = parabolaPlot2Board.create('point', [3.06, 0], { name: '', size: 2, color: '#000' });
	var label7 = parabolaPlot2Board.create('text', [0.53, -4.45, '$$D>0$$'], { fontSize: 20, color: '#1e28ff' });
	var label8 = parabolaPlot2Board.create('text', [2.6, -1, '$$D=0$$'], { fontSize: 20, color: '#007800' });
	var label9 = parabolaPlot2Board.create('text', [4.6, 2.6, '$$D<0$$'], { fontSize: 20, color: '#6535bf' });
	var label10 = parabolaPlot2Board.create('text', [5.75, -0.55, '$$x$$'], { fontSize: 20, color: '#000' });
	var label11 = parabolaPlot2Board.create('text', [-0.3, 10.6, '$$y$$'], { fontSize: 20, color: '#000' });

	var parabolaPlot3Board  = JXG.JSXGraph.initBoard('parabolaPlot3', {
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-1, 5.3, 6, -11], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var parabolaPlot6 = parabolaPlot3Board.create('functiongraph', [function(x) { return -20 * (x - 1) * (x - 1) + 3.7; }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var parabolaPlot7 = parabolaPlot3Board.create('functiongraph', [function(x) { return -16 * (x - 3.06) * (x - 3.06); }], { strokeWidth: 3, strokeColor: '#007800' });
	var parabolaPlot8 = parabolaPlot3Board.create('functiongraph', [function(x) { return -14 * (x - 5) * (x - 5) - 3.7; }], { strokeWidth: 3, strokeColor: '#6535bf' });
	var point5 = parabolaPlot3Board.create('point', [1.43, 0], { name: '', size: 2, color: '#000' });
	var point6 = parabolaPlot3Board.create('point', [0.57, 0], { name: '', size: 2, color: '#000' });
	var point7 = parabolaPlot3Board.create('point', [3.06, 0], { name: '', size: 2, color: '#000' });
	var label12 = parabolaPlot3Board.create('text', [0.53, 4.45, '$$D>0$$'], { fontSize: 20, color: '#1e28ff' });
	var label13 = parabolaPlot3Board.create('text', [2.6, 1, '$$D=0$$'], { fontSize: 20, color: '#007800' });
	var label14 = parabolaPlot3Board.create('text', [4.6, -2.6, '$$D<0$$'], { fontSize: 20, color: '#6535bf' });
	var label15 = parabolaPlot3Board.create('text', [5.75, -0.55, '$$x$$'], { fontSize: 20, color: '#000' });
	var label16 = parabolaPlot3Board.create('text', [-0.3, 4.7, '$$y$$'], { fontSize: 20, color: '#000' });

	var parabolaPlot4Board  = JXG.JSXGraph.initBoard('parabolaPlot4', {
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-2, 10, 8, -10], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var parabolaPlot9 = parabolaPlot4Board.create('functiongraph', [function(x) { return 2 * (x - 3) * (x - 3) + 1; }], { strokeWidth: 3, strokeColor: '#6535bf' });
	var parabolaPlot10 = parabolaPlot4Board.create('functiongraph', [function(x) { return 0.5 * (x - 3) * (x - 3) + 1; }], { strokeWidth: 3, strokeColor: '#ff0000' });
	var parabolaPlot11 = parabolaPlot4Board.create('functiongraph', [function(x) { return -2 * (x - 3) * (x - 3) + 1; }], { strokeWidth: 3, strokeColor: '#007800' });
	var parabolaPlot12 = parabolaPlot4Board.create('functiongraph', [function(x) { return -2 * (x - 3) * (x - 3) - 2; }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var label17 = parabolaPlot4Board.create('text', [1.5, 8.5, '$$y=2(x-3)$$^{$$2$$} $$+$$ $$1$$'], { fontSize: 18, color: '#6535bf' });
	var label18 = parabolaPlot4Board.create('text', [4.5, 0.8, '$$y=0.5(x-3)$$^{$$2$$}$$+$$$$1$$'], { fontSize: 18, color: '#ff0000' });
	var label19 = parabolaPlot4Board.create('text', [4.5, -3.15, '$$y=-2(x-3)$$^{$$2$$}$$+$$$$1$$'], { fontSize: 18, color: '#007800' });
	var label20 = parabolaPlot4Board.create('text', [1.3, -9.2, '$$y=-2(x-3)$$^{$$2$$}$$-$$$$2$$'], { fontSize: 18, color: '#1e28ff' });
	var label21 = parabolaPlot4Board.create('text', [7.65, -0.6, '$$x$$'], { fontSize: 20, color: '#000' });
	var label22 = parabolaPlot4Board.create('text', [-0.4, 9.6, '$$y$$'], { fontSize: 20, color: '#000' });

	$(window).resize(function() { 
		parabolaPlot1Board.resizeContainer($('#parabolaPlot1').width(), $('#parabolaPlot1').height(), true, true);
		parabolaPlot1Board.setBoundingBox([-1, 11, 6, -5], false);
		parabolaPlot2Board.resizeContainer($('#parabolaPlot2').width(), $('#parabolaPlot2').height(), true, true);
		parabolaPlot2Board.setBoundingBox([-1, 11, 6, -5], false);
		parabolaPlot3Board.resizeContainer($('#parabolaPlot3').width(), $('#parabolaPlot3').height(), true, true);
		parabolaPlot3Board.setBoundingBox([-1, 5.3, 6, -11], false);
		parabolaPlot4Board.resizeContainer($('#parabolaPlot4').width(), $('#parabolaPlot4').height(), true, true);
		parabolaPlot4Board.setBoundingBox([-2, 10, 8, -10], false);
	});
}

//---------------------------hyperbole---------------------------//

else if (document.title == "Гипербола")
{
	var hyperbolePlot1Board  = JXG.JSXGraph.initBoard('hyperbolePlot1', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-5, 5, 5, -5], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var hyperbolePlot1 = hyperbolePlot1Board.create('functiongraph', [function(x) { return 1 / x; }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var label1 = hyperbolePlot1Board.create('text', [4.65, -0.3, '$$x$$'], { fontSize: 21, color: '#000' });
	var label2 = hyperbolePlot1Board.create('text', [-0.4, 4.7, '$$y$$'], { fontSize: 21, color: '#000' });

	var hyperbolePlot2Board  = JXG.JSXGraph.initBoard('hyperbolePlot2', {
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-8, 9, 4, -3], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var hyperbolePlot2 = hyperbolePlot2Board.create('functiongraph', [function(x) { return 3 + 3 / (x + 2); }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var hyperbolePlot3 = hyperbolePlot2Board.create('functiongraph', [function(x) { return 3 - 3 / (x + 2); }], { strokeWidth: 3, strokeColor: '#007800' });
	var line1 = hyperbolePlot2Board.create('functiongraph', [function(x) { return 3; }], { strokeColor: '#6535bf', strokeWidth: 2, dash: 3 });
	var line2 = hyperbolePlot2Board.create('line', [[-2, -3.1], [-2, 9.1]], { straightFirst: false, straightLast: false, strokeColor: '#ff0000', strokeWidth: 2, dash: 3 });
	var label3 = hyperbolePlot2Board.create('text', [-0.5, 3.6, '$$p$$'], { fontSize: 20, color: '#6535bf' });
	var label4 = hyperbolePlot2Board.create('text', [-2.85, -0.4, '$$-q$$'], { fontSize: 20, color: '#ff0000' });
	var label5 = hyperbolePlot2Board.create('text', [2.43, 4.45, '$$s>0$$'], { fontSize: 20, color: '#1e28ff' });
	var label6 = hyperbolePlot2Board.create('text', [2.43, 1.45, '$$s<0$$'], { fontSize: 20, color: '#007800' });
	var label7 = hyperbolePlot2Board.create('text', [3.6, -0.4, '$$x$$'], { fontSize: 21, color: '#000' });
	var label8 = hyperbolePlot2Board.create('text', [0.15, 8.7, '$$y$$'], { fontSize: 21, color: '#000' });

	var hyperbolePlot3Board  = JXG.JSXGraph.initBoard('hyperbolePlot3', {
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-8, 5, 8, -5], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var hyperbolePlot4 = hyperbolePlot3Board.create('functiongraph', [function(x) { return 2 * Math.sqrt(x * x - 9) / 3.0; }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var hyperbolePlot5 = hyperbolePlot3Board.create('functiongraph', [function(x) { return -2 * Math.sqrt(x * x - 9) / 3.0; }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var line3 = hyperbolePlot3Board.create('line', [[3, -2], [3, 2]], { straightFirst: false, straightLast: false, strokeColor: '#ff0000', strokeWidth: 2.5 });
	var line4 = hyperbolePlot3Board.create('line', [[-3, -2], [-3, 2]], { straightFirst: false, straightLast: false, strokeColor: '#ff0000', strokeWidth: 2.5 });
	var line5 = hyperbolePlot3Board.create('line', [[-3, 2], [3, 2]], { straightFirst: false, straightLast: false, strokeColor: '#007800', strokeWidth: 2.5 });
	var line6 = hyperbolePlot3Board.create('line', [[-3, -2], [3, -2]], { straightFirst: false, straightLast: false, strokeColor: '#007800', strokeWidth: 2.5 });
	var line7 = hyperbolePlot3Board.create('functiongraph', [function(x) { return 2 * x / 3.0; }], { strokeWidth: 2, strokeColor: '#000', dash: 3 });
	var line8 = hyperbolePlot3Board.create('functiongraph', [function(x) { return -2 * x / 3.0; }], { strokeWidth: 2, strokeColor: '#000', dash: 3 });
	var label9 = hyperbolePlot3Board.create('text', [-0.55, 2.45, '$$b$$'], { fontSize: 20, color: '#007800' });
	var label10 = hyperbolePlot3Board.create('text', [-1.1, -2.45, '$$-b$$'], { fontSize: 20, color: '#007800' });
	var label11 = hyperbolePlot3Board.create('text', [3.35, -0.3, '$$a$$'], { fontSize: 20, color: '#ff0000' });
	var label12 = hyperbolePlot3Board.create('text', [-4.35, -0.3, '$$-a$$'], { fontSize: 20, color: '#ff0000' });
	var label13 = hyperbolePlot3Board.create('text', [7.45, -0.35, '$$x$$'], { fontSize: 21, color: '#000' });
	var label14 = hyperbolePlot3Board.create('text', [0.2, 4.75, '$$y$$'], { fontSize: 21, color: '#000' });

	var hyperbolePlot4Board  = JXG.JSXGraph.initBoard('hyperbolePlot4', {
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-8, 10, 4, -2], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var hyperbolePlot6 = hyperbolePlot4Board.create('functiongraph', [function(x) { return 4 + 2 / (x + 2); }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var hyperbolePlot7 = hyperbolePlot4Board.create('functiongraph', [function(x) { return 4 - 2 / (x + 2); }], { strokeWidth: 3, strokeColor: '#007800' });
	var hyperbolePlot8 = hyperbolePlot4Board.create('functiongraph', [function(x) { return 4 + 4 / (x + 2); }], { strokeWidth: 3, strokeColor: '#ff0000' });
	var label15 = hyperbolePlot4Board.create('text', [-3.8, 3.5, '$$s=2$$'], { fontSize: 21, color: '#1e28ff' });
	var label16 = hyperbolePlot4Board.create('text', [1.9, 2.7, '$$s=-2$$'], { fontSize: 21, color: '#007800' });
	var label17 = hyperbolePlot4Board.create('text', [2.33, 5.5, '$$s=4$$'], { fontSize: 21, color: '#ff0000' });
	var label18 = hyperbolePlot4Board.create('text', [3.6, -0.4, '$$x$$'], { fontSize: 21, color: '#000' });
	var label19 = hyperbolePlot4Board.create('text', [0.15, 9.7, '$$y$$'], { fontSize: 21, color: '#000' });

	$(window).resize(function() { 
		hyperbolePlot1Board.resizeContainer($('#hyperbolePlot1').width(), $('#hyperbolePlot1').height(), true, true);
		hyperbolePlot1Board.setBoundingBox([-5, 5, 5, -5], false);
		hyperbolePlot2Board.resizeContainer($('#hyperbolePlot2').width(), $('#hyperbolePlot2').height(), true, true);
		hyperbolePlot2Board.setBoundingBox([-8, 9, 4, -3], false);
		hyperbolePlot3Board.resizeContainer($('#hyperbolePlot3').width(), $('#hyperbolePlot3').height(), true, true);
		hyperbolePlot3Board.setBoundingBox([-8, 5, 8, -5], false);
		hyperbolePlot4Board.resizeContainer($('#hyperbolePlot4').width(), $('#hyperbolePlot4').height(), true, true);
		hyperbolePlot4Board.setBoundingBox([-8, 10, 4, -2], false);
	});
}

//---------------------------power---------------------------//

else if (document.title == "Степенная функция")
{
	var powerPlot1Board  = JXG.JSXGraph.initBoard('powerPlot1', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-3, 6, 3, -1], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var powerPlot1 = powerPlot1Board.create('functiongraph', [function(x) { return JXG.Math.pow(x, 2); }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var powerPlot2 = powerPlot1Board.create('functiongraph', [function(x) { return JXG.Math.pow(x, 4); }], { strokeWidth: 3, strokeColor: '#ff0000' });
	var label1 = powerPlot1Board.create('text', [2.23, 4.45, '$$n=2$$'], { fontSize: 20, color: '#1e28ff' });
	var label2 = powerPlot1Board.create('text', [0.55, 4.45, '$$n=4$$'], { fontSize: 20, color: '#ff0000' });
	var label3 = powerPlot1Board.create('text', [2.77, -0.25, '$$x$$'], { fontSize: 21, color: '#000' });
	var label4 = powerPlot1Board.create('text', [-0.25, 5.83, '$$y$$'], { fontSize: 21, color: '#000' });

	var powerPlot2Board  = JXG.JSXGraph.initBoard('powerPlot2', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-2.5, 3, 2.5, -3], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var powerPlot3 = powerPlot2Board.create('functiongraph', [function(x) { return JXG.Math.pow(x, 3); }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var powerPlot4 = powerPlot2Board.create('functiongraph', [function(x) { return JXG.Math.pow(x, 5); }], { strokeWidth: 3, strokeColor: '#ff0000' });
	var label5 = powerPlot2Board.create('text', [1.5, 2.5, '$$n=3$$'], { fontSize: 20, color: '#1e28ff' });
	var label6 = powerPlot2Board.create('text', [0.4, 2.5, '$$n=5$$'], { fontSize: 20, color: '#ff0000' });
	var label7 = powerPlot2Board.create('text', [2.33, -0.2, '$$x$$'], { fontSize: 21, color: '#000' });
	var label8 = powerPlot2Board.create('text', [-0.2, 2.83, '$$y$$'], { fontSize: 21, color: '#000' });

	var powerPlot3Board  = JXG.JSXGraph.initBoard('powerPlot3', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-5, 3, 5, -3], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var powerPlot5 = powerPlot3Board.create('functiongraph', [function(x) { return Math.pow(x, 0.5); }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var powerPlot6 = powerPlot3Board.create('functiongraph', [function(x) { if (x > 0) return Math.pow(x, 0.3333333); }], { strokeWidth: 3, strokeColor: '#ff0000' });
	var powerPlot7 = powerPlot3Board.create('functiongraph', [function(x) { if (x < 0) return -Math.pow(-x, 0.3333333); }], { strokeWidth: 3, strokeColor: '#ff0000' });
	var label9 = powerPlot3Board.create('text', [2.7, 2.3, '$$n=2$$'], { fontSize: 20, color: '#1e28ff' });
	var label10 = powerPlot3Board.create('text', [2.7, 0.8, '$$n=3$$'], { fontSize: 20, color: '#ff0000' });
	var label11 = powerPlot3Board.create('text', [4.65, -0.2, '$$x$$'], { fontSize: 21, color: '#000' });
	var label12 = powerPlot3Board.create('text', [-0.4, 2.83, '$$y$$'], { fontSize: 21, color: '#000' });

	var powerPlot4Board  = JXG.JSXGraph.initBoard('powerPlot4', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-5, 3, 5, -3], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var powerPlot8 = powerPlot4Board.create('functiongraph', [function(x) { return Math.pow(x, 3); }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var powerPlot9 = powerPlot4Board.create('functiongraph', [function(x) { if (x > 0) return Math.pow(x, 0.3333333); }], { strokeWidth: 3, strokeColor: '#ff0000' });	
	var powerPlot10 = powerPlot4Board.create('functiongraph', [function(x) { if (x < 0) return -Math.pow(-x, 0.3333333); }], { strokeWidth: 3, strokeColor: '#ff0000' });
	var line1 = powerPlot4Board.create('functiongraph', [function(x) { return x; }], { strokeWidth: 2, strokeColor: '#000', dash: 3 });
	var label13 = powerPlot4Board.create('text', [0.05, 2.6, '$$y=x$$^{$$3$$}'], { fontSize: 20, color: '#1e28ff' });
	var label14 = powerPlot4Board.create('text', [2.7, 0.8, '$$y=$$ ∛$$x$$'], { fontSize: 20, color: '#ff0000' });
	var label15 = powerPlot4Board.create('text', [2.7, 2.4, '$$y=x$$'], { fontSize: 20, color: '#000' });
	var label16 = powerPlot4Board.create('text', [4.65, -0.2, '$$x$$'], { fontSize: 21, color: '#000' });
	var label17 = powerPlot4Board.create('text', [-0.4, 2.83, '$$y$$'], { fontSize: 21, color: '#000' });

	$(window).resize(function() { 
		powerPlot1Board.resizeContainer($('#powerPlot1').width(), $('#powerPlot1').height(), true, true);
		powerPlot1Board.setBoundingBox([-3, 6, 3, -1], false);
		powerPlot2Board.resizeContainer($('#powerPlot2').width(), $('#powerPlot2').height(), true, true);
		powerPlot2Board.setBoundingBox([-2.5, 3, 2.5, -3], false);
		powerPlot3Board.resizeContainer($('#powerPlot3').width(), $('#powerPlot3').height(), true, true);
		powerPlot3Board.setBoundingBox([-5, 3, 5, -3], false);
		powerPlot4Board.resizeContainer($('#powerPlot4').width(), $('#powerPlot4').height(), true, true);
		powerPlot4Board.setBoundingBox([-5, 3, 5, -3], false);
	});
}

//---------------------------exponential---------------------------//

else if (document.title == "Показательная и логарифмическая функции")
{
	var exponentialPlot1Board  = JXG.JSXGraph.initBoard('exponentialPlot1', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-3, 6, 3, -1], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var exponentialPlot1 = exponentialPlot1Board.create('functiongraph', [function(x) { return JXG.Math.pow(2, x); }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var exponentialPlot2 = exponentialPlot1Board.create('functiongraph', [function(x) { return JXG.Math.pow(0.5, x); }], { strokeWidth: 3, strokeColor: '#ff0000' });
	var point1 = exponentialPlot1Board.create('point', [0, 1], { name: '', size: 3, color: '#000' });
	var label1 = exponentialPlot1Board.create('text', [2.1, 3.7, '$$a>1$$'], { fontSize: 20, color: '#1e28ff' });
	var label2 = exponentialPlot1Board.create('text', [2.1, 0.7, '$$a<1$$'], { fontSize: 20, color: '#ff0000' });
	var label3 = exponentialPlot1Board.create('text', [0.05, 1.4, '$$1$$'], { fontSize: 20, color: '#000' });
	var label4 = exponentialPlot1Board.create('text', [2.8, -0.25, '$$x$$'], { fontSize: 21, color: '#000' });
	var label5 = exponentialPlot1Board.create('text', [-0.25, 5.83, '$$y$$'], { fontSize: 21, color: '#000' });

	var exponentialPlot2Board  = JXG.JSXGraph.initBoard('exponentialPlot2', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-1, 3, 5, -3], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var exponentialPlot3 = exponentialPlot2Board.create('functiongraph', [function(x) { if (x > 0.1) return Math.log2(x); }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var exponentialPlot4 = exponentialPlot2Board.create('functiongraph', [function(x) { if (x > 0.1) return -Math.log2(x); }], { strokeWidth: 3, strokeColor: '#ff0000' });
	var point2 = exponentialPlot2Board.create('point', [1, 0], { name: '', size: 3, color: '#000' });
	var label6 = exponentialPlot2Board.create('text', [0.92, -0.4, '$$1$$'], { fontSize: 20, color: '#000' });
	var label7 = exponentialPlot2Board.create('text', [0.35, -2.5, '$$a>1$$'], { fontSize: 20, color: '#1e28ff' });
	var label8 = exponentialPlot2Board.create('text', [0.35, 2.5, '$$0<$$ $$a<1$$'], { fontSize: 20, color: '#ff0000' });
	var label9 = exponentialPlot2Board.create('text', [4.8, -0.25, '$$x$$'], { fontSize: 21, color: '#000' });
	var label10 = exponentialPlot2Board.create('text', [-0.25, 2.83, '$$y$$'], { fontSize: 21, color: '#000' });

	var exponentialPlot3Board  = JXG.JSXGraph.initBoard('exponentialPlot3', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-4.3, 4.3, 4.3, -4.3], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var exponentialPlot5 = exponentialPlot3Board.create('functiongraph', [function(x) { return JXG.Math.pow(2, x); }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var exponentialPlot6 = exponentialPlot3Board.create('functiongraph', [function(x) { if (x > 0.01) return Math.log2(x); }], { strokeWidth: 3, strokeColor: '#ff0000' });
	var line1 = exponentialPlot3Board.create('functiongraph', [function(x) { return x; }], { strokeWidth: 2, strokeColor: '#000', dash: 3 });
	var point3 = exponentialPlot3Board.create('point', [0, 1], { name: '', size: 3, color: '#000' });
	var point4 = exponentialPlot3Board.create('point', [1, 0], { name: '', size: 3, color: '#000' });
	var label11 = exponentialPlot3Board.create('text', [0.4, 3.6, '$$y=a$$^{$$x$$}'], { fontSize: 20, color: '#1e28ff' });
	var label12 = exponentialPlot3Board.create('text', [2.2, 0.7, '$$y=log$$_{$$a$$}$$x$$'], { fontSize: 20, color: '#ff0000' });
	var label13 = exponentialPlot3Board.create('text', [3.2, 2.8, '$$y=x$$'], { fontSize: 20, color: '#000' });
	var label14 = exponentialPlot3Board.create('text', [0.9, -0.5, '$$1$$'], { fontSize: 20, color: '#000' });
	var label15 = exponentialPlot3Board.create('text', [-0.3, 1.4, '$$1$$'], { fontSize: 20, color: '#000' });
	var label16 = exponentialPlot3Board.create('text', [4.02, -0.3, '$$x$$'], { fontSize: 21, color: '#000' });
	var label17 = exponentialPlot3Board.create('text', [-0.34, 4.1, '$$y$$'], { fontSize: 21, color: '#000' });

	$(window).resize(function() { 
		exponentialPlot1Board.resizeContainer($('#exponentialPlot1').width(), $('#exponentialPlot1').height(), true, true);
		exponentialPlot1Board.setBoundingBox([-3, 6, 3, -1], false);
		exponentialPlot2Board.resizeContainer($('#exponentialPlot2').width(), $('#exponentialPlot2').height(), true, true);
		exponentialPlot2Board.setBoundingBox([-1, 3, 5, -3], false);
		exponentialPlot3Board.resizeContainer($('#exponentialPlot3').width(), $('#exponentialPlot3').height(), true, true);
		exponentialPlot3Board.setBoundingBox([-4.3, 4.3, 4.3, -4.3], false);
	});
}

//---------------------------trigonometric-1---------------------------//

else if (document.title == "Тригoнометрические функции sin(x), cos(x), arcsin(x), arccos(x)")
{
	var trigonometricPlot1Board  = JXG.JSXGraph.initBoard('trigonometric1Plot1', {		
		defaultAxes: { y: { ticks: { visible: false }}, x : { ticks: { visible: false }} },
		boundingbox: [-Math.PI, 1.9, Math.PI, -1.9], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var trigonometricPlot1 = trigonometricPlot1Board.create('functiongraph',[function(x){return Math.sin(x);}, -Math.PI, -Math.PI / 2], { strokeWidth: 3, strokeColor: '#1e28ff'});
	var trigonometricPlot2 = trigonometricPlot1Board.create('functiongraph',[function(x){return Math.sin(x);}, Math.PI / 2, Math.PI], { strokeWidth: 3, strokeColor: '#1e28ff'});
	var trigonometricPlot3 = trigonometricPlot1Board.create('functiongraph',[function(x){return Math.sin(x);}, -Math.PI / 2, Math.PI / 2], { strokeWidth: 3, strokeColor: '#1e28ff', dash: 3});
	var line1 = trigonometricPlot1Board.create('line', [[-0.07, 1], [0.07, 1]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var line2 = trigonometricPlot1Board.create('line', [[-0.07, -1], [0.07, -1]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var line3 = trigonometricPlot1Board.create('line', [[-1.570796, -0.06], [-1.570796, 0.06]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var line4 = trigonometricPlot1Board.create('line', [[1.570796, -0.06], [1.570796, 0.06]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var label1 = trigonometricPlot1Board.create('text',[0.15, 1, '$$1$$'], { fontSize: 19, color: '#000'});
	var label2 = trigonometricPlot1Board.create('text',[0.15, -0.99, '$$-1$$'], { fontSize: 19, color: '#000'});
	var label3 = trigonometricPlot1Board.create('text',[1.35, -0.25, '$$π/2$$'], { fontSize: 19, color: '#000'});
	var label4 = trigonometricPlot1Board.create('text',[-2, -0.25, '$$-π/2$$'], { fontSize: 19, color: '#000'});

	var trigonometricPlot2Board  = JXG.JSXGraph.initBoard('trigonometric1Plot2', {		
		defaultAxes: { y: { ticks: { visible: false }}, x : { ticks: { visible: false }} },
		boundingbox: [-Math.PI, 1.9, Math.PI, -1.9], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var trigonometricPlot4 = trigonometricPlot2Board.create('functiongraph',[function(x){return Math.asin(x);}], { strokeWidth: 3, strokeColor: '#ff0000'});
	var trigonometricPlot5 = trigonometricPlot2Board.create('functiongraph',[function(x){return Math.sin(x);}, -Math.PI / 2, Math.PI / 2], { strokeWidth: 3, strokeColor: '#1e28ff', dash: 3});
	var line5 = trigonometricPlot2Board.create('line', [[1, -0.06], [1, 0.06]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var line6 = trigonometricPlot2Board.create('line', [[-1, -0.06], [-1, 0.06]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var line7 = trigonometricPlot2Board.create('line', [[-0.07, 1.57], [0.07, 1.57]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var line8 = trigonometricPlot2Board.create('line', [[-0.07, -1.58], [0.07, -1.58]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var line9 = trigonometricPlot2Board.create('line', [[-0.07, 1], [0.07, 1]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var line10 = trigonometricPlot2Board.create('line', [[-0.07, -1], [0.07, -1]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var line11 = trigonometricPlot2Board.create('line', [[Math.PI / 2, -0.06], [Math.PI / 2, 0.06]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var line12 = trigonometricPlot2Board.create('line', [[-Math.PI / 2, -0.06], [-Math.PI / 2, 0.06]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var label5 = trigonometricPlot2Board.create('text',[1.75, 1, '$$sin(x)$$'], { fontSize: 19, color: '#1e28ff'});
	var label6 = trigonometricPlot2Board.create('text',[0.93, -0.25, '$$1$$'], { fontSize: 19, color: '#000'});
	var label7 = trigonometricPlot2Board.create('text',[-1.2, -0.25, '$$-1$$'], { fontSize: 19, color: '#000'});
	var label8 = trigonometricPlot2Board.create('text',[0.2, 1.570796, '$$π/2$$'], { fontSize: 19, color: '#000'});
	var label9 = trigonometricPlot2Board.create('text',[0.2, -1.570796, '$$-π/2$$'], { fontSize: 19, color: '#000'});
	var label10 = trigonometricPlot2Board.create('text',[0.2, 1, '$$1$$'], { fontSize: 19, color: '#000'});
	var label11 = trigonometricPlot2Board.create('text',[0.2, -0.99, '$$-1$$'], { fontSize: 19, color: '#000'});
	var label12 = trigonometricPlot2Board.create('text',[1.35, -0.25, '$$π/2$$'], { fontSize: 19, color: '#000'});
	var label13 = trigonometricPlot2Board.create('text',[-2, -0.25, '$$-π/2$$'], { fontSize: 19, color: '#000'});

	var trigonometricPlot3Board  = JXG.JSXGraph.initBoard('trigonometric1Plot3', {		
		defaultAxes: { y: { ticks: { visible: false }}, x : { ticks: { visible: false }} },
		boundingbox: [-1.3, 1.3, 1.3, -1.3], registerEvents: false, showNavigation: false, keepaspectratio: true, showCopyright: false, axis: true, grid: true });
	var trigonometricPlot6 = trigonometricPlot3Board.create('circle',[[0, 0],[0, 1]], {strokeColor:'#000',strokeWidth: 2});
	var line13 = trigonometricPlot3Board.create('line', [[0, 0], [0.4, 0]], { straightFirst: false, straightLast: false, strokeColor:'#007800', strokeWidth:3});
	var line14 = trigonometricPlot3Board.create('line', [[0.4, 0], [0.4, 0.9165151]], { straightFirst: false, straightLast: false, strokeColor:'#1e28ff', strokeWidth:3});
	var line15 = trigonometricPlot3Board.create('line', [[0, 0], [0.4, 0.9165151]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth:3});
	var point1 = trigonometricPlot3Board.create('point', [1, 0], { name: '', size: 3, color: '#000'});
	var point2 = trigonometricPlot3Board.create('point', [0.4, 0.9165151], { name: '', size: 3, color: '#000'});
	var label14 = trigonometricPlot3Board.create('text',[0.43, 0.43, '$$sin(x)$$'], { fontSize: 18.5, color: '#1e28ff'});
	var label15 = trigonometricPlot3Board.create('text',[0.02, -0.12, '$$cos(x)$$'], { fontSize: 18.5, color: '#007800'});
	var label16 = trigonometricPlot3Board.create('text',[1.05, -0.12, '$$1$$'], { fontSize: 20, color: '#ff0000'});

	var trigonometricPlot4Board  = JXG.JSXGraph.initBoard('trigonometric1Plot4', {		
		defaultAxes: { y: { ticks: { visible: false }}, x : { ticks: { visible: false }} },
		boundingbox: [-Math.PI / 2, 1.9, Math.PI * 1.5, -1.9], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var trigonometricPlot7 = trigonometricPlot4Board.create('functiongraph',[function(x){return Math.cos(x);}, -Math.PI / 2, 0], { strokeWidth: 3, strokeColor: '#007800'});
	var trigonometricPlot8 = trigonometricPlot4Board.create('functiongraph',[function(x){return Math.cos(x);}, Math.PI,  Math.PI * 1.5], { strokeWidth: 3, strokeColor: '#007800'});
	var trigonometricPlot9 = trigonometricPlot4Board.create('functiongraph',[function(x){return Math.cos(x);}, 0, Math.PI], { strokeWidth: 3, strokeColor: '#007800', dash: 3});
	var line16 = trigonometricPlot4Board.create('line', [[-0.07, 1], [0.07, 1]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var line17 = trigonometricPlot4Board.create('line', [[-0.07, -1], [0.07, -1]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var line18 = trigonometricPlot4Board.create('line', [[Math.PI, -0.06], [Math.PI, 0.06]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var label17 = trigonometricPlot4Board.create('text',[0.1, 1.18, '$$1$$'], { fontSize: 19, color: '#000'});
	var label18 = trigonometricPlot4Board.create('text',[0.15, -0.99, '$$-1$$'], { fontSize: 19, color: '#000'});
	var label19 = trigonometricPlot4Board.create('text',[3.05, -0.2, '$$π$$'], { fontSize: 19, color: '#000'});
	var label20 = trigonometricPlot4Board.create('text',[-0.25, -0.15, '$$0$$'], { fontSize: 19, color: '#000'});

	var trigonometricPlot5Board  = JXG.JSXGraph.initBoard('trigonometric1Plot5', {		
		defaultAxes: { y: { ticks: { visible: false }}, x : { ticks: { visible: false }} },
		boundingbox: [-2, 3.5, 4.2, -1.3], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var trigonometricPlot4 = trigonometricPlot5Board.create('functiongraph',[function(x){return Math.acos(x);}], { strokeWidth: 3, strokeColor: '#ff0000'});
	var trigonometricPlot5 = trigonometricPlot5Board.create('functiongraph',[function(x){return Math.cos(x);}, 0, Math.PI], { strokeWidth: 3, strokeColor: '#007800', dash: 3});
	var line19 = trigonometricPlot5Board.create('line', [[1, -0.08], [1, 0.08]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var line20 = trigonometricPlot5Board.create('line', [[-1, -0.08], [-1, 0.08]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var line21 = trigonometricPlot5Board.create('line', [[-0.1, 1], [0.1, 1]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var line22 = trigonometricPlot5Board.create('line', [[-0.1, -1], [0.1, -1]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var line23 = trigonometricPlot5Board.create('line', [[-0.07, Math.PI], [0.07, Math.PI]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var line24 = trigonometricPlot5Board.create('line', [[Math.PI, -0.08], [Math.PI, 0.08]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2});
	var label21 = trigonometricPlot5Board.create('text',[3.35, -1, '$$cos(x)$$'], { fontSize: 19, color: '#007800'});
	var label22 = trigonometricPlot5Board.create('text',[0.93, -0.25, '$$1$$'], { fontSize: 19, color: '#000'});
	var label23 = trigonometricPlot5Board.create('text',[-1.2, -0.25, '$$-1$$'], { fontSize: 19, color: '#000'});
	var label24 = trigonometricPlot5Board.create('text',[-0.4, 1, '$$1$$'], { fontSize: 19, color: '#000'});
	var label25 = trigonometricPlot5Board.create('text',[-0.6, -0.99, '$$-1$$'], { fontSize: 19, color: '#000'});
	var label26 = trigonometricPlot5Board.create('text',[0.2, Math.PI, '$$π$$'], { fontSize: 19, color: '#000'});
	var label27 = trigonometricPlot5Board.create('text',[3.05, -0.2, '$$π$$'], { fontSize: 19, color: '#000'});
	var label28 = trigonometricPlot5Board.create('text',[-0.25, -0.25, '$$0$$'], { fontSize: 19, color: '#000'});

	function CircleContainerSize()
	{
		var size = 0;
		var _width = $(window).width();
		if (_width >= 576 && _width <= 767)
			size = 394;
		else if (_width >= 768 && _width <= 991) 
			size = 453;
		else if (_width >= 992 && _width <= 1199) 
			size = 467;
		else if (_width <= 575 || _width >= 1200)
			size = $('#trigonometric1Plot1').height() + 2;
		$('#trigonometric1Plot3').css("left", ($('.trigonometric-column').width() - size) / 2.0 + "px");
		$('#trigonometric1Plot3').css("height", size + "px");
		$('#trigonometric1Plot3').css("width", size + "px");
		trigonometricPlot3Board.resizeContainer(size, size, true, true);
		trigonometricPlot3Board.setBoundingBox([-1.3, 1.3, 1.3, -1.3], false);
	}
	CircleContainerSize();
	
	$(window).resize(function() { 
		trigonometricPlot1Board.resizeContainer($('#trigonometric1Plot1').width(), $('#trigonometric1Plot1').height(), true, true);
		trigonometricPlot1Board.setBoundingBox([-Math.PI, 1.9, Math.PI, -1.9], false);
		trigonometricPlot2Board.resizeContainer($('#trigonometric1Plot2').width(), $('#trigonometric1Plot2').height(), true, true);
		trigonometricPlot2Board.setBoundingBox([-Math.PI, 1.9, Math.PI, -1.9], false);
		trigonometricPlot4Board.resizeContainer($('#trigonometric1Plot4').width(), $('#trigonometric1Plot4').height(), true, true);
		trigonometricPlot4Board.setBoundingBox([-Math.PI / 2, 1.9, Math.PI * 1.5, -1.9], false);
		trigonometricPlot5Board.resizeContainer($('#trigonometric1Plot5').width(), $('#trigonometric1Plot5').height(), true, true);
		trigonometricPlot5Board.setBoundingBox([-2, 3.5, 4.2, -1.3], false);
		CircleContainerSize();
	});
}

//---------------------------trigonometric-2---------------------------//

else if (document.title == "Тригонометрические функции tg(x), ctg(x), arctg(x), arcctg(x)")
{
	var trigonometricPlot1Board  = JXG.JSXGraph.initBoard('trigonometric2Plot1', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-Math.PI * 1.5, 5, Math.PI * 1.5, -5], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var trigonometricPlot1 = trigonometricPlot1Board.create('functiongraph', [function(x) { return Math.tan(x); }, -Math.PI * 1.5, -Math.PI / 2], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var trigonometricPlot2 = trigonometricPlot1Board.create('functiongraph', [function(x) { return Math.tan(x); }, -Math.PI / 2, Math.PI / 2], { strokeWidth: 3, strokeColor: '#1e28ff', dash: 3 });
	var trigonometricPlot3 = trigonometricPlot1Board.create('functiongraph', [function(x) { return Math.tan(x); }, Math.PI / 2, Math.PI * 1.5], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var line1 = trigonometricPlot1Board.create('line', [[-1.570796, -5.1], [-1.570796, 5.1]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });
	var line2 = trigonometricPlot1Board.create('line', [[1.570796, -5.1], [1.570796, 5.1]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });
	var label1 = trigonometricPlot1Board.create('text', [-3.4, -4.5, '$$x=-π/2$$'], { fontSize: 17.5, color: '#000' });
	var label2 = trigonometricPlot1Board.create('text', [0.1, -4.5, '$$x=π/2$$'], { fontSize: 17.5, color: '#000' });

	var trigonometricPlot2Board  = JXG.JSXGraph.initBoard('trigonometric2Plot2', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-Math.PI * 1.5, 4, Math.PI * 1.5, -4], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var trigonometricPlot4 = trigonometricPlot2Board.create('functiongraph', [function(x) { return Math.atan(x); }], { strokeWidth: 3, strokeColor: '#ff0000' });
	var trigonometricPlot5 = trigonometricPlot2Board.create('functiongraph', [function(x) { return Math.tan(x); }, -Math.PI / 2, Math.PI / 2], { strokeWidth: 3, strokeColor: '#1e28ff', dash: 3 });
	var line3 = trigonometricPlot2Board.create('line', [[-4.8, Math.PI / 2], [4.8, Math.PI / 2]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });
	var line4 = trigonometricPlot2Board.create('line', [[-4.8, -Math.PI / 2], [4.8, -Math.PI / 2]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });
	var label3 = trigonometricPlot2Board.create('text', [2.8, 2.1, '$$y=π/2$$'], { fontSize: 19, color: '#000' });
	var label4 = trigonometricPlot2Board.create('text', [2.8, -2.1, '$$y=-π/2$$'], { fontSize: 19, color: '#000' });
	var label5 = trigonometricPlot2Board.create('text', [1.6, 3.5, '$$tg(x)$$'], { fontSize: 19, color: '#1e28ff' });

	var trigonometricPlot3Board  = JXG.JSXGraph.initBoard('trigonometric2Plot3', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-3.05, 2.3, 3.05, -2], registerEvents: false, showNavigation: false, keepaspectratio: true, showCopyright: false, axis: true, grid: true });
	var trigonometricPlot6 = trigonometricPlot3Board.create('circle', [[0, 0], [0, 1]], { strokeColor: '#000', strokeWidth: 2 });
	var line5 = trigonometricPlot3Board.create('line', [[-2.1, 1], [2.1, 1]], { straightFirst: false, straightLast: false, strokeColor: '#007800', strokeWidth: 3 });
	var line6 = trigonometricPlot3Board.create('line', [[1, -1.9], [1, 1.9]], { straightFirst: false, straightLast: false, strokeColor: '#1e28ff', strokeWidth: 3 });
	var line7 = trigonometricPlot3Board.create('line', [[0, 0], [-Math.sqrt(3), 1]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });
	var line8 = trigonometricPlot3Board.create('line', [[0, 0], [-1, 1]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });
	var line9 = trigonometricPlot3Board.create('line', [[0, 0], [-Math.sqrt(3) / 3, 1]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });
	var line10 = trigonometricPlot3Board.create('line', [[0, 0], [0, 1]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });
	var line11 = trigonometricPlot3Board.create('line', [[0, 0], [1, Math.sqrt(3)]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });
	var line12 = trigonometricPlot3Board.create('line', [[0, 0], [1, 1]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });
	var line13 = trigonometricPlot3Board.create('line', [[0, 0], [Math.sqrt(3), 1]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });
	var line14 = trigonometricPlot3Board.create('line', [[0, 0], [1, 0]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });
	var line15 = trigonometricPlot3Board.create('line', [[0, 0], [1, -Math.sqrt(3) / 3]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });
	var line16 = trigonometricPlot3Board.create('line', [[0, 0], [1, -1]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });
	var line17 = trigonometricPlot3Board.create('line', [[0, 0], [1, -Math.sqrt(3)]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });
	var point1 = trigonometricPlot3Board.create('point', [-Math.sqrt(3), 1], { name: '', size: 2, color: '#000' });
	var point2 = trigonometricPlot3Board.create('point', [-1, 1], { name: '', size: 2, color: '#000' });
	var point3 = trigonometricPlot3Board.create('point', [-Math.sqrt(3) / 3, 1], { name: '', size: 2, color: '#000' });
	var point4 = trigonometricPlot3Board.create('point', [0, 1], { name: '', size: 2, color: '#000' });
	var point5 = trigonometricPlot3Board.create('point', [Math.sqrt(3) / 3, 1], { name: '', size: 2, color: '#000' });
	var point6 = trigonometricPlot3Board.create('point', [1, 1], { name: '', size: 2, color: '#000' });
	var point7 = trigonometricPlot3Board.create('point', [Math.sqrt(3), 1], { name: '', size: 2, color: '#000' });
	var point8 = trigonometricPlot3Board.create('point', [1, Math.sqrt(3)], { name: '', size: 2, color: '#000' });
	var point9 = trigonometricPlot3Board.create('point', [1, Math.sqrt(3) / 3], { name: '', size: 2, color: '#000' });
	var point10 = trigonometricPlot3Board.create('point', [1, 0], { name: '', size: 2, color: '#000' });
	var point11 = trigonometricPlot3Board.create('point', [1, -Math.sqrt(3) / 3], { name: '', size: 2, color: '#000' });
	var point12 = trigonometricPlot3Board.create('point', [1, -1], { name: '', size: 2, color: '#000' });
	var point13 = trigonometricPlot3Board.create('point', [1, -Math.sqrt(3)], { name: '', size: 2, color: '#000' });
	var label6 = trigonometricPlot3Board.create('text', [0.8, 2.12, '$$tg(x)$$'], { fontSize: 19, color: '#1e28ff' });
	var label7 = trigonometricPlot3Board.create('text', [-2.1, 0.7, '$$ctg(x)$$'], { fontSize: 19, color: '#007800' });
	var label8 = trigonometricPlot3Board.create('text', [-2, 1.2, '$$-√3$$'], { fontSize: 17, color: '#007800' });
	var label9 = trigonometricPlot3Board.create('text', [-1.2, 1.2, '$$-1$$'], { fontSize: 17, color: '#007800' });
	var label10 = trigonometricPlot3Board.create('text', [0.05, 1.2, '$$0$$'], { fontSize: 17, color: '#007800' });
	var label11 = trigonometricPlot3Board.create('text', [1.1, 1.2, '$$1$$'], { fontSize: 17, color: '#007800' });
	var label12 = trigonometricPlot3Board.create('text', [1.6, 1.2, '$$√3$$'], { fontSize: 17, color: '#007800' });
	var label13 = trigonometricPlot3Board.create('text', [1.1, -1.73, '$$-√3$$'], { fontSize: 17, color: '#1e28ff' });
	var label14 = trigonometricPlot3Board.create('text', [1.1, -1, '$$-1$$'], { fontSize: 17, color: '#1e28ff' });
	var label15 = trigonometricPlot3Board.create('text', [1.1, 0.1, '$$0$$'], { fontSize: 17, color: '#1e28ff' });
	var label16 = trigonometricPlot3Board.create('text', [1.1, 1.73, '$$√3$$'], { fontSize: 17, color: '#1e28ff' });

	var trigonometricPlot4Board  = JXG.JSXGraph.initBoard('trigonometric2Plot4', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-Math.PI * 1.5, 5, Math.PI * 1.5, -5], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var trigonometricPlot8 = trigonometricPlot4Board.create('functiongraph', [function(x) { return 1 / Math.tan(x); }, -Math.PI * 2, -Math.PI], { strokeWidth: 3, strokeColor: '#007800' });
	var trigonometricPlot9 = trigonometricPlot4Board.create('functiongraph', [function(x) { return 1 / Math.tan(x); }, -Math.PI, 0], { strokeWidth: 3, strokeColor: '#007800' });
	var trigonometricPlot10 = trigonometricPlot4Board.create('functiongraph', [function(x) { return 1 / Math.tan(x); }, 0, Math.PI], { strokeWidth: 3, strokeColor: '#007800', dash: 3 });
	var trigonometricPlot11 = trigonometricPlot4Board.create('functiongraph', [function(x) { return 1 / Math.tan(x); }, Math.PI, Math.PI * 2], { strokeWidth: 3, strokeColor: '#007800' });
	var line18 = trigonometricPlot4Board.create('line', [[-Math.PI, -5.1], [-Math.PI, 5.1]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });
	var line19 = trigonometricPlot4Board.create('line', [[0, -5.1], [0, 5.1]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });
	var line20 = trigonometricPlot4Board.create('line', [[Math.PI, -5.1], [Math.PI, 5.1]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });
	var label17 = trigonometricPlot4Board.create('text', [-2.94, -4.5, '$$x=-π$$'], { fontSize: 18, color: '#000' });
	var label18 = trigonometricPlot4Board.create('text', [0.2, -4.5, '$$x=0$$'], { fontSize: 18, color: '#000' });
	var label19 = trigonometricPlot4Board.create('text', [3.34, -4.5, '$$x=π$$'], { fontSize: 18, color: '#000' });

	var trigonometricPlot5Board  = JXG.JSXGraph.initBoard('trigonometric2Plot5', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-Math.PI * 1.5, 4, Math.PI * 1.5, -4], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var trigonometricPlot12 = trigonometricPlot5Board.create('functiongraph', [function(x) { return Math.PI / 2 - Math.atan(x); }], { strokeWidth: 3, strokeColor: '#ff0000' });
	var trigonometricPlot13 = trigonometricPlot5Board.create('functiongraph', [function(x) { return 1 / Math.tan(x); }, 0, Math.PI], { strokeWidth: 3, strokeColor: '#007800', dash: 3 });
	var line21 = trigonometricPlot5Board.create('line', [[-4.8, Math.PI], [4.8, Math.PI]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });
	var line22 = trigonometricPlot5Board.create('line', [[-4.8, 0], [4.8, 0]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });
	var label20 = trigonometricPlot5Board.create('text', [3.4, 2.7, '$$y=π$$'], { fontSize: 19, color: '#000' });
	var label21 = trigonometricPlot5Board.create('text', [3.4, -0.44, '$$y=0$$'], { fontSize: 19, color: '#000' });
	var label22 = trigonometricPlot5Board.create('text', [1.6, -3.5, '$$ctg(x)$$'], { fontSize: 19, color: '#007800' });

	function CircleContainerSize()
	{
		var size = 0;
		var _width = $(window).width();
		if (_width >= 576 && _width <= 767)
			size = 394;
		else if (_width >= 768 && _width <= 991) 
			size = 453;
		else if (_width >= 992 && _width <= 1199) 
			size = 467;
		else
			size = $('#trigonometric2Plot1').height() + 2;
		$('#trigonometric2Plot3').css("left", ($('.trigonometric-column').width() - size) / 2.0 + "px");
		$('#trigonometric2Plot3').css("height", size + "px");
		$('#trigonometric2Plot3').css("width", size + "px");
		trigonometricPlot3Board.resizeContainer(size, size, true, true);
		trigonometricPlot3Board.setBoundingBox([-2.15, 2.3, 2.15, -2], false);
	}
	CircleContainerSize();

	$(window).resize(function() { 
		trigonometricPlot1Board.resizeContainer($('#trigonometric2Plot1').width(), $('#trigonometric2Plot1').height(), true, true);
		trigonometricPlot1Board.setBoundingBox([-Math.PI * 1.5, 5, Math.PI * 1.5, -5], false);
		trigonometricPlot2Board.resizeContainer($('#trigonometric2Plot2').width(), $('#trigonometric2Plot2').height(), true, true);
		trigonometricPlot2Board.setBoundingBox([-Math.PI * 1.5, 4, Math.PI * 1.5, -4], false);
		trigonometricPlot4Board.resizeContainer($('#trigonometric2Plot4').width(), $('#trigonometric2Plot4').height(), true, true);
		trigonometricPlot4Board.setBoundingBox([-Math.PI * 1.5, 5, Math.PI * 1.5, -5], false);
		trigonometricPlot5Board.resizeContainer($('#trigonometric2Plot5').width(), $('#trigonometric2Plot5').height(), true, true);
		trigonometricPlot5Board.setBoundingBox([-Math.PI * 1.5, 4, Math.PI * 1.5, -4], false);
		CircleContainerSize();
	});
}

//---------------------------hyperbolic---------------------------//

else if (document.title == "Гиперболические функции")
{
	var hyperbolicPlot1Board  = JXG.JSXGraph.initBoard('hyperbolicPlot1', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-3, 4, 3, -4], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var hyperbolicPlot1 = hyperbolicPlot1Board.create('functiongraph', [function(x) { return Math.sinh(x); }], { strokeWidth: 3, strokeColor: '#1e28ff' });

	var hyperbolicPlot2Board  = JXG.JSXGraph.initBoard('hyperbolicPlot2', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-5, 7, 5, -2], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var hyperbolicPlot2 = hyperbolicPlot2Board.create('functiongraph', [function(x) { return Math.cosh(x); }], { strokeWidth: 3, strokeColor: '#ff0000' });

	var hyperbolicPlot3Board  = JXG.JSXGraph.initBoard('hyperbolicPlot3', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-3, 4, 5, -2], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var hyperbolicPlot3 = hyperbolicPlot3Board.create('functiongraph', [function(x) { return Math.sqrt(x * x - 1); }], { strokeWidth: 3, strokeColor: '#000' });
	var hyperbolicPlot4 = hyperbolicPlot3Board.create('functiongraph', [function(x) { return -Math.sqrt(x * x - 1); }], { strokeWidth: 3, strokeColor: '#000' });
	var line1 = hyperbolicPlot3Board.create('line', [[0, 3], [Math.sqrt(10), 3]], { straightFirst: false, straightLast: false, strokeColor: '#ff0000', strokeWidth: 3 });
	var line2 = hyperbolicPlot3Board.create('line', [[Math.sqrt(10), 0], [Math.sqrt(10), 3]], { straightFirst: false, straightLast: false, strokeColor: '#1e28ff', strokeWidth: 3 });
	var point1 = hyperbolicPlot3Board.create('point', [1, 0], { name: '', size: 3, color: '#000' });
	var point2 = hyperbolicPlot3Board.create('point', [Math.sqrt(10), 3], { name: '', size: 3, color: '#000' });
	var label1 = hyperbolicPlot3Board.create('text', [3.3, 1.5, '$$sh(x)$$'], { fontSize: 19, color: '#1e28ff' });
	var label2 = hyperbolicPlot3Board.create('text', [1.25, 3.3, '$$ch(x)$$'], { fontSize: 19, color: '#ff0000' });
	var label3 = hyperbolicPlot3Board.create('text', [0.75, -0.25, '$$1$$'], { fontSize: 20, color: '#000' });

	var hyperbolicPlot4Board  = JXG.JSXGraph.initBoard('hyperbolicPlot4', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-3, 3, 3, -3], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var hyperbolicPlot5 = hyperbolicPlot4Board.create('functiongraph', [function(x) { return Math.tanh(x); }], { strokeWidth: 3, strokeColor: '#007800' });

	var hyperbolicPlot5Board  = JXG.JSXGraph.initBoard('hyperbolicPlot5', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-3, 6, 3, -6], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var hyperbolicPlot6 = hyperbolicPlot5Board.create('functiongraph', [function(x) { return 1 / Math.tanh(x); }], { strokeWidth: 3, strokeColor: '#000' });

	$(window).resize(function() { 
		hyperbolicPlot1Board.resizeContainer($('#hyperbolicPlot1').width(), $('#hyperbolicPlot1').height(), true, true);
		hyperbolicPlot1Board.setBoundingBox([-3, 4, 3, -4], false);
		hyperbolicPlot2Board.resizeContainer($('#hyperbolicPlot2').width(), $('#hyperbolicPlot2').height(), true, true);
		hyperbolicPlot2Board.setBoundingBox([-5, 7, 5, -2], false);
		hyperbolicPlot3Board.resizeContainer($('#hyperbolicPlot3').width(), $('#hyperbolicPlot3').height(), true, true);
		hyperbolicPlot3Board.setBoundingBox([-3, 4, 5, -2], false);
		hyperbolicPlot4Board.resizeContainer($('#hyperbolicPlot4').width(), $('#hyperbolicPlot4').height(), true, true);
		hyperbolicPlot4Board.setBoundingBox([-3, 3, 3, -3], false);
		hyperbolicPlot5Board.resizeContainer($('#hyperbolicPlot5').width(), $('#hyperbolicPlot5').height(), true, true);
		hyperbolicPlot5Board.setBoundingBox([-3, 6, 3, -6], false);
	});
}

//---------------------------other-functions---------------------------//

else if (document.title == "Некоторые другие функции")
{
	var otherPlot1Board  = JXG.JSXGraph.initBoard('otherPlot1', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-4.5, 4, 4.5, -1], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var otherPlot1 = otherPlot1Board.create('functiongraph', [function(x) { return Math.abs(x); }], { strokeWidth: 3, strokeColor: '#1e28ff' });

	var otherPlot2Board  = JXG.JSXGraph.initBoard('otherPlot2', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-3, 2.5, 3, -2.5], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var otherPlot2 = otherPlot2Board.create('functiongraph', [function(x) { return JXG.Math.sign(x); }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var point1 = otherPlot2Board.create('point', [0, 1], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });
	var point2 = otherPlot2Board.create('point', [0, -1], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });
	var label1 = otherPlot2Board.create('text', [-0.33, 1, '$$1$$'], { fontSize: 19, color: '#000' });
	var label2 = otherPlot2Board.create('text', [0.15, -0.99, '$$-1$$'], { fontSize: 19, color: '#000' });

	var otherPlot3Board  = JXG.JSXGraph.initBoard('otherPlot3', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-4.25, 3.9, 4.2, -4.9], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var otherPlot3 = otherPlot3Board.create('functiongraph', [function(x) { return Math.floor(x); }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var point3 = otherPlot3Board.create('point', [-3, -4], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });
	var point4 = otherPlot3Board.create('point', [-2, -3], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });
	var point5 = otherPlot3Board.create('point', [-1, -2], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });
	var point6 = otherPlot3Board.create('point', [0, -1], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });
	var point7 = otherPlot3Board.create('point', [1, 0], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });
	var point8 = otherPlot3Board.create('point', [2, 1], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });
	var point9 = otherPlot3Board.create('point', [3, 2], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });
	var point10 = otherPlot3Board.create('point', [4, 3], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });

	var otherPlot4Board  = JXG.JSXGraph.initBoard('otherPlot4', {		
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		boundingbox: [-5.1, 3, 5.1, -2], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var otherPlot4 = otherPlot4Board.create('functiongraph', [function(x) { if (x > -5 && x < 5) return x - Math.floor(x); }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var point11 = otherPlot4Board.create('point', [-4, 1], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });
	var point12 = otherPlot4Board.create('point', [-3, 1], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });
	var point13 = otherPlot4Board.create('point', [-2, 1], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });
	var point14 = otherPlot4Board.create('point', [-1, 1], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });
	var point15 = otherPlot4Board.create('point', [0, 1], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });
	var point16 = otherPlot4Board.create('point', [1, 1], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });
	var point17 = otherPlot4Board.create('point', [2, 1], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });
	var point18 = otherPlot4Board.create('point', [3, 1], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });
	var point19 = otherPlot4Board.create('point', [4, 1], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });
	var point20 = otherPlot4Board.create('point', [5, 1], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });

	$(window).resize(function() { 
		otherPlot1Board.resizeContainer($('#otherPlot1').width(), $('#otherPlot1').height(), true, true);
		otherPlot1Board.setBoundingBox([-4.5, 4, 4.5, -1], false);
		otherPlot2Board.resizeContainer($('#otherPlot2').width(), $('#otherPlot2').height(), true, true);
		otherPlot2Board.setBoundingBox([-3, 2.5, 3, -2.5], false);
		otherPlot3Board.resizeContainer($('#otherPlot3').width(), $('#otherPlot3').height(), true, true);
		otherPlot3Board.setBoundingBox([-4.25, 3.9, 4.2, -4.9], false);
		otherPlot4Board.resizeContainer($('#otherPlot4').width(), $('#otherPlot4').height(), true, true);
		otherPlot4Board.setBoundingBox([-5.1, 3, 5.1, -2], false);
	});
}

//---------------------------parametric-example---------------------------//

else if (document.title == "Пример") 
{ 
	var slider = document.getElementById('tSlider'); 
	var smallBoundingBox = [-0.35, 0.85, 0.35, 0.15];

	var bigBoard = JXG.JSXGraph.initBoard('bigParametricPlot', { 
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-2, 2, 2, -2], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var label1 = bigBoard.create('text', [1.9, -0.15, '$$x$$'], { fontSize: 22, color: '#000' });
	var label2 = bigBoard.create('text', [0.04, 1.89, '$$y$$'], { fontSize: 22, color: '#000' });
	var graph1 = bigBoard.create('curve', [[0], [0]], { strokeColor: '#1e28ff', strokeWidth: 3 }); 
	var graph2 = bigBoard.create('curve', [[0], [0]], { strokeColor: '#007800', strokeWidth: 3 }); 
	var graph3 = bigBoard.create('curve', [[0], [0]], { strokeColor: '#6535bf', strokeWidth: 3 }); 
	var graph4 = bigBoard.create('curve', [[0], [0]], { strokeColor: '#ff0000', strokeWidth: 3 }); 

	var smallBoard = JXG.JSXGraph.initBoard('smallParametricPlot', { 
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-0.7, 1.7, 0.7, 0.3], registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true }); 
	var subgraph1 = smallBoard.create('curve', [[0], [0]], { strokeColor: '#1e28ff', strokeWidth: 3 }); 
	var subgraph2 = smallBoard.create('curve', [[0], [0]], { strokeColor: '#007800', strokeWidth: 3 }); 
	var subgraph3 = smallBoard.create('curve', [[0], [0]], { strokeColor: '#6535bf', strokeWidth: 3 }); 
	var subgraph4 = smallBoard.create('curve', [[0], [0]], { strokeColor: '#ff0000', strokeWidth: 3 }); 
	var x1 = [], y1 = []; 
	var x2 = [], y2 = []; 
	var x3 = [], y3 = []; 
	var x4 = [], y4 = []; 

	var specialPoint1 = bigBoard.create('point', [0, 1], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white', size: 3 }); 
	var specialPoint2 = bigBoard.create('point', [0, 0], { name: '', size: 3, color: '#000' }); 
	var specialPoint3 = bigBoard.create('point', [0.5291337, 0.6666667], { name: '', size: 3, color: '#000' }); 

	specialPoint1.setAttribute({ visible: false }); 
	specialPoint2.setAttribute({ visible: false }); 
	specialPoint3.setAttribute({ visible: false }); 

	var specialSubPoint1 = smallBoard.create('point', [0, 1], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white', size: 3 }); 
	var specialSubPoint2 = smallBoard.create('point', [0, 0], { name: '', size: 3, color: '#000' }); 
	var specialSubPoint3 = smallBoard.create('point', [0.5291337, 0.6666667], { name: '', size: 3, color: '#000' }); 

	specialSubPoint1.setAttribute({ visible: false }); 
	specialSubPoint2.setAttribute({ visible: false }); 
	specialSubPoint3.setAttribute({ visible: false }); 

	var asymptote = bigBoard.create('functiongraph', [function(x) { return -x + 0.3333333; }], { dash: 3, strokeWidth: 1, strokeColor: '#000' }); 
	var subAsymptote = smallBoard.create('functiongraph', [function(x) { return -x + 0.3333333; }], { dash: 3, strokeWidth: 1, strokeColor: '#000' }); 

	var tangent1 = smallBoard.create('line', [[-0.35, 1], [0, 1]], { straightFirst: false, straightLast: false, strokeColor: '#1e28ff', strokeWidth: 3, dash: 3 }); 
	var tangent2 = smallBoard.create('line', [[0, 0], [0.27, 0]], { straightFirst: false, straightLast: false, strokeColor: '#007800', strokeWidth: 3, dash: 3 }); 
	var tangent3 = smallBoard.create('line', [[0.5291337, 0.3666667], [0.5291337, 0.6666667]], { straightFirst: false, straightLast: false, strokeColor: '#6535bf', strokeWidth: 3, dash: 3 }); 
	var tangent4 = smallBoard.create('line', [[0.5291337, 0.6666667], [0.5291337, 0.9466667]], { straightFirst: false, straightLast: false, strokeColor: '#ff0000', strokeWidth: 3, dash: 3 }); 
	var tangent5 = smallBoard.create('line', [[0.35, 1], [0, 1]], { straightFirst: false, straightLast: false, strokeColor: '#ff0000', strokeWidth: 3, dash: 3 }); 

	tangent1.setAttribute({ visible: false }); 
	tangent2.setAttribute({ visible: false }); 
	tangent3.setAttribute({ visible: false }); 
	tangent4.setAttribute({ visible: false }); 
	tangent5.setAttribute({ visible: false }); 

	var label1 = smallBoard.create('text', [-0.09, 1.07, '(0, 1)'], { fontSize: 19 }); 
	var label2 = smallBoard.create('text', [-0.09, 0.07, '(0, 0)'], { fontSize: 19 }); 
	var label3 = smallBoard.create('text', [0.33, 0.668, '(0.53, 0.67)'], {fontSize: 19 });

	label1.setAttribute({ visible: false }); 
	label2.setAttribute({ visible: false }); 
	label3.setAttribute({ visible: false }); 

	var topLine = bigBoard.create('line', [[-0.35, 1.35], [0.35, 1.35]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 0.7 }); 
	var bottomLine = bigBoard.create('line', [[-0.35, 0.65], [0.35, 0.65]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 0.7 }); 
	var leftLine = bigBoard.create('line', [[-0.35, 0.65], [-0.35, 1.35]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 0.7 }); 
	var rightLine = bigBoard.create('line', [[0.35, 0.65], [0.35, 1.35]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 0.7 }); 

	topLine.setAttribute({ visible: false });
	bottomLine.setAttribute({ visible: false });
	leftLine.setAttribute({ visible: false });
	rightLine.setAttribute({ visible: false });

	for (var i = 0; i < 100; i++) 
	{ 
		var t = -2 - (100 - i) * 0.2; 
		x1.push(t * t / (1 + t * t * t)); 
		y1.push(t * t * t / (1 + t * t * t)); 

		t = -1 + i / 100.0; 
		x2.push(t * t / (1 + t * t * t)); 
		y2.push(t * t * t / (1 + t * t * t)); 

		t = 1.259921 * i / 100; 
		x3.push(t * t / (1 + t * t * t)); 
		y3.push(t * t * t / (1 + t * t * t)); 

		t = 1.259921 + i / 10.0; 
		x4.push(t * t / (1 + t * t * t)); 
		y4.push(t * t * t / (1 + t * t * t)); 
	} 

	for (var i = 0; i < 100; i++) 
	{ 
		t = -2 + i * 0.01; 
		x1.push(t * t / (1 + t * t * t)); 
		y1.push(t * t * t / (1 + t * t * t)); 
	} 

	x1[0] = 0; 
	y1[0] = 1; 

	x4[98] = 0.05; 
	y4[98] = 1; 

	x4[99] = 0; 
	y4[99] = 1; 

	subgraph1.updateDataArray = graph1.updateDataArray = function()
	{ 
		var value = slider.value; 

		if (value < 200) 
		{ 
			var dataX = [], dataY = []; 

			for (var i = 0; i < value; i++) 
			{ 
				dataX.push(x1[i]); 
				dataY.push(y1[i]); 
			} 

			this.dataX = dataX; 
			this.dataY = dataY; 
		} 
		else 
		{ 
			this.dataX = x1; 
			this.dataY = y1; 
		} 
	} 

	subgraph2.updateDataArray = graph2.updateDataArray = function()
	{ 
		var value = slider.value; 

		if (value >= 200 && value < 300) 
		{ 
			var dataX = [], dataY = []; 

			for (var i = 200; i < value; i++) 
			{ 
				dataX.push(x2[i - 200]); 
				dataY.push(y2[i - 200]); 
			} 

			this.dataX = dataX; 
			this.dataY = dataY; 
		} 
		else if (value >= 300) 
		{ 
			this.dataX = x2; 
			this.dataY = y2; 
		} 
		else 
		{ 
			this.dataX = []; 
			this.dataY = []; 
		} 
	} 

	subgraph3.updateDataArray = graph3.updateDataArray = function()
	{ 
		var value = slider.value; 

		if (value >= 300 && value < 400) 
		{ 
			var dataX = [], dataY = []; 

			for (var i = 300; i < value; i++) 
			{ 
				dataX.push(x3[i - 300]); 
				dataY.push(y3[i - 300]); 
			} 

			this.dataX = dataX; 
			this.dataY = dataY; 
		} 
		else if (value >= 400) 
		{ 
			this.dataX = x3; 
			this.dataY = y3; 
		} 
		else 
		{ 
			this.dataX = []; 
			this.dataY = []; 
		} 
	} 

	subgraph4.updateDataArray = graph4.updateDataArray = function()
	{ 
		var value = slider.value; 

		if (value >= 400 && value < 501) 
		{ 
			var dataX = [], dataY = []; 

			for (var i = 400; i < value; i++) 
			{ 
				dataX.push(x4[i - 400]); 
				dataY.push(y4[i - 400]); 
			} 

			this.dataX = dataX; 
			this.dataY = dataY; 
		} 
		else 
		{ 
			this.dataX = []; 
			this.dataY = []; 
		} 
	} 

	function draw() 
	{ 
		graph1.updateDataArray(); 
		graph2.updateDataArray(); 
		graph3.updateDataArray(); 
		graph4.updateDataArray(); 

		subgraph1.updateDataArray(); 
		subgraph2.updateDataArray(); 
		subgraph3.updateDataArray(); 
		subgraph4.updateDataArray(); 

		var value = slider.value; 

		if (value < 200) 
		{ 
			if (value > 0) 
			{ 
				tangent1.setAttribute({ visible: true }); 
				specialPoint1.setAttribute({ visible: true }); 
				specialSubPoint1.setAttribute({ visible: true }); 
				label1.setAttribute({ visible: true }); 

				topLine.setAttribute({ visible: true });
				bottomLine.setAttribute({ visible: true });
				leftLine.setAttribute({ visible: true });
				rightLine.setAttribute({ visible: true });

				if (value > 110 && value < 150) 
					label1.setAttribute({ visible: false }); 
				else 
					label1.setAttribute({ visible: true });
			} 
			else 
			{ 
				tangent1.setAttribute({ visible: false }); 
				specialPoint1.setAttribute({ visible: false }); 
				specialSubPoint1.setAttribute({ visible: false }); 
				label1.setAttribute({ visible: false }); 
				
				topLine.setAttribute({ visible: false });
				bottomLine.setAttribute({ visible: false });
				leftLine.setAttribute({ visible: false });
				rightLine.setAttribute({ visible: false });
			} 

			label2.setAttribute({ visible: false }); 
			label3.setAttribute({ visible: false }); 

			tangent2.setAttribute({ visible: false }); 
			tangent3.setAttribute({ visible: false }); 
			tangent4.setAttribute({ visible: false }); 
			tangent5.setAttribute({ visible: false }); 

			specialPoint2.setAttribute({ visible: false }); 
			specialPoint3.setAttribute({ visible: false }); 

			specialSubPoint2.setAttribute({ visible: false }); 
			specialSubPoint3.setAttribute({ visible: false }); 

			smallBoard.setBoundingBox([x1[value] - 0.7, y1[value] + 0.7, x1[value] + 0.7, y1[value] - 0.7]); 
			smallBoundingBox = [x1[value] - 0.35, y1[value] + 0.35, x1[value] + 0.35, y1[value] - 0.35]; 
		} 

		if (value >= 200 && value < 300) 
		{ 
			tangent1.setAttribute({ visible: true }); 

			if (value > 250) 
				tangent2.setAttribute({ visible: true, strokeColor: '#007800' }); 
			else 
				tangent2.setAttribute({ visible: false, strokeColor: '#007800' }); 

			label1.setAttribute({ visible: true }); 
			label2.setAttribute({ visible: false }); 
			label3.setAttribute({ visible: false }); 

			tangent3.setAttribute({ visible: false }); 
			tangent4.setAttribute({ visible: false }); 
			tangent5.setAttribute({ visible: false }); 

			specialPoint1.setAttribute({ visible: true }); 
			specialPoint2.setAttribute({ visible: false }); 
			specialPoint3.setAttribute({ visible: false }); 

			specialSubPoint1.setAttribute({ visible: true }); 
			specialSubPoint2.setAttribute({ visible: false }); 
			specialSubPoint3.setAttribute({ visible: false }); 

			topLine.setAttribute({ visible: true });
			bottomLine.setAttribute({ visible: true });
			leftLine.setAttribute({ visible: true });
			rightLine.setAttribute({ visible: true });

			smallBoard.setBoundingBox([x2[value - 200] - 0.7, y2[value - 200] + 0.7, x2[value - 200] + 0.7, y2[value - 200] - 0.7]); 
			smallBoundingBox = [x2[value - 200] - 0.35, y2[value - 200] + 0.35, x2[value - 200] + 0.35, y2[value - 200] - 0.35]; 
		} 

		if (value >= 300 && value < 400) 
		{ 
			tangent1.setAttribute({ visible: true }); 
			tangent2.setAttribute({ visible: true, strokeColor: '#6535bf' }); 

			if (value > 380) 
				tangent3.setAttribute({ visible: true }); 
			else 
				tangent3.setAttribute({ visible: false }); 

			label1.setAttribute({ visible: true }); 
			label2.setAttribute({ visible: true }); 
			label3.setAttribute({ visible: false }); 

			tangent4.setAttribute({ visible: false }); 
			tangent5.setAttribute({ visible: false }); 

			specialPoint1.setAttribute({ visible: true }); 
			specialPoint2.setAttribute({ visible: true }); 
			specialPoint3.setAttribute({ visible: false }); 

			specialSubPoint1.setAttribute({ visible: true }); 
			specialSubPoint2.setAttribute({ visible: true }); 
			specialSubPoint3.setAttribute({ visible: false }); 

			topLine.setAttribute({ visible: true });
			bottomLine.setAttribute({ visible: true });
			leftLine.setAttribute({ visible: true });
			rightLine.setAttribute({ visible: true });

			smallBoard.setBoundingBox([x3[value - 300] - 0.7, y3[value - 300] + 0.7, x3[value - 300] + 0.7, y3[value - 300] - 0.7]); 
			smallBoundingBox = [x3[value - 300] - 0.35, y3[value - 300] + 0.35, x3[value - 300] + 0.35, y3[value - 300] - 0.35]; 
		} 

		if (value >= 400 && value < 500) 
		{ 
			tangent1.setAttribute({ visible: true }); 
			tangent2.setAttribute({ visible: true, strokeColor: '#6535bf' }); 
			tangent3.setAttribute({ visible: true }); 
			tangent4.setAttribute({ visible: true }); 

			if (value >= 430) 
				tangent5.setAttribute({ visible: true }); 
			else 
				tangent5.setAttribute({ visible: false }); 

			label1.setAttribute({ visible: true }); 
			label2.setAttribute({ visible: true }); 
			label3.setAttribute({ visible: true }); 

			specialPoint1.setAttribute({ visible: true }); 
			specialPoint2.setAttribute({ visible: true }); 
			specialPoint3.setAttribute({ visible: true }); 

			specialSubPoint1.setAttribute({ visible: true }); 
			specialSubPoint2.setAttribute({ visible: true }); 
			specialSubPoint3.setAttribute({ visible: true }); 

			topLine.setAttribute({ visible: true });
			bottomLine.setAttribute({ visible: true });
			leftLine.setAttribute({ visible: true });
			rightLine.setAttribute({ visible: true });

			smallBoard.setBoundingBox([x4[value - 400] - 0.7, y4[value - 400] + 0.7, x4[value - 400] + 0.7, y4[value - 400] - 0.7]); 
			smallBoundingBox = [x4[value - 400] - 0.35, y4[value - 400] + 0.35, x4[value - 400] + 0.35, y4[value - 400] - 0.35]; 
		} 

		if (value == 500) 
		{ 
			tangent1.setAttribute({ visible: true }); 
			tangent2.setAttribute({ visible: true, strokeColor: '#6535bf' }); 
			tangent3.setAttribute({ visible: true }); 
			tangent4.setAttribute({ visible: true }); 
			tangent5.setAttribute({ visible: true }); 

			label1.setAttribute({ visible: true }); 
			label2.setAttribute({ visible: true }); 
			label3.setAttribute({ visible: true }); 

			specialPoint1.setAttribute({ visible: true }); 
			specialPoint2.setAttribute({ visible: true }); 
			specialPoint3.setAttribute({ visible: true }); 

			specialSubPoint1.setAttribute({ visible: true }); 
			specialSubPoint2.setAttribute({ visible: true });
			specialSubPoint3.setAttribute({ visible: true }); 

			topLine.setAttribute({ visible: true });
			bottomLine.setAttribute({ visible: true });
			leftLine.setAttribute({ visible: true });
			rightLine.setAttribute({ visible: true });

			smallBoard.setBoundingBox([-0.7, 1.7, 0.7, 0.3]); 
			smallBoundingBox = [-0.35, 1.35, 0.35, 0.65]; 
		}

		topLine.point1.moveTo([smallBoundingBox[0], smallBoundingBox[1]]);
		topLine.point2.moveTo([smallBoundingBox[2], smallBoundingBox[1]]);

		bottomLine.point1.moveTo([smallBoundingBox[0], smallBoundingBox[3]]);
		bottomLine.point2.moveTo([smallBoundingBox[2], smallBoundingBox[3]]);

		leftLine.point1.moveTo([smallBoundingBox[0], smallBoundingBox[3]]);
		leftLine.point2.moveTo([smallBoundingBox[0], smallBoundingBox[1]]);

		rightLine.point1.moveTo([smallBoundingBox[2], smallBoundingBox[3]]);
	  	rightLine.point2.moveTo([smallBoundingBox[2], smallBoundingBox[1]]);

		bigBoard.fullUpdate(); 
		smallBoard.fullUpdate(); 
	} 

	$(window).resize(function() { 
		bigBoard.resizeContainer($('#bigParametricPlot').width(), $('#bigParametricPlot').height(), true, true); 
		bigBoard.setBoundingBox([-2, 2, 2, -2], false); 

		smallBoard.resizeContainer($('#smallParametricPlot').width(), $('#smallParametricPlot').height(), true, true); 
		smallBoard.setBoundingBox(smallBoundingBox, false); 
	}); 
}

//---------------------------transform---------------------------//

else if (document.title == "Основные преобразования функций")
{
	//--------------shiftUDPlot--------------//
	var shiftUDSlider = document.getElementById('shiftUDSlider');
	var shiftUDValue = 0;
	var brdShiftUD = JXG.JSXGraph.initBoard('shiftUDPlot', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-2.8, 3, 2.8, -2], registerEvents: false, grid: true, showNavigation: false, showCopyright: false });
	brdShiftUD.suspendUpdate();
	var shiftUDBlue = brdShiftUD.create('functiongraph', [function(x) { return 0.5 * (x - 2) * (x + 1) * (x - 1); }], { strokeColor: '#1e28ff', strokeWidth: 3, dash: 3 });
	var shiftUDGreen = brdShiftUD.create('functiongraph', [function(x) { return 0.5 * (x - 2) * (x + 1) * (x - 1) + parseFloat(shiftUDValue); }], { strokeColor: '#1e28ff', strokeWidth: 3 });
	var line1 = brdShiftUD.create('line', [[-0.07, 1], [0.07, 1]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2.5 });
	var label1 = brdShiftUD.create('text', [0.05, 1.25, '$$1$$'], { fontSize: 19, color: '#000' });
	var txt1 = brdShiftUD.create('text', [2.65, -0.2, '$$x$$'], { fontSize: 20, color: '#000' });
	var txt2 = brdShiftUD.create('text', [0.07, 2.85, '$$y$$'], { fontSize: 20, color: '#000' });
	brdShiftUD.unsuspendUpdate();
	function showShiftUD()
	{
		shiftUDValue = shiftUDSlider.value;
		document.getElementById("shiftUDValue").innerHTML = parseFloat(shiftUDValue);
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'shiftUDValue']);
		if (shiftUDValue == 0)
			shiftUDGreen.setAttribute({ strokeColor: '#1e28ff' });
		else
			shiftUDGreen.setAttribute({ strokeColor: '#007800' });
		brdShiftUD.fullUpdate();
	}
	
	//--------------shiftLRPlot--------------//
	var shiftLRSlider = document.getElementById('shiftLRSlider');
	var shiftLRValue = 0;
	var brdShiftLR = JXG.JSXGraph.initBoard('shiftLRPlot', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-2.8, 3, 2.8, -2], registerEvents: false, grid: true, showNavigation: false, showCopyright: false });
	brdShiftLR.suspendUpdate();
	var shiftLRBlue = brdShiftLR.create('functiongraph', [function(x) { return 0.5 * (x - 2) * (x + 1) * (x - 1); }], { strokeColor: '#1e28ff', strokeWidth: 3, dash: 3 });
	var shiftLRGreen = brdShiftLR.create('functiongraph', [function(x) { return 0.5 * (x + parseFloat(shiftLRValue) - 2) * (x + parseFloat(shiftLRValue) + 1) * (x + parseFloat(shiftLRValue) - 1); }], { strokeColor: '#1e28ff', strokeWidth: 3 });
	var line1 = brdShiftLR.create('line', [[1, -0.1], [1, 0.1]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2.5 });
	var label1 = brdShiftLR.create('text', [0.97, -0.35, '$$1$$'], { fontSize: 19, color: '#000' });
	var txt1 = brdShiftLR.create('text', [2.65, -0.2, '$$x$$'], { fontSize: 20, color: '#000' });
	var txt2 = brdShiftLR.create('text', [0.07, 2.85, '$$y$$'], { fontSize: 20, color: '#000' });
	brdShiftLR.unsuspendUpdate();
	function showShiftLR()
	{
		shiftLRValue = shiftLRSlider.value;
		document.getElementById("shiftLRValue").innerHTML = parseFloat(shiftLRValue);
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'shiftLRValue']);
		if (shiftLRValue == 0)
			shiftLRGreen.setAttribute({ strokeColor: '#1e28ff' });
		else
			shiftLRGreen.setAttribute({ strokeColor: '#007800' });
		brdShiftLR.fullUpdate();
	}

	//--------------stretchUDPlot--------------//
	var stretchUDSlider = document.getElementById('stretchUDSlider');
	var stretchUDValue = 1;
	var brdStretchUD = JXG.JSXGraph.initBoard('stretchUDPlot', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-2*Math.PI, 3.05, 2*Math.PI, -3.05], registerEvents: false, grid: true, showNavigation: false, showCopyright: false });
	brdStretchUD.suspendUpdate();
	var stretchUDBlue = brdStretchUD.create('functiongraph', [function(x) { return Math.cos(x); }], { strokeColor: '#1e28ff', strokeWidth: 3, dash: 3 });
	var stretchUDGreen = brdStretchUD.create('functiongraph', [function(x) { return parseFloat(stretchUDValue) * Math.cos(x); }], { strokeColor: '#1e28ff', strokeWidth: 3 });
	var txt1 = brdStretchUD.create('text', [5.95, -0.3, '$$x$$'], { fontSize: 20, color: '#000' });
	var txt2 = brdStretchUD.create('text', [0.14, 2.85, '$$y$$'], { fontSize: 20, color: '#000' });
	brdStretchUD.unsuspendUpdate();
	function showStretchUD()
	{
		stretchUDValue = stretchUDSlider.value;
		document.getElementById("stretchUDValue").innerHTML = parseFloat(stretchUDValue);
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'stretchUDValue']);
		if (stretchUDValue == 1)
			stretchUDGreen.setAttribute({ strokeColor: '#1e28ff' });
		else
			stretchUDGreen.setAttribute({ strokeColor: '#007800' });
		brdStretchUD.fullUpdate();
	}

	//--------------stretchLRPlot--------------//
	var stretchLRSlider = document.getElementById('stretchLRSlider');
	var stretchLRValue = 1;
	var brdStretchLR = JXG.JSXGraph.initBoard('stretchLRPlot', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-2*Math.PI, 3.05, 2*Math.PI, -3.05], registerEvents: false, grid: true, showNavigation: false, showCopyright: false });
	brdStretchLR.suspendUpdate();
	var stretchLRBlue = brdStretchLR.create('functiongraph', [function(x) { return Math.cos(x); }], { strokeColor: '#1e28ff', strokeWidth: 3, dash: 3 });
	var stretchLRGreen = brdStretchLR.create('functiongraph', [function(x) { return Math.cos(parseFloat(stretchLRValue) * x); }], { strokeColor: '#1e28ff', strokeWidth: 3 });
	var txt1 = brdStretchLR.create('text', [5.95, -0.3, '$$x$$'], { fontSize: 20, color: '#000' });
	var txt2 = brdStretchLR.create('text', [0.14, 2.85, '$$y$$'], { fontSize: 20, color: '#000' });
	brdStretchLR.unsuspendUpdate();
	function showStretchLR()
	{
		stretchLRValue = stretchLRSlider.value;
		document.getElementById("stretchLRValue").innerHTML = parseFloat(stretchLRValue);
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'stretchLRValue']);
		if (stretchLRValue == 1)
			stretchLRGreen.setAttribute({ strokeColor: '#1e28ff' });
		else
			stretchLRGreen.setAttribute({ strokeColor: '#007800' });
		brdStretchLR.fullUpdate();
	}

	//--------------mirrorUDPlot--------------//
	var ceilMirrorUD = document.getElementById('ceilMirrorUD');
	var brdMirrorUD = JXG.JSXGraph.initBoard('mirrorUDPlot', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-8, 5, 8, -5], registerEvents: false, grid: true, showNavigation: false, showCopyright: false });
	brdMirrorUD.suspendUpdate();
	var mirrorUDBlue = brdMirrorUD.create('curve', [[-7, 1, 5, 6], [0, -2, 4, 0]], { strokeColor: '#1e28ff', strokeWidth: 3 });
	var mirrorUDGreen = brdMirrorUD.create('curve', [[-7, 1, 5, 6], [0, 2, -4, 0]], { strokeColor: '#007800', strokeWidth: 3 });
	var txt1 = brdMirrorUD.create('text', [7.55, -0.4, '$$x$$'], { fontSize: 17, color: '#000' });
	var txt2 = brdMirrorUD.create('text', [0.2, 4.7, '$$y$$'], { fontSize: 17, color: '#000' });
	var txt3 = brdMirrorUD.create('text', [-0.45, -0.5, '$$0$$'], { fontSize: 21 });
	mirrorUDGreen.setAttribute({ visible: false });
	brdMirrorUD.unsuspendUpdate();
	function showMirrorUD()
	{
		if(ceilMirrorUD.classList.contains('is-checked'))
		{
			mirrorUDGreen.setAttribute({ visible: false });
			mirrorUDBlue.setAttribute({ dash: 0 });
		}
		else
		{
			mirrorUDGreen.setAttribute({ visible: true });
			mirrorUDBlue.setAttribute({ dash: 3 });
		}
		brdMirrorUD.fullUpdate();
	}

	//--------------mirrorLRPlot--------------//
	var ceilMirrorLR = document.getElementById('ceilMirrorLR');
	var brdMirrorLR = JXG.JSXGraph.initBoard('mirrorLRPlot', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-8, 5, 8, -5], registerEvents: false, grid: true, showNavigation: false, showCopyright: false });
	brdMirrorLR.suspendUpdate();
	var mirrorLRBlue = brdMirrorLR.create('curve', [[-7, 1, 5, 6], [0, -2, 4, 0]], { strokeColor: '#1e28ff', strokeWidth: 3 });
	var mirrorLRGreen = brdMirrorLR.create('curve', [[-6, -5, -1, 7], [0, 4, -2, 0]], { strokeColor: '#007800', strokeWidth: 3 });
	var txt1 = brdMirrorLR.create('text', [7.55, -0.4, '$$x$$'], { fontSize: 17, color: '#000' });
	var txt2 = brdMirrorLR.create('text', [0.2, 4.7, '$$y$$'], { fontSize: 17, color: '#000' });
	var txt3 = brdMirrorLR.create('text', [-0.45, -0.5, '$$0$$'], { fontSize: 21 });
	mirrorLRGreen.setAttribute({ visible: false });
	brdMirrorLR.unsuspendUpdate();
	function showMirrorLR()
	{
		if(ceilMirrorLR.classList.contains('is-checked'))
		{
			mirrorLRGreen.setAttribute({ visible: false });
			mirrorLRBlue.setAttribute({ dash: 0 });
		}
		else
		{
			mirrorLRGreen.setAttribute({ visible: true });
			mirrorLRBlue.setAttribute({ dash: 3 });
		}
		brdMirrorLR.fullUpdate();
	}

	//--------------moduleUDPlot--------------//
	var ceilModuleUD = document.getElementById('ceilModuleUD');
	var brdModuleUD = JXG.JSXGraph.initBoard('moduleUDPlot', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-8, 5, 8, -5], registerEvents: false, grid: true, showNavigation: false, showCopyright: false });
	brdModuleUD.suspendUpdate();
	var moduleUDBlue = brdModuleUD.create('curve', [[-7, 1, 5, 6], [0, -2, 4, 0]], { strokeColor: '#1e28ff', strokeWidth: 3 });
	var moduleUDGreen = brdModuleUD.create('curve', [[-7, 1, 2.3333333, 5, 6], [0, 2, 0, 4, 0]], { strokeColor: '#007800', strokeWidth: 3 });
	var txt1 = brdModuleUD.create('text', [7.55, -0.4, '$$x$$'], { fontSize: 17, color: '#000' });
	var txt2 = brdModuleUD.create('text', [0.2, 4.7, '$$y$$'], { fontSize: 17, color: '#000' });
	var txt3 = brdModuleUD.create('text', [-0.45, -0.5, '$$0$$'], { fontSize: 21 });
	moduleUDGreen.setAttribute({ visible: false });
	brdModuleUD.unsuspendUpdate();
	function showModuleUD()
	{
		if(ceilModuleUD.classList.contains('is-checked'))
		{
			moduleUDGreen.setAttribute({ visible: false });
			moduleUDBlue.setAttribute({ dash: 0 });
		}
		else
		{
			moduleUDGreen.setAttribute({ visible: true });
			moduleUDBlue.setAttribute({ dash: 3 });
		}
		brdModuleUD.fullUpdate();
	}

	//--------------moduleLRPlot--------------//
	var ceilModuleLR = document.getElementById('ceilModuleLR');
	var brdModuleLR = JXG.JSXGraph.initBoard('moduleLRPlot', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-8, 5, 8, -5], registerEvents: false, grid: true, showNavigation: false, showCopyright: false });
	brdModuleLR.suspendUpdate();
	var moduleLRBlue = brdModuleLR.create('curve', [[-7, 1, 5, 6], [0, -2, 4, 0]], { strokeColor: '#1e28ff', strokeWidth: 3 });
	var moduleLRGreen = brdModuleLR.create('curve', [[-6, -5, -1, 0, 1, 5, 6], [0, 4, -2, -1.75, -2, 4, 0]], { strokeColor: '#007800', strokeWidth: 3 });
	var txt1 = brdModuleLR.create('text', [7.55, -0.4, '$$x$$'], { fontSize: 17, color: '#000' });
	var txt2 = brdModuleLR.create('text', [0.2, 4.7, '$$y$$'], { fontSize: 17, color: '#000' });
	var txt3 = brdModuleLR.create('text', [-0.45, -0.5, '$$0$$'], { fontSize: 21 });
	moduleLRGreen.setAttribute({ visible: false });
	brdModuleLR.unsuspendUpdate();
	function showModuleLR()
	{
		if(ceilModuleLR.classList.contains('is-checked'))
		{
			moduleLRGreen.setAttribute({ visible: false });
			moduleLRBlue.setAttribute({ dash: 0 });
		}
		else
		{
			moduleLRGreen.setAttribute({ visible: true });
			moduleLRBlue.setAttribute({ dash: 3 });
		}
		brdModuleLR.fullUpdate();
	}

	$(window).resize(function() { 
		brdShiftUD.resizeContainer($('#shiftUDPlot').width(), $('#shiftUDPlot').height(), true, true); 
		brdShiftUD.setBoundingBox([-2.8, 3, 2.8, -2], false); 
		brdShiftLR.resizeContainer($('#shiftLRPlot').width(), $('#shiftLRPlot').height(), true, true); 
		brdShiftLR.setBoundingBox([-2.8, 3, 2.8, -2], false);
		brdStretchUD.resizeContainer($('#stretchUDPlot').width(), $('#stretchUDPlot').height(), true, true); 
		brdStretchUD.setBoundingBox([-2*Math.PI, 3.05, 2*Math.PI, -3.05], false);
		brdStretchLR.resizeContainer($('#stretchLRPlot').width(), $('#stretchLRPlot').height(), true, true); 
		brdStretchLR.setBoundingBox([-2*Math.PI, 3.05, 2*Math.PI, -3.05], false);
		brdMirrorUD.resizeContainer($('#mirrorUDPlot').width(), $('#mirrorUDPlot').height(), true, true); 
		brdMirrorUD.setBoundingBox([-8, 5, 8, -5], false);
		brdMirrorLR.resizeContainer($('#mirrorLRPlot').width(), $('#mirrorLRPlot').height(), true, true); 
		brdMirrorLR.setBoundingBox([-8, 5, 8, -5], false);
		brdModuleUD.resizeContainer($('#moduleUDPlot').width(), $('#moduleUDPlot').height(), true, true); 
		brdModuleUD.setBoundingBox([-8, 5, 8, -5], false);
		brdModuleLR.resizeContainer($('#moduleLRPlot').width(), $('#moduleLRPlot').height(), true, true); 
		brdModuleLR.setBoundingBox([-8, 5, 8, -5], false);
	}); 
}

//---------------------------explicit-example-1---------------------------//

else if (document.title == "Пример 1")
{
	var ceilExample1 = document.getElementById('ceilExample1');
	var brdExample1 = JXG.JSXGraph.initBoard('explicitExample1Plot', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-1, 5, 11, -4], registerEvents: false, grid: true, showNavigation: false, showCopyright: false });
	brdExample1.suspendUpdate();
	var Example1Blue = brdExample1.create('functiongraph', [function(x) { return Math.cos(x) - 2; }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var Example1Red = brdExample1.create('functiongraph', [function(x) { return x * x - 12.57 * x + 36.5; }], { strokeWidth: 3, strokeColor: '#ff0000' });
	var Example1Green = brdExample1.create('functiongraph', [function(x) { return Math.max(Math.cos(x) - 2, x * x - 12.57 * x + 36.5); }], { strokeWidth: 3, strokeColor: '#007800' });
	var label1 = brdExample1.create('text', [10.6, -0.25, '$$x$$'], { fontSize: 22, color: '#000' });
	var label2 = brdExample1.create('text', [0.2, 4.8, '$$y$$'], { fontSize: 22, color: '#000' });
	var label3 = brdExample1.create('text', [0.1, -0.75, '$$-1$$'], { fontSize: 20, color: '#000' });
	var point1 = brdExample1.create('point', [5.108, -1.615], { name: '', size: 2, color: '#000' });
	var point2 = brdExample1.create('point', [7.461, -1.615], { name: '', size: 2, color: '#000' });
	var line1 = brdExample1.create('line', [[-0.15, -1], [0.15, -1]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });
	var line2 = brdExample1.create('line', [[5.108, -6], [5.108, 7]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });
	var line3 = brdExample1.create('line', [[7.461, -6], [7.461, 7]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });
	Example1Green.setAttribute({ visible: false });
	brdExample1.unsuspendUpdate();
	function showExample1()
	{
		if(ceilExample1.classList.contains('is-checked'))
		{
			Example1Red.setAttribute({ dash: 0 });
			Example1Blue.setAttribute({ dash: 0 });
			Example1Green.setAttribute({ visible: false });
		}
		else
		{
			Example1Red.setAttribute({ dash: 3 });
			Example1Blue.setAttribute({ dash: 3 });
			Example1Green.setAttribute({ visible: true });
		}
		brdExample1.fullUpdate();
	}

	$(window).resize(function() { 
		brdExample1.resizeContainer($('#explicitExample1Plot').width(), $('#explicitExample1Plot').height(), true, true); 
		brdExample1.setBoundingBox([-1, 5, 11, -4], false); 
	}); 
}

//---------------------------explicit-example-2---------------------------//

else if (document.title == "Пример 2")
{
	var ceilExample2 = document.getElementById('ceilExample2');
	var brdExample2 = JXG.JSXGraph.initBoard('explicitExample2Plot', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-2, 4.5, 10, -4.5], registerEvents: false, grid: true, showNavigation: false, showCopyright: false });
	brdExample2.suspendUpdate();
	var Example2BlueBefore = brdExample2.create('functiongraph', [function(x) { return JXG.Math.pow(x - 4, 3) / 9; }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var Example2BlueAfter = brdExample2.create('functiongraph', [function(x) { if (x <= 1 || x >= 7) return JXG.Math.pow(x - 4, 3) / 9; }], { strokeWidth: 3, strokeColor: '#1e28ff', dash: 3 });
	var Example2RedBefore = brdExample2.create('functiongraph', [function(x) { return x - 4; }], { strokeWidth: 3, strokeColor: '#ff0000' });
	var Example2RedAfter = brdExample2.create('functiongraph', [function(x) { if (x > 1 && x < 7) return x - 4; }], { strokeWidth: 3, strokeColor: '#ff0000', dash: 3 });
	var Example2Green = brdExample2.create('functiongraph', [function(x) {
		if (x > 1 && x < 7) return JXG.Math.pow(x - 4, 3) / 9;
		else if (x <= 1 || x >= 7) return x - 4 }], 
		{ strokeWidth: 4, strokeColor: '#007800' });
	var label1 = brdExample2.create('text', [9.6, -0.25, '$$x$$'], { fontSize: 22, color: '#000' });
	var label2 = brdExample2.create('text', [0.2, 4.3, '$$y$$'], { fontSize: 22, color: '#000' });
	var label3 = brdExample2.create('text', [3.9, -0.45, '$$4$$'], { fontSize: 20, color: '#000' });
	var label4 = brdExample2.create('text', [-0.5, 3, '$$3$$'], { fontSize: 20, color: '#000' });
	var label5 = brdExample2.create('text', [-0.85, -3, '$$-3$$'], { fontSize: 20, color: '#000' });
	var label6 = brdExample2.create('text', [0.9, -0.45, '$$1$$'], { fontSize: 20, color: '#000' });
	var label7 = brdExample2.create('text', [6.9, -0.45, '$$7$$'], { fontSize: 20, color: '#000' });
	var point1 = brdExample2.create('point', [1, -3], { name: '', size: 2, color: '#000' });
	var point2 = brdExample2.create('point', [7, 3], { name: '', size: 2, color: '#000' });
	var line1 = brdExample2.create('line', [[4, -0.15], [4, 0.15]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });
	var line2 = brdExample2.create('line', [[1, -0.15], [1, 0.15]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });
	var line3 = brdExample2.create('line', [[7, -0.15], [7, 0.15]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });
	var line4 = brdExample2.create('line', [[1, -6.9], [1, -0.7]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });
	var line5 = brdExample2.create('line', [[1, 0.3], [1, 6.6]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });
	var line6 = brdExample2.create('line', [[7, -6.9], [7, -0.7]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });
	var line7 = brdExample2.create('line', [[7, 0.3], [7, 6.6]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });
	var line8 = brdExample2.create('line', [[-0.15, 3], [0.15, 3]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });
	var line9 = brdExample2.create('line', [[-0.15, -3], [0.15, -3]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });
	Example2Green.setAttribute({ visible: false });
	brdExample2.unsuspendUpdate();
	function showExample2()
	{
		if(ceilExample2.classList.contains('is-checked'))
		{
			Example2BlueBefore.setAttribute({ visible: true });
			Example2RedBefore.setAttribute({ visible: true });
			Example2Green.setAttribute({ visible: false });
		}
		else
		{
			Example2BlueBefore.setAttribute({ visible: false });
			Example2RedBefore.setAttribute({ visible: false });
			Example2Green.setAttribute({ visible: true });
		}
		brdExample2.fullUpdate();
	}

	$(window).resize(function() { 
		brdExample2.resizeContainer($('#explicitExample2Plot').width(), $('#explicitExample2Plot').height(), true, true); 
		brdExample2.setBoundingBox([-2, 4.5, 10, -4.5], false); 
	});
}

//---------------------------monotonicity-example-1---------------------------//

else if (document.title == "Пример 1. Монотонность функции.")
{
	var monExample1 = JXG.JSXGraph.initBoard('monotonicityExample1Plot', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-0.5, 15, 3.8, -2], registerEvents: false, grid: true, showNavigation: false, showCopyright: false });
	var monExample1Plot1 = monExample1.create('functiongraph', [function(x) { return (x - 3) * (x - 3) * JXG.Math.pow(2.718282, Math.abs(x)); }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var label1 = monExample1.create('text', [3.63, -0.5, '$$x$$'], { fontSize: 22, color: '#000' });
	var label2 = monExample1.create('text', [0.1, 14.7, '$$y$$'], { fontSize: 22, color: '#000' });
	var label3 = monExample1.create('text', [-0.17, -0.6, '$$0$$'], { fontSize: 21, color: '#000' });
	var label4 = monExample1.create('text', [2.95, -0.7, '$$3$$'], { fontSize: 21, color: '#000' });
	var label5 = monExample1.create('text', [0.95, -0.7, '$$1$$'], { fontSize: 21, color: '#000' });
	var line1 = monExample1.create('line', [[3, -0.2], [3, 0.2]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });
	var line2 = monExample1.create('line', [[1, -0.2], [1, 0.2]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2 });

	var monExample2 = JXG.JSXGraph.initBoard('monotonicityExample1Interval', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [1, 1.5, 5, -1], registerEvents: false, grid: false, showNavigation: false, showCopyright: false });
	var int1 = monExample2.create('curve', [function(t) { return Math.cos(t) + 1; }, function(t) { return Math.abs(Math.sin(t)); }, 0], { strokeWidth: 2, strokeColor: '#000' });
	var int2 = monExample2.create('curve', [function(t) { return 0.5 * Math.cos(t) + 2.5; }, function(t) { return 0.9 * Math.abs(Math.sin(t)); }, 0], { strokeWidth: 2, strokeColor: '#000' });
	var int3 = monExample2.create('curve', [function(t) { return 0.5 * Math.cos(t) + 3.5; }, function(t) { return 0.9 * Math.abs(Math.sin(t)); }, 0], { strokeWidth: 2, strokeColor: '#000' });
	var int4 = monExample2.create('curve', [function(t) { return Math.cos(t) + 5; }, function(t) { return Math.abs(Math.sin(t)); }, 0], { strokeWidth: 2, strokeColor: '#000' });
	var label6 = monExample2.create('text', [1.96, -0.4, '$$0$$'], { fontSize: 22, color: '#000' });
	var label7 = monExample2.create('text', [2.96, -0.4, '$$1$$'], { fontSize: 22, color: '#000' });
	var label8 = monExample2.create('text', [3.96, -0.4, '$$3$$'], { fontSize: 22, color: '#000' });
	var label9 = monExample2.create('text', [4.85, -0.3, '$$x$$'], { fontSize: 22, color: '#000' });
	var label10 = monExample2.create('text', [1.05, 0.5, "$$y$$_{_{$$x$$}}$$'$$:"], { fontSize: 24, color: '#007800' });
	var label11 = monExample2.create('text', [1.05, -0.45, '$$y(x)$$:'], { fontSize: 24, color: '#1e28ff' });
	var label12 = monExample2.create('text', [1.5, 0.42, '$$-$$'], { fontSize: 28, color: '#007800' });
	var label13 = monExample2.create('text', [2.42, 0.47, '$$+$$'], { fontSize: 28, color: '#007800' });
	var label14 = monExample2.create('text', [3.42, 0.42, '$$-$$'], { fontSize: 28, color: '#007800' });
	var label15 = monExample2.create('text', [4.5, 0.47, '$$+$$'], { fontSize: 28, color: '#007800' });
	var label16 = monExample2.create('text', [1.51, -0.4, '↘'], { fontSize: 32, color: '#1e28ff' });
	var label17 = monExample2.create('text', [2.43, -0.4, '↗'], { fontSize: 32, color: '#1e28ff' });
	var label18 = monExample2.create('text', [3.43, -0.4, '↘'], { fontSize: 32, color: '#1e28ff' });
	var label19 = monExample2.create('text', [4.51, -0.4, '↗'], { fontSize: 32, color: '#1e28ff' });

	$(window).resize(function() { 
		monExample1.resizeContainer($('#monotonicityExample1Plot').width(), $('#monotonicityExample1Plot').height(), true, true); 
		monExample1.setBoundingBox([-0.5, 15, 3.8, -2], false);
		monExample2.resizeContainer($('#monotonicityExample1Interval').width(), $('#monotonicityExample1Interval').height(), true, true); 
		monExample2.setBoundingBox([1, 1.5, 5, -1], false);
	}); 
}

//---------------------------monotonicity-example-2---------------------------//

else if (document.title == "Пример 2. Монотонность функции.")
{
	var monExample1 = JXG.JSXGraph.initBoard('monotonicityExample2Plot', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-5, 3, 5, -1], registerEvents: false, grid: true, showNavigation: false, showCopyright: false });
	var monExample1Plot1 = monExample1.create('curve', [function(t) { return Math.sqrt((1 - t) / t); }, function(t) { return t; }, 0], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var monExample1Plot2 = monExample1.create('curve', [function(t) { return -Math.sqrt((1 - t) / t); }, function(t) { return t; }, 0], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var label1 = monExample1.create('text', [4.63, -0.15, '$$x$$'], { fontSize: 22, color: '#000' });
	var label2 = monExample1.create('text', [0.15, 2.9, '$$y$$'], { fontSize: 22, color: '#000' });
	var label3 = monExample1.create('text', [-0.35, -0.15, '$$0$$'], { fontSize: 21, color: '#000' });

	var monExample2 = JXG.JSXGraph.initBoard('monotonicityExample2Interval', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [1, 1.5, 5, -1], registerEvents: false, grid: false, showNavigation: false, showCopyright: false });
	var int1 = monExample2.create('curve', [function(t) { return 1.5 * Math.cos(t) + 1.5; }, function(t) { return Math.abs(Math.sin(t)); }, 0], { strokeWidth: 2, strokeColor: '#000' });
	var int2 = monExample2.create('curve', [function(t) { return 1.5 * Math.cos(t) + 4.5; }, function(t) { return Math.abs(Math.sin(t)); }, 0], { strokeWidth: 2, strokeColor: '#000' });
	var label4 = monExample2.create('text', [2.94, -0.4, '$$0$$'], { fontSize: 22, color: '#000' });
	var label5 = monExample2.create('text', [4.85, -0.3, '$$x$$'], { fontSize: 22, color: '#000' });
	var label6 = monExample2.create('text', [1.05, 0.5, "$$y$$_{_{$$x$$}}$$'$$:"], { fontSize: 24, color: '#007800' });
	var label7 = monExample2.create('text', [1.05, -0.42, '$$y(x)$$:'], { fontSize: 24, color: '#1e28ff' });
	var label8 = monExample2.create('text', [1.85, 0.47, '$$+$$'], { fontSize: 28, color: '#007800' });
	var label9 = monExample2.create('text', [4, 0.42, '$$-$$'], { fontSize: 28, color: '#007800' });
	var label10 = monExample2.create('text', [1.89, -0.45, '↗'], { fontSize: 32, color: '#1e28ff' });
	var label11 = monExample2.create('text', [4.04, -0.45, '↘'], { fontSize: 32, color: '#1e28ff' });

	$(window).resize(function() { 
		monExample1.resizeContainer($('#monotonicityExample2Plot').width(), $('#monotonicityExample2Plot').height(), true, true); 
		monExample1.setBoundingBox([-5, 3, 5, -1], false);
		monExample2.resizeContainer($('#monotonicityExample2Interval').width(), $('#monotonicityExample2Interval').height(), true, true); 
		monExample2.setBoundingBox([1, 1.5, 5, -1], false);
	}); 
}

//---------------------------monotonicity-example-3---------------------------//

else if (document.title == "Пример 3. Монотонность функции.")
{
	var monExample1 = JXG.JSXGraph.initBoard('monotonicityExample3Plot', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-3.6, -5, 2, -11], registerEvents: false, grid: true, showNavigation: false, showCopyright: false });
	var monExample1Plot1 = monExample1.create('curve', [function(t) { return JXG.Math.pow(2.718282, -t) / (1 - t); }, function(t) { return JXG.Math.pow(2.7182832, t) / (1 - t); }, 0], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var monExample1Plot2 = monExample1.create('functiongraph', [function(x) { if (x >= -0.1108 && x < 0) return -(105 * x * x + 50.4 * x + 11.68); }], { strokeColor: '#1e28ff', strokeWidth: 3 });
	var label1 = monExample1.create('text', [4.63, -0.15, '$$x$$'], { fontSize: 22, color: '#000' });
	var label2 = monExample1.create('text', [0.1, -5.17, '$$y$$'], { fontSize: 22, color: '#000' });
	var label3 = monExample1.create('text', [0.15, -7, '$$-7$$'], { fontSize: 21, color: '#000' });
	var label4 = monExample1.create('text', [0.15, -8, '$$-8$$'], { fontSize: 21, color: '#000' });
	var label5 = monExample1.create('text', [-1.35, -7.35, '$$x=-e$$^{$$-2$$}'], { fontSize: 21, color: '#000' });
	var line1 = monExample1.create('line', [[-0.1, -7], [0.1, -7]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2 });
	var line2 = monExample1.create('line', [[-0.1, -8], [0.1, -8]], { straightFirst: false, straightLast: false, strokeColor:'#000', strokeWidth: 2 });
	var point1 = monExample1.create('point', [-0.125, -7.386], { name: '', size: 1, color: '#000' });

	var monExample2 = JXG.JSXGraph.initBoard('monotonicityExample3Interval', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [0.65, 1.5, 5, -1], registerEvents: false, grid: false, showNavigation: false, showCopyright: false });
	var int1 = monExample2.create('curve', [function(t) { return 0.8 * Math.cos(t) + 2.3; }, function(t) { return 1.15 * Math.abs(Math.sin(t)); }, 0], { strokeWidth: 2, strokeColor: '#000' });
	var int2 = monExample2.create('curve', [function(t) { return 1.5 * Math.cos(t) + 4.6; }, function(t) { return 1.2 * Math.abs(Math.sin(t)); }, 0], { strokeWidth: 2, strokeColor: '#000' });
	var label6 = monExample2.create('text', [2.83, -0.4, '$$-e$$^{$$-2$$}'], { fontSize: 22, color: '#000' });
	var label7 = monExample2.create('text', [1.32, -0.4, '$$-∞$$'], { fontSize: 22, color: '#000' });
	var label8 = monExample2.create('text', [4.6, -0.4, '$$0$$'], { fontSize: 22, color: '#000' });
	var label9 = monExample2.create('text', [1.45, 0.8, '$$1$$'], { fontSize: 22, color: '#ff0000' });
	var label10 = monExample2.create('text', [3.05, 0.8, '$$2$$'], { fontSize: 22, color: '#ff0000' });
	var label11 = monExample2.create('text', [4.85, -0.3, '$$x$$'], { fontSize: 22, color: '#000' });
	var label12 = monExample2.create('text', [0.72, 0.5, "$$y$$_{_{$$x$$}}$$'$$:"], { fontSize: 24, color: '#007800' });
	var label13 = monExample2.create('text', [4.85, 0.8, '$$t$$'], { fontSize: 24, color: '#ff0000' });
	var label14 = monExample2.create('text', [0.72, -0.42, '$$y(x)$$:'], { fontSize: 24, color: '#1e28ff' });
	var label15 = monExample2.create('text', [2.17, 0.47, '$$+$$'], { fontSize: 28, color: '#007800' });
	var label16 = monExample2.create('text', [4.05, 0.42, '$$-$$'], { fontSize: 28, color: '#007800' });
	var label17 = monExample2.create('text', [2.2, -0.45, '↗'], { fontSize: 32, color: '#1e28ff' });
	var label18 = monExample2.create('text', [4.08, -0.45, '↘'], { fontSize: 32, color: '#1e28ff' });
	var line3 = monExample2.create('line', [[0, 0], [1.49, 0]], { straightFirst: false, straightLast: false, strokeColor:'#fff', strokeWidth: 4 });
	var point2 = monExample2.create('point', [1.49, 0], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });

	$(window).resize(function() { 
		monExample1.resizeContainer($('#monotonicityExample3Plot').width(), $('#monotonicityExample3Plot').height(), true, true); 
		monExample1.setBoundingBox([-3.6, -5, 2, -11], false);
		monExample2.resizeContainer($('#monotonicityExample3Interval').width(), $('#monotonicityExample3Interval').height(), true, true); 
		monExample2.setBoundingBox([0.65, 1.5, 5, -1], false);
	}); 
}

//---------------------------convex-example-1---------------------------//

else if (document.title == "Пример 1. Выпуклость функции.")
{
	var convexExample1 = JXG.JSXGraph.initBoard('convexExample1Plot', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-1.8, 3, 1.63, -3.3], registerEvents: false, grid: true, showNavigation: false, showCopyright: false });
	var convexExample1Plot1 = convexExample1.create('functiongraph', [function(x) { return 2 * JXG.Math.pow(x, 4) - 3 * x * x + x - 1; }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var label1 = convexExample1.create('text', [1.5, -0.2, '$$x$$'], { fontSize: 22, color: '#000' });
	var label2 = convexExample1.create('text', [0.05, 2.87, '$$y$$'], { fontSize: 22, color: '#000' });
	var label3 = convexExample1.create('text', [-0.9, -0.25, '$$-0.5$$'], { fontSize: 21, color: '#000' });
	var label4 = convexExample1.create('text', [0.57, -0.25, '$$0.5$$'], { fontSize: 21, color: '#000' });
	var line1 = convexExample1.create('line', [[-0.5, -4], [-0.5, 4]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });
	var line2 = convexExample1.create('line', [[0.5, -4], [0.5, 4]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });

	var convexExample2 = JXG.JSXGraph.initBoard('convexExample1Interval', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [0.8, 1.5, 5, -1], registerEvents: false, grid: false, showNavigation: false, showCopyright: false });
	var int1 = convexExample2.create('curve', [function(t) { return Math.cos(t) + 1.2; }, function(t) { return Math.abs(Math.sin(t)); }, 0], { strokeWidth: 2, strokeColor: '#000' });
	var int2 = convexExample2.create('curve', [function(t) { return 0.8 * Math.cos(t) + 3; }, function(t) { return Math.abs(Math.sin(t)); }, 0], { strokeWidth: 2, strokeColor: '#000' });
	var int3 = convexExample2.create('curve', [function(t) { return Math.cos(t) + 4.8; }, function(t) { return Math.abs(Math.sin(t)); }, 0], { strokeWidth: 2, strokeColor: '#000' });
	var label5 = convexExample2.create('text', [1.9, -0.4, '$$-0.5$$'], { fontSize: 22, color: '#000' });
	var label6 = convexExample2.create('text', [3.67, -0.4, '$$0.5$$'], { fontSize: 22, color: '#000' });
	var label7 = convexExample2.create('text', [4.85, -0.3, '$$x$$'], { fontSize: 22, color: '#000' });
	var label8 = convexExample2.create('text', [0.85, 0.5, "$$y''$$:"], { fontSize: 24, color: '#007800' });
	var label9 = convexExample2.create('text', [0.85, -0.47, '$$y(x)$$:'], { fontSize: 24, color: '#1e28ff' });
	var label10 = convexExample2.create('text', [1.49, 0.5, '$$+$$'], { fontSize: 28, color: '#007800' });
	var label11 = convexExample2.create('text', [2.88, 0.46, '$$-$$'], { fontSize: 28, color: '#007800' });
	var label12 = convexExample2.create('text', [4.39, 0.5, '$$+$$'], { fontSize: 28, color: '#007800' });
	var label13 = convexExample2.create('text', [1.51, -0.45, '$$⋃$$'], { fontSize: 16, color: '#1e28ff' });
	var label14 = convexExample2.create('text', [2.9, -0.45, '$$⋂$$'], { fontSize: 16, color: '#1e28ff' });
	var label15 = convexExample2.create('text', [4.41, -0.45, '$$⋃$$'], { fontSize: 16, color: '#1e28ff' });

	$(window).resize(function() { 
		convexExample1.resizeContainer($('#convexExample1Plot').width(), $('#convexExample1Plot').height(), true, true); 
		convexExample1.setBoundingBox([-1.8, 3, 1.63, -3.3], false);
		convexExample2.resizeContainer($('#convexExample1Interval').width(), $('#convexExample1Interval').height(), true, true); 
		convexExample2.setBoundingBox([0.8, 1.5, 5, -1], false);
	}); 
}

//---------------------------convex-example-2---------------------------//

else if (document.title == "Пример 2. Выпуклость функции.")
{
	var convexExample1 = JXG.JSXGraph.initBoard('convexExample2Plot', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-3.5, 3.5, 3.5, -2.5], registerEvents: false, grid: true, showNavigation: false, showCopyright: false });
	var convexExample2Plot1 = convexExample1.create('functiongraph', [function(x) { return 1 / (1 - x * x); }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var label1 = convexExample1.create('text', [3.2, 0.25, '$$x$$'], { fontSize: 22, color: '#000' });
	var label2 = convexExample1.create('text', [0.13, 3.4, '$$y$$'], { fontSize: 22, color: '#000' });
	var label3 = convexExample1.create('text', [-1.6, -0.2, '$$-1$$'], { fontSize: 21, color: '#000' });
	var label4 = convexExample1.create('text', [1.2, -0.2, '$$1$$'], { fontSize: 21, color: '#000' });
	var line1 = convexExample1.create('line', [[-1, -4], [-1, 4]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });
	var line2 = convexExample1.create('line', [[1, -4], [1, 4]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });

	var convexExample2 = JXG.JSXGraph.initBoard('convexExample2Interval', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [0.75, 1.5, 5, -1], registerEvents: false, grid: false, showNavigation: false, showCopyright: false });
	var int1 = convexExample2.create('curve', [function(t) { return Math.cos(t) + 1.2; }, function(t) { return Math.abs(Math.sin(t)); }, 0], { strokeWidth: 2, strokeColor: '#000' });
	var int2 = convexExample2.create('curve', [function(t) { return 0.8 * Math.cos(t) + 3; }, function(t) { return Math.abs(Math.sin(t)); }, 0], { strokeWidth: 2, strokeColor: '#000' });
	var int3 = convexExample2.create('curve', [function(t) { return Math.cos(t) + 4.8; }, function(t) { return Math.abs(Math.sin(t)); }, 0], { strokeWidth: 2, strokeColor: '#000' });
	var label5 = convexExample2.create('text', [2.05, -0.4, '$$-1$$'], { fontSize: 22, color: '#000' });
	var label6 = convexExample2.create('text', [3.75, -0.4, '$$1$$'], { fontSize: 22, color: '#000' });
	var label7 = convexExample2.create('text', [4.85, -0.3, '$$x$$'], { fontSize: 22, color: '#000' });
	var label8 = convexExample2.create('text', [0.8, 0.5, "$$y''$$:"], { fontSize: 24, color: '#007800' });
	var label9 = convexExample2.create('text', [0.8, -0.47, '$$y(x)$$:'], { fontSize: 24, color: '#1e28ff' });
	var label10 = convexExample2.create('text', [1.49, 0.46, '$$-$$'], { fontSize: 28, color: '#007800' });
	var label11 = convexExample2.create('text', [2.9, 0.5, '$$+$$'], { fontSize: 28, color: '#007800' });
	var label12 = convexExample2.create('text', [4.39, 0.46, '$$-$$'], { fontSize: 28, color: '#007800' });
	var label13 = convexExample2.create('text', [1.51, -0.45, '$$⋂$$'], { fontSize: 16, color: '#1e28ff' });
	var label14 = convexExample2.create('text', [2.92, -0.45, '$$⋃$$'], { fontSize: 16, color: '#1e28ff' });
	var label15 = convexExample2.create('text', [4.41, -0.45, '$$⋂$$'], { fontSize: 16, color: '#1e28ff' });
	var point1 = convexExample2.create('point', [2.2, 0], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });
	var point2 = convexExample2.create('point', [3.8, 0], { name: '', style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white' });

	$(window).resize(function() { 
		convexExample1.resizeContainer($('#convexExample2Plot').width(), $('#convexExample2Plot').height(), true, true); 
		convexExample1.setBoundingBox([-3.5, 3.5, 3.5, -2.5], false);
		convexExample2.resizeContainer($('#convexExample2Interval').width(), $('#convexExample2Interval').height(), true, true); 
		convexExample2.setBoundingBox([0.75, 1.5, 5, -1], false);
	}); 
}

//---------------------------asymptotes-example-1---------------------------//

else if (document.title == "Пример 1. Асимптоты функции.")
{
	var asymExample1 = JXG.JSXGraph.initBoard('asymptotesExample1Plot', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-9, 8, 7, -0.9], registerEvents: false, grid: true, showNavigation: false, showCopyright: false });
	var asymExample1Plot1 = asymExample1.create('functiongraph', [function(x) { return Math.sqrt(x * x * x / (x - 2)); }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var asymExample1Plot2 = asymExample1.create('functiongraph', [function(x) { return x + 1; }], { strokeWidth: 1, strokeColor: '#000', dash: 3 });
	var asymExample1Plot3 = asymExample1.create('functiongraph', [function(x) { return -x - 1; }], { strokeWidth: 1, strokeColor: '#000', dash: 3 });
	var line1 = asymExample1.create('line', [[2, -1], [2, 8]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 2, dash: 3 });
	var label1 = asymExample1.create('text', [6.4, -0.25, '$$x$$'], { fontSize: 22, color: '#000' });
	var label2 = asymExample1.create('text', [0.3, 7.8, '$$y$$'], { fontSize: 22, color: '#000' });
	var label3 = asymExample1.create('text', [3.8, 4.5, '$$y=x+1$$'], { fontSize: 21, color: '#000' });
	var label4 = asymExample1.create('text', [-8.7, 3.5, '$$y=-x-1$$'], { fontSize: 21, color: '#000' });
	var label5 = asymExample1.create('text', [2.4, 0.5, '$$x=2$$'], { fontSize: 21, color: '#000' });

	$(window).resize(function() { 
		asymExample1.resizeContainer($('#asymptotesExample1Plot').width(), $('#asymptotesExample1Plot').height(), true, true); 
		asymExample1.setBoundingBox([-9, 8, 7, -0.9], false);
	}); 
}

//---------------------------asymptotes-example-2---------------------------//

else if (document.title == "Пример 2. Асимптоты функции.")
{
	var asymExample2 = JXG.JSXGraph.initBoard('asymptotesExample2Plot', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-2, 4, 3, -4], registerEvents: false, grid: true, showNavigation: false, showCopyright: false });
	var asymExample2Plot1 = asymExample2.create('functiongraph', [function(x) { if (x > -1.05) return (2 * x + 1) / (x + 1); }], { strokeWidth: 3, strokeColor: '#1e28ff' });
	var asymExample2Plot2 = asymExample2.create('functiongraph', [function(x) { return 2; }], { strokeWidth: 1, strokeColor: '#000', dash: 3 });
	var line1 = asymExample2.create('line', [[-1, -4.5], [-1, 4.5]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 1, dash: 3 });
	var label1 = asymExample2.create('text', [2.82, -0.3, '$$x$$'], { fontSize: 22, color: '#000' });
	var label2 = asymExample2.create('text', [0.09, 3.8, '$$y$$'], { fontSize: 22, color: '#000' });
	var label3 = asymExample2.create('text', [0.09, 2.5, '$$y=2$$'], { fontSize: 21, color: '#000' });
	var label4 = asymExample2.create('text', [-1.85, 0.5, '$$x=-1$$'], { fontSize: 21, color: '#000' });

	$(window).resize(function() { 
		asymExample2.resizeContainer($('#asymptotesExample2Plot').width(), $('#asymptotesExample2Plot').height(), true, true); 
		asymExample2.setBoundingBox([-2, 4, 3, -4], false);
	});
}

//---------------------------asymptotes-example-3---------------------------//

else if (document.title == "Пример 3. Асимптоты функции.")
{
	var asymExample3 = JXG.JSXGraph.initBoard('asymptotesExample3Plot', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-1, 5, 4.2, -0.5], registerEvents: false, grid: true, showNavigation: false, showCopyright: false });
	var asymExample3Plot1 = asymExample3.create('curve', [function(t) { return t * Math.log(t, 2.718282); }, function(t) { return t * Math.log(t + 1, 2.718282); }], { strokeWidth: 2, strokeColor: '#1e28ff' });
	var asymExample3Plot2 = asymExample3.create('functiongraph', [function(x) { return x + 1; }], { strokeWidth: 1, strokeColor: '#000', dash: 3 });
	var label1 = asymExample3.create('text', [4.02, -0.22, '$$x$$'], { fontSize: 22, color: '#000' });
	var label2 = asymExample3.create('text', [0.09, 4.85, '$$y$$'], { fontSize: 22, color: '#000' });
	var label3 = asymExample3.create('text', [0.4, 2.7, '$$y=x+1$$'], { fontSize: 21, color: '#000' });

	$(window).resize(function() { 
		asymExample3.resizeContainer($('#asymptotesExample3Plot').width(), $('#asymptotesExample3Plot').height(), true, true); 
		asymExample3.setBoundingBox([-1, 5, 4.2, -0.5], false);
	}); 
}

//---------------------------asymptotes-example-4---------------------------//

else if (document.title == "Пример 4. Асимптоты функции.")
{
	var asymExample4 = JXG.JSXGraph.initBoard('asymptotesExample4Plot', {
		axis: true, defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		boundingbox: [-1, 7, 5, -7], registerEvents: false, grid: true, showNavigation: false, showCopyright: false });
	var asymExample4Plot1 = asymExample4.create('curve', [function(t) { return 2 * JXG.Math.cosh(t); }, function(t) { return 3 * JXG.Math.sinh(t); }, -10], { strokeWidth: 2, strokeColor: '#1e28ff' });
	var asymExample4Plot2 = asymExample4.create('functiongraph', [function(x) { return 1.5 * x; }], { strokeWidth: 1, strokeColor: '#000', dash: 3 });
	var asymExample4Plot3 = asymExample4.create('functiongraph', [function(x) { return -1.5 * x; }], { strokeWidth: 1, strokeColor: '#000', dash: 3 });
	var label1 = asymExample4.create('text', [4.78, -0.35, '$$x$$'], { fontSize: 22, color: '#000' });
	var label2 = asymExample4.create('text', [0.1, 6.75, '$$y$$'], { fontSize: 22, color: '#000' });
	var label3 = asymExample4.create('text', [0.7, 3.5, '$$y=1.5 ⋅ x$$'], { fontSize: 21, color: '#000' });
	var label4 = asymExample4.create('text', [0.5, -3.5, '$$y=-1.5 ⋅ x$$'], { fontSize: 21, color: '#000' });

	$(window).resize(function() { 
		asymExample4.resizeContainer($('#asymptotesExample4Plot').width(), $('#asymptotesExample4Plot').height(), true, true); 
		asymExample4.setBoundingBox([-1, 7, 5, -7], false);
	}); 
}