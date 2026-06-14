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

	$('.symmetryFirst1').on("click", function(e) {
		$(".symmetryCheck1").toggleClass('is-checked2');
	});

	$('.symmetryFirst2').on("click", function(e) {
		$(".symmetryCheck2").toggleClass('is-checked2');
	});

	$('.symmetrySecond1').on("click", function(e) {
		$(".symmetryCheck3").toggleClass('is-checked2');
	});

	$('.symmetrySecond2').on("click", function(e) {
		$(".symmetryCheck4").toggleClass('is-checked2');
	});

	$("div.markdown-body").removeClass('container-lg');

	$(".start-button").click(function () {
		$(this).addClass("disabled");
		$(".stop-button").removeClass("disabled");
	});

	$(".stop-button").click(function () {
		$(this).addClass("disabled");
		$(".start-button").removeClass("disabled");
	});
});

// --- функции для работы с таблицей в подробных примерах параметрических функций --- //
function getTableShifts() {
	const table = document.querySelector("table");
	const rows = table.rows;

	const cellsFirstRow = rows[0].cells;
	const spans = [];
	for (let j = 0; j < cellsFirstRow.length; j++) {
		const cell = cellsFirstRow[j];
		spans.push(cell.colSpan);
	}

	var shifts = [];
	var shift = 0;
	for (let i = 0; i < rows.length; i++) {
		shift = 0;
		for (let j = 0; j < cellsFirstRow.length; j++) {
			const cell = rows[i].cells[j];

			if (spans[j] > cell.colSpan) {
				if (!(i in shifts))
					shifts[i] = new Map();
				const span = spans[j];
				for (let l = 0; l < span - 1; l++, shift++);
				shifts[i].set(j, shift);
			}
		}
	}

	return shifts;
}
function applyStyleToColumn(colIndex, shifts, addStyle, removeStyle) {
	const table = document.querySelector("table");
	const rows = table.rows;
	var shift = 0;
	for (let i = 0; i < rows.length; i++) {
		var cell = rows[i].children[colIndex];
		if (cell) {
			if (i in shifts) {
				var j = colIndex;
				for (; j >= 0; j--) {
					if (shifts[i].has(j)) {
						shift = shifts[i].get(j);
						break;
					}
				}
				if (j < 0) shift = 0;
				if (j == colIndex) {
					//cycle
					cell = rows[i].children[colIndex + shift - 1];
					cell.classList.remove(removeStyle);
					cell.classList.add(addStyle);
				}
				cell = rows[i].children[colIndex + shift];
				cell.classList.remove(removeStyle);
				cell.classList.add(addStyle);
			} else {
				cell.classList.remove(removeStyle);
				cell.classList.add(addStyle);
			}
		}
	}
}
// lastCurve = [<номера столбцов>, <номер кривой>]
function applyStyleForColumns(shifts, lastCurve, startCol) {
	for (let i = 0; i < lastCurve.length - 1; i++)
		applyStyleToColumn(lastCurve[i], shifts, "text-transparent", "text-visible");
	for (let i = startCol, ii = 0; i < startCol + 3; i++, ii++) {
		applyStyleToColumn(i, shifts, "text-visible", "text-transparent");
		lastCurve[ii] = i;
	}
}
function removeStyleForColumns(shifts, lastCurve) {
	for (let i = 0; i < lastCurve.length - 1; i++)
		applyStyleToColumn(lastCurve[i], shifts, "text-transparent", "text-visible");
}
// --- функции для обработки прозрачности асимптот --- //
function applyOpacityAsymptote(asymptotes, segment, opacity) {
	asymptotes.get(segment).setAttribute(
		{ opacity: opacity }
	);
}
function applyOpacityAsymptoteBigAndSmallBoards(asymptotesBigBoard, asymptotesSmallBoard, segment, opacity) {
	applyOpacityAsymptote(asymptotesBigBoard, segment, opacity);
	applyOpacityAsymptote(asymptotesSmallBoard, segment, opacity);
}
function setNormalTextAsymptote(textAsymptote) {
	textAsymptote.classList.remove("text-weight-normal");
	textAsymptote.classList.add("text-weight-bolder");
}
function setBoldTextAsymptote(textAsymptote) {
	textAsymptote.classList.add("text-weight-normal");
	textAsymptote.classList.remove("text-weight-bolder");
}

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

//---------------------------parametric-example-1---------------------------//

else if (document.title == "Пример 1. Построение графиков функций и кривых. Параметрическое задание.") 
{ 
	function funcX(t) {
		return t * t / (1 + t * t * t);
	}
	function funcY(t) {
		return t * t * t / (1 + t * t * t);
	}

	var borderValue = 3;
	var borders = [-borderValue, borderValue, borderValue, -borderValue];

	var colors = [
		'#1e28ff',
		'#ff0000',
		'#00eb00',
		'#ffa600'
	]

	var slider = document.getElementById('tSlider'); 
	var smallBoundingBox = [];

	const axisX = {
		name: '$$x$$',
		withLabel: true,
		label: {
			position: 'rt',
			offset: [5, -13],
			fontSize: 22
		},
		ticks: { visible: false }
	};
	const axisY = {
		withLabel: true,
		name: '$$y$$',
		label: {
			position: 'rt',
			offset: [6, 15],
			fontSize: 22
		},
		ticks: { visible: false }
	};

	var bigBoard = JXG.JSXGraph.initBoard('bigParametricPlot', { 
		defaultAxes: { y: axisY, x: axisX }, 
		boundingbox: borders, registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var graph1 = bigBoard.create('curve', [[0], [0]], { strokeColor: colors[0], strokeWidth: 3 }); 
	var graph2 = bigBoard.create('curve', [[0], [0]], { strokeColor: colors[1], strokeWidth: 3 }); 
	var graph3 = bigBoard.create('curve', [[0], [0]], { strokeColor: colors[2], strokeWidth: 3 }); 
	var graph4 = bigBoard.create('curve', [[0], [0]], { strokeColor: colors[3], strokeWidth: 3 }); 

	var smallBoard = JXG.JSXGraph.initBoard('smallParametricPlot', { 
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } }, 
		registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true }); 
	var subgraph1 = smallBoard.create('curve', [[0], [0]], { strokeColor: colors[0], strokeWidth: 3 }); 
	var subgraph2 = smallBoard.create('curve', [[0], [0]], { strokeColor: colors[1], strokeWidth: 3 }); 
	var subgraph3 = smallBoard.create('curve', [[0], [0]], { strokeColor: colors[2], strokeWidth: 3 }); 
	var subgraph4 = smallBoard.create('curve', [[0], [0]], { strokeColor: colors[3], strokeWidth: 3 }); 
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

	var specialSubPoint1 = smallBoard.create('point', [0, 1], { name: '$$(0,1)$$',
		label: {
			offset: [-5, 2.5],
			anchorX: 'right',
			anchorY: 'bottom',
			fontSize: 14
		},
		style: JXG.POINT_STYLE_X, strokeColor: 'black', fillColor: 'white', size: 3 }
	); 
	var specialSubPoint2 = smallBoard.create('point', [0, 0], { name: '$$(0,0)$$',
		label: {
			offset: [-5, 2.5],
			anchorX: 'right',
			anchorY: 'bottom',
			fontSize: 14
		},
		size: 3, color: '#000' }
	); 
	var specialSubPoint3 = smallBoard.create('point', [0.5291337, 0.6666667], { name: '$$(0.53,0.67)$$',
		label: {
			offset: [-13, 0],
			anchorX: 'right',
			anchorY: 'middle',
			fontSize: 14
		},
		size: 3, color: '#000' }
	); 
	specialSubPoint1.setAttribute({ visible: false }); 
	specialSubPoint2.setAttribute({ visible: false }); 
	specialSubPoint3.setAttribute({ visible: false }); 

	var asymptote = bigBoard.create('functiongraph', [function(x) { return -x + 0.3333333; }], { dash: 3, strokeWidth: 1, strokeColor: '#000' }); 
	var subAsymptote = smallBoard.create('functiongraph', [function(x) { return -x + 0.3333333; }], { dash: 3, strokeWidth: 1, strokeColor: '#000' }); 

	var tangent1 = smallBoard.create('line', [[-0.35, 1], [0, 1]],
		{ straightFirst: false, straightLast: false, strokeColor: colors[0], strokeWidth: 3, dash: 3, layer: 3 }
	); 
	var tangent2 = smallBoard.create('line', [[0, 0], [0.27, 0]],
		{ straightFirst: false, straightLast: false, strokeColor: colors[1], strokeWidth: 3, dash: 3, layer: 3 }
	); 
	var tangent3 = smallBoard.create('line', [[0, 0], [0.27, 0]],
		{ straightFirst: false, straightLast: false, strokeColor: colors[2], strokeWidth: 3, layer: 2 }
	); 
	var tangent4 = smallBoard.create('line', [[0.5291337, 0.3666667], [0.5291337, 0.6666667]],
		{ straightFirst: false, straightLast: false, strokeColor: colors[2], strokeWidth: 3, dash: 3, layer: 3 }
	); 
	var tangent5 = smallBoard.create('line', [[0.5291337, 0.6666667], [0.5291337, 0.9466667]],
		{ straightFirst: false, straightLast: false, strokeColor: colors[3], strokeWidth: 3, dash: 3, layer: 3 }
	); 
	var tangent6 = smallBoard.create('line', [[0.35, 1], [0, 1]],
		{ straightFirst: false, straightLast: false, strokeColor: colors[3], strokeWidth: 3, dash: 3, layer: 3 }
	); 
	tangent1.setAttribute({ visible: false }); 
	tangent2.setAttribute({ visible: false }); 
	tangent3.setAttribute({ visible: false }); 
	tangent4.setAttribute({ visible: false }); 
	tangent5.setAttribute({ visible: false }); 
	tangent6.setAttribute({ visible: false }); 

	var t = 0;
	for (var i = 0; i < 100; i++) 
	{ 
		t = -2 - (100 - i) * 0.2; 
		x1.push(funcX(t)); 
		y1.push(funcY(t)); 

		t = -1 + i / 100.0; 
		x2.push(funcX(t)); 
		y2.push(funcY(t)); 

		t = 1.259921 * i / 100; 
		x3.push(funcX(t)); 
		y3.push(funcY(t)); 

		t = 1.259921 + i / 10.0; 
		x4.push(funcX(t)); 
		y4.push(funcY(t)); 
	} 

	for (var i = 0; i < 100; i++) 
	{ 
		t = -2 + i * 0.01; 
		x1.push(funcX(t)); 
		y1.push(funcY(t)); 
	} 

	x1[0] = 0; 
	y1[0] = 1; 
	t = -2 + 98.5 * 0.01;
	x1[199] = funcX(t);
	y1[199] = funcY(t);

	t = -1 + 2.25 / 100.0;
	x2[0] = funcX(t);
	y2[0] = funcY(t);
	t = -1 + 2.5 / 100.0;
	x2[1] = funcX(t);
	y2[1] = funcY(t);
	t = -1 + 2.75 / 100.0;
	x2[2] = funcX(t);
	y2[2] = funcY(t);

	x4[98] = 0.05; 
	y4[98] = 1; 

	x4[99] = 0; 
	y4[99] = 1; 

	var stepFromPoint = 0.7;
	smallBoard.setBoundingBox([x1[0] - stepFromPoint,
		y1[0] + stepFromPoint,
		x1[0] + stepFromPoint,
		y1[0] - stepFromPoint]
	);

	var topLine = bigBoard.create('line', [[0, 0], [0, 0]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 0.7 }); 
	var bottomLine = bigBoard.create('line', [[0, 0], [0, 0]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 0.7 }); 
	var leftLine = bigBoard.create('line', [[0, 0], [0, 0]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 0.7 }); 
	var rightLine = bigBoard.create('line', [[0, 0], [0, 0]], { straightFirst: false, straightLast: false, strokeColor: '#000', strokeWidth: 0.7 }); 

	smallBoundingBox = [x1[0] - stepFromPoint,
		y1[0] + stepFromPoint,
		x1[0] + stepFromPoint,
		y1[0] - stepFromPoint
	];

	topLine.point1.moveTo([smallBoundingBox[0], smallBoundingBox[1]]);
	topLine.point2.moveTo([smallBoundingBox[2], smallBoundingBox[1]]);

	bottomLine.point1.moveTo([smallBoundingBox[0], smallBoundingBox[3]]);
	bottomLine.point2.moveTo([smallBoundingBox[2], smallBoundingBox[3]]);

	leftLine.point1.moveTo([smallBoundingBox[0], smallBoundingBox[3]]);
	leftLine.point2.moveTo([smallBoundingBox[0], smallBoundingBox[1]]);

	rightLine.point1.moveTo([smallBoundingBox[2], smallBoundingBox[3]]);
	rightLine.point2.moveTo([smallBoundingBox[2], smallBoundingBox[1]]);

	bigBoard.update();
	smallBoard.update();

	subgraph1.updateDataArray = graph1.updateDataArray = function()
	{ 
		var value = slider.value; 

		if (value < 200) 
		{ 
			var dataX = [], dataY = []; 

			for (var i = 0; i <= value; i++) 
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

			for (var i = 200; i <= value; i++) 
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

			for (var i = 300; i <= value; i++) 
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

			for (var i = 400; i <= value; i++) 
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

	// --- подсветка сегментов кривых в таблице --- //
	const shifts = getTableShifts();
	applyStyleToColumn(4, shifts, "text-transparent", "text-visible");
	applyStyleToColumn(5, shifts, "text-transparent", "text-visible");
	applyStyleToColumn(6, shifts, "text-transparent", "text-visible");
	applyStyleToColumn(7, shifts, "text-transparent", "text-visible");
	applyStyleToColumn(8, shifts, "text-transparent", "text-visible");
	applyStyleToColumn(9, shifts, "text-transparent", "text-visible");

	var lastCurve = [1, 2, 3, 1];
	const curve1 = 1;
	const curve2 = 2;
	const curve3 = 3;
	const curve4 = 4;
	const curveNone = 0;
	function showCurrentCurve() {
		var value = slider.value;
		if (value < 200 && lastCurve[3] != curve1) {
			applyStyleForColumns(shifts, lastCurve, 1);
			lastCurve[3] = curve1;
		}
		else if (value >= 200 && value < 300 && lastCurve[3] != curve2) {
			applyStyleForColumns(shifts, lastCurve, 3);
			lastCurve[3] = curve2;
		}
		else if (value >= 300 && value < 400 && lastCurve[3] != curve3) {
			applyStyleForColumns(shifts, lastCurve, 5);
			lastCurve[3] = curve3;
		}
		else if (value >= 400 && lastCurve[3] != curve4) {
			applyStyleForColumns(shifts, lastCurve, 7);
			lastCurve[3] = curve4;
		}
	}

	var updateScheduled = false;
	function scheduleDraw() {
		if (!updateScheduled) {
			updateScheduled = true;
			requestAnimationFrame(() => {
				draw();
				updateScheduled = false;
			});
		}
	}
	function draw() 
	{ 
		bigBoard.suspendUpdate();
		smallBoard.suspendUpdate();

		showCurrentCurve();

		graph1.updateDataArray(); 
		graph2.updateDataArray(); 
		graph3.updateDataArray(); 
		graph4.updateDataArray(); 

		subgraph1.updateDataArray(); 
		subgraph2.updateDataArray(); 
		subgraph3.updateDataArray(); 
		subgraph4.updateDataArray(); 

		var value = slider.value; 

		const n_end1 = 200;
		const n_end2 = 300;
		const n_end3 = 400;
		const n_end4 = 500;
		if (value < n_end1 - 1) 
		{ 
			if (value > 0) 
			{ 
				tangent1.setAttribute({ visible: true }); 
				specialPoint1.setAttribute({ visible: true }); 
				specialSubPoint1.setAttribute({ visible: true }); 

				topLine.setAttribute({ visible: true });
				bottomLine.setAttribute({ visible: true });
				leftLine.setAttribute({ visible: true });
				rightLine.setAttribute({ visible: true });
			} 
			else 
			{ 
				tangent1.setAttribute({ visible: false }); 
				specialPoint1.setAttribute({ visible: false }); 
				specialSubPoint1.setAttribute({ visible: false }); 
			} 

			tangent2.setAttribute({ visible: false }); 
			tangent3.setAttribute({ visible: false }); 
			tangent4.setAttribute({ visible: false }); 
			tangent5.setAttribute({ visible: false }); 
			tangent6.setAttribute({ visible: false }); 

			specialPoint2.setAttribute({ visible: false }); 
			specialPoint3.setAttribute({ visible: false }); 

			specialSubPoint2.setAttribute({ visible: false }); 
			specialSubPoint3.setAttribute({ visible: false }); 

			smallBoard.setBoundingBox([x1[value] - stepFromPoint,
				y1[value] + stepFromPoint,
				x1[value] + stepFromPoint,
				y1[value] - stepFromPoint
			]);
			smallBoundingBox = [x1[value] - stepFromPoint,
				y1[value] + stepFromPoint,
				x1[value] + stepFromPoint,
				y1[value] - stepFromPoint
			];
		} 

		if (value >= n_end1 && value < n_end2) 
		{ 
			tangent1.setAttribute({ visible: true }); 
			if (value > 250) 
				tangent2.setAttribute({ visible: true }); 
			else 
				tangent2.setAttribute({ visible: false }); 
			tangent3.setAttribute({ visible: false }); 
			tangent4.setAttribute({ visible: false }); 
			tangent5.setAttribute({ visible: false }); 
			tangent6.setAttribute({ visible: false }); 

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

			smallBoard.setBoundingBox([x2[value - n_end1] - stepFromPoint,
				y2[value - n_end1] + stepFromPoint,
				x2[value - n_end1] + stepFromPoint,
				y2[value - n_end1] - stepFromPoint
			]);
			smallBoundingBox = [x2[value - n_end1] - stepFromPoint,
				y2[value - n_end1] + stepFromPoint,
				x2[value - n_end1] + stepFromPoint,
				y2[value - n_end1] - stepFromPoint
			]; 
		} 

		if (value >= n_end2 && value < n_end3) 
		{ 
			tangent1.setAttribute({ visible: true }); 
			tangent2.setAttribute({ visible: true }); 
			tangent3.setAttribute({ visible: true }); 
			if (value > 380) 
				tangent4.setAttribute({ visible: true }); 
			else 
				tangent4.setAttribute({ visible: false }); 
			tangent5.setAttribute({ visible: false }); 
			tangent6.setAttribute({ visible: false }); 

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

			smallBoard.setBoundingBox([x3[value - n_end2] - stepFromPoint,
				y3[value - n_end2] + stepFromPoint,
				x3[value - n_end2] + stepFromPoint,
				y3[value - n_end2] - stepFromPoint
			]);
			smallBoundingBox = [x3[value - n_end2] - stepFromPoint,
				y3[value - n_end2] + stepFromPoint,
				x3[value - n_end2] + stepFromPoint,
				y3[value - n_end2] - stepFromPoint
			];
		} 

		if (value >= n_end3 && value < n_end4) 
		{ 
			tangent1.setAttribute({ visible: true }); 
			tangent2.setAttribute({ visible: true }); 
			tangent3.setAttribute({ visible: true }); 
			tangent4.setAttribute({ visible: true }); 
			tangent5.setAttribute({ visible: true }); 
			if (value >= 430) 
				tangent6.setAttribute({ visible: true }); 
			else 
				tangent6.setAttribute({ visible: false }); 

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

			smallBoard.setBoundingBox([x4[value - n_end3] - stepFromPoint,
				y4[value - n_end3] + stepFromPoint,
				x4[value - n_end3] + stepFromPoint,
				y4[value - n_end3] - stepFromPoint
			]);
			smallBoundingBox = [x4[value - n_end3] - stepFromPoint,
				y4[value - n_end3] + stepFromPoint,
				x4[value - n_end3] + stepFromPoint,
				y4[value - n_end3] - stepFromPoint
			];
		} 

		const endIdBounds = 99;
		if (value == 500) 
		{ 
			tangent1.setAttribute({ visible: true }); 
			tangent2.setAttribute({ visible: true }); 
			tangent3.setAttribute({ visible: true }); 
			tangent4.setAttribute({ visible: true }); 
			tangent5.setAttribute({ visible: true }); 
			tangent6.setAttribute({ visible: true }); 

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

			smallBoard.setBoundingBox([x4[endIdBounds] - stepFromPoint,
				y4[endIdBounds] + stepFromPoint,
				x4[endIdBounds] + stepFromPoint,
				y4[endIdBounds] - stepFromPoint
			]);
			smallBoundingBox = [x4[endIdBounds] - stepFromPoint,
				y4[endIdBounds] + stepFromPoint,
				x4[endIdBounds] + stepFromPoint,
				y4[endIdBounds] - stepFromPoint
			];
		}

		topLine.point1.moveTo([smallBoundingBox[0], smallBoundingBox[1]]);
		topLine.point2.moveTo([smallBoundingBox[2], smallBoundingBox[1]]);

		bottomLine.point1.moveTo([smallBoundingBox[0], smallBoundingBox[3]]);
		bottomLine.point2.moveTo([smallBoundingBox[2], smallBoundingBox[3]]);

		leftLine.point1.moveTo([smallBoundingBox[0], smallBoundingBox[3]]);
		leftLine.point2.moveTo([smallBoundingBox[0], smallBoundingBox[1]]);

		rightLine.point1.moveTo([smallBoundingBox[2], smallBoundingBox[3]]);
	  	rightLine.point2.moveTo([smallBoundingBox[2], smallBoundingBox[1]]);

		bigBoard.unsuspendUpdate();
		smallBoard.unsuspendUpdate();
	} 

	$(window).resize(function() { 
		bigBoard.resizeContainer($('#bigParametricPlot').width(), $('#bigParametricPlot').height(), true, true); 
		bigBoard.setBoundingBox(borders, false); 

		smallBoard.resizeContainer($('#smallParametricPlot').width(), $('#smallParametricPlot').height(), true, true); 
		smallBoard.setBoundingBox(smallBoundingBox, false); 
	}); 
}

//---------------------------parametric-example-2---------------------------//

else if (document.title == "Пример 2. Построение графиков функций и кривых. Параметрическое задание.")
{
	function funcX(t) {
		return (t * t) / (1 - t);
	}
	function funcY(t) {
		return (t * t * t) / (1 - t * t);
	}

	const PI = Math.PI;
	const sqrt3 = Math.sqrt(3);
	var borderValue = 8;
	var borders = [-borderValue, borderValue, borderValue, -borderValue];
	var smallBoundingBox = [];

	var colors = [
		'#1e28ff',
		'#ff0000',
		'#9900ff',
		'#00eb00',
		'#ffa600',
		'#00ebf3',
		'#f300be'
	]

	var colorForText = '#000';
	var colorForPoints = '#000';
	var colorForAsymptotes = '#000';
	var colorForLines = '#000';

	var slider = document.getElementById('tSliderExample3BigBoard');
	var textAsymptote1 = document.getElementById('textAsymptote1');
	var textAsymptote2 = document.getElementById('textAsymptote2');
	var textAsymptote3 = document.getElementById('textAsymptote3');
	var textAsymptote4 = document.getElementById('textAsymptote4');

	const axisX = {
		name: '$$x$$',
		withLabel: true,
		label: {
			position: 'rt',
			offset: [5, -13],
			fontSize: 22
		},
		ticks: { visible: false }
	};
	const axisY = {
		withLabel: true,
		name: '$$y$$',
		label: {
			position: 'rt',
			offset: [6, 15],
			fontSize: 22
		},
		ticks: { visible: false }
	};
	var bigBoard = JXG.JSXGraph.initBoard('bigParametricPlot', {
		defaultAxes: { y: axisY, x: axisX },
		boundingbox: borders,
		registerEvents: false,
		showNavigation: false,
		showCopyright: false,
		axis: true,
		grid: true
	});
	var smallBoard = JXG.JSXGraph.initBoard('smallParametricPlot', {
		defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
		registerEvents: false,
		showNavigation: false,
		showCopyright: false,
		axis: true,
		grid: true
	});

	// --- добавление кривых на графики --- //
	var bigBoardGraphs = [];
	colors.forEach(color => {
		var graph = bigBoard.create('curve', [[0], [0]], { strokeColor: color, strokeWidth: 3 });
		bigBoardGraphs.push(graph);
	});
	var subGraphs = [];
	colors.forEach(color => {
		var graph = smallBoard.create('curve', [[0], [0]], { strokeColor: color, strokeWidth: 3 });
		subGraphs.push(graph);
	});

	// --- особые точки --- //
	//SB - smallBoard
	const mapSpecialPointsSB = new Map();
	//BB - bigBoard
	const mapSpecialPointsBB = new Map();
	const specialPoints = [
		[ "firstSP", 1.098, 2.598 ],
		[ "secondSP", 0, 0 ],
		[ "thirdSP", -4.098, -2.598 ],
		[ "fourthSP", -4, -2.667 ]
	];
	specialPoints.forEach(([id, x, y]) => {
		var point = smallBoard.create('point', [x, y], { name: `$$(${x},${y})$$`,
			label: {
				offset: [0, 18],
				anchorX: 'middle',
				anchorY: 'middle',
				fontSize: 14
			},
			size: 3, color: colorForPoints, visible: false
		});
		mapSpecialPointsSB.set(id, point);
		point = bigBoard.create('point', [x, y], { name: "",
			size: 3, color: colorForPoints, visible: false
		});
		mapSpecialPointsBB.set(id, point);
	});
	mapSpecialPointsBB.get("firstSP").setAttribute({ visible: true });
	mapSpecialPointsSB.get("firstSP").setAttribute({ visible: true });
	mapSpecialPointsSB.get("fourthSP").label.setAttribute({
		offset: [13, 0],
		anchorX: 'left',
	});
	mapSpecialPointsSB.get("secondSP").label.setAttribute({
		offset: [-5, 2.5],
		anchorX: 'right',
		anchorY: 'bottom'
	});

	// --- сегменты асимптот --- //
	var widthForAsymptotes = 2.5;
	var opacityForAsymptotes = 0.2;
	var opacityForAsymptotesVisible = 1;
	const asymptoteBase = {
		dash: 3,
		strokeWidth: widthForAsymptotes,
		strokeColor: colorForAsymptotes,
		strokeOpacity: opacityForAsymptotes
	};

	var edgeX = 80;
	var asymptotesBigBoard = new Map();
	var asymptotesSmallBoard = new Map();
	const verticalSegments = [
		[ 'thirdSegment', 0.5, -edgeX, -4 ],
		[ '', 0.5, -4, 4 ],
		[ 'secondSegment', 0.5, 4, edgeX ],
	];
	verticalSegments.forEach(([id, x, y1, y2]) => {
		var bigBoardAsymptote = bigBoard.create('segment', [[x, y1], [x, y2]], {
			...asymptoteBase
		});
		if (id != '') asymptotesBigBoard.set(id, bigBoardAsymptote);
		var smallBoardAsymptote = smallBoard.create('segment', [[x, y1], [x, y2]], {
			...asymptoteBase
		});
		if (id != '') asymptotesSmallBoard.set(id, smallBoardAsymptote);
	});
	const funcSegments = [
		[ 'sixthSegment', { f: x => x + 1, start: -edgeX, end: -5 } ],
		[ '', { f: x => x + 1, start: -5, end: 3 } ],
		[ 'firstSegment', { f: x => x + 1, start: 3, end: edgeX } ],
		[ 'fifthSegment', { f: x => x / 2 - 1 / 4, start: -edgeX, end: -5 } ],
		[ '', { f: x => x / 2 - 1 / 4, start: -5, end: 3 } ],
		[ 'fourthSegment', { f: x => x / 2 - 1 / 4, start: 3, end: edgeX } ],
	];
	funcSegments.forEach(([id, { f, start, end }]) => {
		var bigBoardAsymptote = bigBoard.create('functiongraph', [f, start, end], {
			...asymptoteBase
		});
		if (id != '') asymptotesBigBoard.set(id, bigBoardAsymptote);
		var smallBoardAsymptote = smallBoard.create('functiongraph', [f, start, end], {
			...asymptoteBase
		});
		if (id != '') asymptotesSmallBoard.set(id, smallBoardAsymptote);
	});
	asymptotesBigBoard.get('firstSegment').setAttribute({
		opacity: opacityForAsymptotesVisible
	});
	asymptotesSmallBoard.get('firstSegment').setAttribute({
		opacity: opacityForAsymptotesVisible
	});

	// --- tangent --- //
	const stepOfTangent = 0.2;
	var valuesForTangents = [
		[funcX(-sqrt3), funcY(-sqrt3)],
		[funcX(0), funcY(0)],
		[funcX(sqrt3), funcY(sqrt3)],
		[funcX(2), funcY(2)]
	]
	var prepTangents = [
		['tan1', [[valuesForTangents[0][0], valuesForTangents[0][1]], [valuesForTangents[0][0] + stepOfTangent, valuesForTangents[0][1]]], colors[0]],
		['tan2', [[valuesForTangents[0][0] - stepOfTangent, valuesForTangents[0][1]], [valuesForTangents[0][0], valuesForTangents[0][1]]], colors[1]],
		['tan3', [[valuesForTangents[1][0], valuesForTangents[1][1]], [valuesForTangents[1][0] + stepOfTangent, valuesForTangents[1][1]]], colors[2]],
		['tan4', [[valuesForTangents[1][0], valuesForTangents[1][1]], [valuesForTangents[1][0] + stepOfTangent, valuesForTangents[1][1]]], colors[3]],
		['tan5', [[valuesForTangents[2][0] - stepOfTangent, valuesForTangents[2][1]], [valuesForTangents[2][0], valuesForTangents[2][1]]], colors[4]],
		['tan6', [[valuesForTangents[2][0], valuesForTangents[2][1]], [valuesForTangents[2][0] + stepOfTangent, valuesForTangents[2][1]]], colors[5]],
		['tan7', [[valuesForTangents[3][0], valuesForTangents[3][1] + stepOfTangent], [valuesForTangents[3][0], valuesForTangents[3][1]]], colors[5]],
		['tan8', [[valuesForTangents[3][0], valuesForTangents[3][1]], [valuesForTangents[3][0], valuesForTangents[3][1] - stepOfTangent]], colors[6]],
	]
	var tangents = new Map();
	prepTangents.forEach(([id, coords, color]) => {
		var tangent = smallBoard.create('segment', coords, { strokeColor: color, strokeWidth: 3, dash: 3, layer: 3, visible: false });
		tangents.set(id, tangent);
	});
	tangents.get('tan4').setAttribute({ dash: 0, layer: 2 });

	// --- подготовка точек --- //
	var x1 = [], y1 = [];
	var x2 = [], y2 = [];
	var x3 = [], y3 = [];
	var x4 = [], y4 = [];
	var x5 = [], y5 = [];
	var x6 = [], y6 = [];
	var x7 = [], y7 = [];

	var n1 = 150;
	var n2 = 100;
	var n3 = 100;
	var n4 = 100;
	var n4_denominator = n4 + 5;
	var n5 = 95;
	var n5_end = 100;
	var n6 = 25;
	var n7 = 125;
	for (var i = 0; i < n1; i++)
	{
		var t = -borderValue + i * (-sqrt3 + borderValue) / n1;
		x1.push(funcX(t));
		y1.push(funcY(t));
	}
	for (var i = 0; i < n2; i++)
	{
		t = -sqrt3 + i * (-1 + sqrt3) / n2;
		x2.push(funcX(t));
		y2.push(funcY(t));
	}
	for (var i = 1; i <= n3; i++)
	{
		t = -1 + i / n3;
		x3.push(funcX(t));
		y3.push(funcY(t));
	}
	for (var i = 0; i < n4; i++)
	{
		t = i / n4_denominator;
		x4.push(funcX(t));
		y4.push(funcY(t));
	}
	for (var i = 5; i < n5_end; i++)
	{
		t = 1 + i * (sqrt3 - 1) / n5_end;
		x5.push(funcX(t));
		y5.push(funcY(t));
	}
	for (var i = 0; i < n6; i++)
	{
		t = sqrt3 + i * (2 - sqrt3) / (n6 - 1);
		x6.push(funcX(t));
		y6.push(funcY(t));
	}
	for (var i = 0; i < n7; i++)
	{
		t = 2 + i * (borderValue - 2) / n7;
		x7.push(funcX(t));
		y7.push(funcY(t));
	}
	x1[n1 - 1] = x2[0];
	y1[n1 - 1] = y2[0];
	x5[n1 - 1] = x6[0];
	y5[n1 - 1] = y6[0];

	// --- область увеличенного построения на основном графике --- //
	var topLine = bigBoard.create('line', [[-0.35, 1.35], [0.35, 1.35]], { straightFirst: false, straightLast: false, strokeColor: colorForLines, strokeWidth: 0.7 });
	var bottomLine = bigBoard.create('line', [[-0.35, 0.65], [0.35, 0.65]], { straightFirst: false, straightLast: false, strokeColor: colorForLines, strokeWidth: 0.7 });
	var leftLine = bigBoard.create('line', [[-0.35, 0.65], [-0.35, 1.35]], { straightFirst: false, straightLast: false, strokeColor: colorForLines, strokeWidth: 0.7 });
	var rightLine = bigBoard.create('line', [[0.35, 0.65], [0.35, 1.35]], { straightFirst: false, straightLast: false, strokeColor: colorForLines, strokeWidth: 0.7 });

	var startIdBounds = 17;
	var stepFromPoint = 0.7;
	smallBoard.setBoundingBox([x1[startIdBounds] - stepFromPoint,
		y1[startIdBounds] + stepFromPoint,
		x1[startIdBounds] + stepFromPoint,
		y1[startIdBounds] - stepFromPoint]
	);
	smallBoundingBox = [x1[startIdBounds] - stepFromPoint,
		y1[startIdBounds] + stepFromPoint,
		x1[startIdBounds] + stepFromPoint,
		y1[startIdBounds] - stepFromPoint
	];

	topLine.point1.moveTo([smallBoundingBox[0], smallBoundingBox[1]]);
	topLine.point2.moveTo([smallBoundingBox[2], smallBoundingBox[1]]);

	bottomLine.point1.moveTo([smallBoundingBox[0], smallBoundingBox[3]]);
	bottomLine.point2.moveTo([smallBoundingBox[2], smallBoundingBox[3]]);

	leftLine.point1.moveTo([smallBoundingBox[0], smallBoundingBox[3]]);
	leftLine.point2.moveTo([smallBoundingBox[0], smallBoundingBox[1]]);

	rightLine.point1.moveTo([smallBoundingBox[2], smallBoundingBox[3]]);
	rightLine.point2.moveTo([smallBoundingBox[2], smallBoundingBox[1]]);

	bigBoard.update();
	smallBoard.update();

	// --- подготовка для подсветки веток в таблице --- //
	const shifts = getTableShifts();
	applyStyleToColumn(4, shifts, "text-transparent", "text-visible");
	applyStyleToColumn(5, shifts, "text-transparent", "text-visible");
	applyStyleToColumn(6, shifts, "text-transparent", "text-visible");
	applyStyleToColumn(7, shifts, "text-transparent", "text-visible");
	applyStyleToColumn(8, shifts, "text-transparent", "text-visible");
	applyStyleToColumn(9, shifts, "text-transparent", "text-visible");
	applyStyleToColumn(10, shifts, "text-transparent", "text-visible");
	applyStyleToColumn(11, shifts, "text-transparent", "text-visible");
	applyStyleToColumn(12, shifts, "text-transparent", "text-visible");
	applyStyleToColumn(13, shifts, "text-transparent", "text-visible");
	applyStyleToColumn(14, shifts, "text-transparent", "text-visible");
	applyStyleToColumn(15, shifts, "text-transparent", "text-visible");

	var i_start2 = n1;
	var i_start3 = i_start2 + n2;
	var i_start4 = i_start3 + n3;
	var i_start5 = i_start4 + n4;
	var i_start6 = i_start5 + n5;
	var i_start7 = i_start6 + n6;
	var i_start8 = i_start7 + n7;

	var lastCurve = [1, 2, 3, 1];
	const curve1 = 1;
	const curve2 = 2;
	const curve3 = 3;
	const curve4 = 4;
	const curve5 = 5;
	const curve6 = 6;
	const curve7 = 7;
	function showCurrentCurve() {
		var value = slider.value;
		if (value < i_start2 && lastCurve[3] != curve1) {
			applyStyleForColumns(shifts, lastCurve, 1);
			lastCurve[3] = curve1;
		}
		else if (value >= i_start2 && value < i_start3 && lastCurve[3] != curve2) {
			applyStyleForColumns(shifts, lastCurve, 3);
			lastCurve[3] = curve2;
		}
		else if (value >= i_start3 && value < i_start4 && lastCurve[3] != curve3) {
			applyStyleForColumns(shifts, lastCurve, 5);
			lastCurve[3] = curve3;
		}
		else if (value >= i_start4 && value < i_start5 && lastCurve[3] != curve4) {
			applyStyleForColumns(shifts, lastCurve, 7);
			lastCurve[3] = curve4;
		}
		else if (value >= i_start5 && value < i_start6 && lastCurve[3] != curve5) {
			applyStyleForColumns(shifts, lastCurve, 9);
			lastCurve[3] = curve5;
		}
		else if (value >= i_start6 && value < i_start7 && lastCurve[3] != curve6) {
			applyStyleForColumns(shifts, lastCurve, 11);
			lastCurve[3] = curve6;
		}
		else if (value >= i_start7 && lastCurve[3] != curve7) {
			applyStyleForColumns(shifts, lastCurve, 13);
			lastCurve[3] = curve7;
		}
	}

	subGraphs[0].updateDataArray = bigBoardGraphs[0].updateDataArray = function()
	{
		var i_end = i_start2;
		var value = slider.value;

		if (value < i_end)
		{
			var dataX = [], dataY = [];
			for (var i = 0; i <= value; i++)
			{
				dataX.push(x1[i]);
				dataY.push(y1[i]);
			}
			this.dataX = dataX;
			this.dataY = dataY;

			applyOpacityAsymptoteBigAndSmallBoards(asymptotesBigBoard,
				asymptotesSmallBoard,
				'firstSegment',
				opacityForAsymptotesVisible
			);
			setNormalTextAsymptote(textAsymptote1);

			return;
		}
		else
		{
			this.dataX = x1;
			this.dataY = y1;
		}

		applyOpacityAsymptoteBigAndSmallBoards(asymptotesBigBoard,
			asymptotesSmallBoard,
			'firstSegment',
			opacityForAsymptotes
		);
		setBoldTextAsymptote(textAsymptote1);
	}

	subGraphs[1].updateDataArray = bigBoardGraphs[1].updateDataArray = function()
	{
		var i_start = i_start2;
		var i_end = i_start3;
		var value = slider.value;

		if (value >= i_start && value < i_end)
		{
			var dataX = [], dataY = [];
			for (var i = i_start; i <= value; i++)
			{
				dataX.push(x2[i - i_start]);
				dataY.push(y2[i - i_start]);
			}
			this.dataX = dataX;
			this.dataY = dataY;

			applyOpacityAsymptoteBigAndSmallBoards(asymptotesBigBoard,
				asymptotesSmallBoard,
				'secondSegment',
				opacityForAsymptotesVisible
			);
			setNormalTextAsymptote(textAsymptote2);

			return;
		}
		else if (value >= i_end)
		{
			this.dataX = x2;
			this.dataY = y2;
		}
		else
		{
			this.dataX = [];
			this.dataY = [];
		}

		applyOpacityAsymptoteBigAndSmallBoards(asymptotesBigBoard,
			asymptotesSmallBoard,
			'secondSegment',
			opacityForAsymptotes
		);
		setBoldTextAsymptote(textAsymptote2);
	}

	subGraphs[2].updateDataArray = bigBoardGraphs[2].updateDataArray = function()
	{
		var i_start = i_start3;
		var i_end = i_start4;
		var value = slider.value;

		if (value >= i_start && value < i_end)
		{
			var dataX = [], dataY = [];
			for (var i = i_start; i <= value; i++)
			{
				dataX.push(x3[i - i_start]);
				dataY.push(y3[i - i_start]);
			}
			this.dataX = dataX;
			this.dataY = dataY;

			applyOpacityAsymptoteBigAndSmallBoards(asymptotesBigBoard,
				asymptotesSmallBoard,
				'thirdSegment',
				opacityForAsymptotesVisible
			);
			setNormalTextAsymptote(textAsymptote2);

			return;
		}
		else if (value >= i_end)
		{
			this.dataX = x3;
			this.dataY = y3;
			setBoldTextAsymptote(textAsymptote2);
		}
		else
		{
			this.dataX = [];
			this.dataY = [];
		}

		applyOpacityAsymptoteBigAndSmallBoards(asymptotesBigBoard,
			asymptotesSmallBoard,
			'thirdSegment',
			opacityForAsymptotes
		);
	}

	subGraphs[3].updateDataArray = bigBoardGraphs[3].updateDataArray = function()
	{
		var i_start = i_start4;
		var i_end = i_start5;
		var value = slider.value;

		if (value >= i_start && value < i_end)
		{
			var dataX = [], dataY = [];
			for (var i = i_start; i <= value; i++)
			{
				dataX.push(x4[i - i_start]);
				dataY.push(y4[i - i_start]);
			}
			this.dataX = dataX;
			this.dataY = dataY;

			applyOpacityAsymptoteBigAndSmallBoards(asymptotesBigBoard,
				asymptotesSmallBoard,
				'fourthSegment',
				opacityForAsymptotesVisible
			);
			setNormalTextAsymptote(textAsymptote3);

			return;
		}
		else if (value >= i_end)
		{
			this.dataX = x4;
			this.dataY = y4;
		}
		else
		{
			this.dataX = [];
			this.dataY = [];
			setBoldTextAsymptote(textAsymptote3);
		}

		applyOpacityAsymptoteBigAndSmallBoards(asymptotesBigBoard,
			asymptotesSmallBoard,
			'fourthSegment',
			opacityForAsymptotes
		);
	}

	subGraphs[4].updateDataArray = bigBoardGraphs[4].updateDataArray = function()
	{
		var i_start = i_start5;
		var i_end = i_start6;
		var value = slider.value;

		if (value >= i_start && value < i_end)
		{
			var dataX = [], dataY = [];
			for (var i = i_start; i <= value; i++)
			{
				dataX.push(x5[i - i_start]);
				dataY.push(y5[i - i_start]);
			}
			this.dataX = dataX;
			this.dataY = dataY;

			applyOpacityAsymptoteBigAndSmallBoards(asymptotesBigBoard,
				asymptotesSmallBoard,
				'fifthSegment',
				opacityForAsymptotesVisible
			);
			setNormalTextAsymptote(textAsymptote3);

			return;
		}
		else if (value >= i_end)
		{
			this.dataX = x5;
			this.dataY = y5;
			setBoldTextAsymptote(textAsymptote3);
		}
		else
		{
			this.dataX = [];
			this.dataY = [];
		}

		applyOpacityAsymptoteBigAndSmallBoards(asymptotesBigBoard,
			asymptotesSmallBoard,
			'fifthSegment',
			opacityForAsymptotes
		);
	}

	subGraphs[5].updateDataArray = bigBoardGraphs[5].updateDataArray = function()
	{
		var i_start = i_start6;
		var i_end = i_start7;
		var value = slider.value;

		if (value >= i_start && value < i_end)
		{
			var dataX = [], dataY = [];
			for (var i = i_start; i <= value; i++)
			{
				dataX.push(x6[i - i_start]);
				dataY.push(y6[i - i_start]);
			}
			this.dataX = dataX;
			this.dataY = dataY;
		}
		else if (value >= i_end)
		{
			this.dataX = x6;
			this.dataY = y6;
		}
		else
		{
			this.dataX = [];
			this.dataY = [];
		}
	}

	subGraphs[6].updateDataArray = bigBoardGraphs[6].updateDataArray = function()
	{
		var i_start = i_start7;
		var i_end = i_start8;
		var value = slider.value;

		if (value >= i_start && value < i_end)
		{
			var dataX = [], dataY = [];
			for (var i = i_start; i <= value; i++)
			{
				dataX.push(x7[i - i_start]);
				dataY.push(y7[i - i_start]);
			}
			this.dataX = dataX;
			this.dataY = dataY;

			applyOpacityAsymptoteBigAndSmallBoards(asymptotesBigBoard,
				asymptotesSmallBoard,
				'sixthSegment',
				opacityForAsymptotesVisible
			);
			setNormalTextAsymptote(textAsymptote4);

			return;
		}
		else if (value >= i_end)
		{
			this.dataX = x7;
			this.dataY = y7;
		}
		else
		{
			this.dataX = [];
			this.dataY = [];
		}

		applyOpacityAsymptoteBigAndSmallBoards(asymptotesBigBoard,
			asymptotesSmallBoard,
			'sixthSegment',
			opacityForAsymptotes
		);
		setBoldTextAsymptote(textAsymptote4);
	}

	var updateScheduled = false;
	function scheduleDraw() {
		if (!updateScheduled) {
			updateScheduled = true;
			requestAnimationFrame(() => {
				draw();
				updateScheduled = false;
			});
		}
	}
	function draw()
	{
		bigBoard.suspendUpdate();
		smallBoard.suspendUpdate();

		showCurrentCurve();

		bigBoardGraphs[0].updateDataArray();
		bigBoardGraphs[1].updateDataArray();
		bigBoardGraphs[2].updateDataArray();
		bigBoardGraphs[3].updateDataArray();
		bigBoardGraphs[4].updateDataArray();
		bigBoardGraphs[5].updateDataArray();
		bigBoardGraphs[6].updateDataArray();

		subGraphs[0].updateDataArray();
		subGraphs[1].updateDataArray();
		subGraphs[2].updateDataArray();
		subGraphs[3].updateDataArray();
		subGraphs[4].updateDataArray();
		subGraphs[5].updateDataArray();
		subGraphs[6].updateDataArray();

		var value = slider.value;
		var n_end1 = i_start2;
		var n_end2 = i_start3;
		var n_end3 = i_start4;
		var n_end4 = i_start5;
		var n_end5 = i_start6;
		var n_end6 = i_start7;
		var n_end7 = i_start8;
		if (value < n_end1)
		{
			if (value <= startIdBounds)
			{
				smallBoard.setBoundingBox([x1[startIdBounds] - stepFromPoint,
					y1[startIdBounds] + stepFromPoint,
					x1[startIdBounds] + stepFromPoint,
					y1[startIdBounds] - stepFromPoint]
				);
				smallBoundingBox = [x1[startIdBounds] - stepFromPoint,
					y1[startIdBounds] + stepFromPoint,
					x1[startIdBounds] + stepFromPoint,
					y1[startIdBounds] - stepFromPoint
				];
			}
			else
			{
				topLine.setAttribute({ visible: true });
				bottomLine.setAttribute({ visible: true });
				leftLine.setAttribute({ visible: true });
				rightLine.setAttribute({ visible: true });

				smallBoard.setBoundingBox([x1[value] - stepFromPoint,
					y1[value] + stepFromPoint,
					x1[value] + stepFromPoint,
					y1[value] - stepFromPoint
				]);
				smallBoundingBox = [x1[value] - stepFromPoint,
					y1[value] + stepFromPoint,
					x1[value] + stepFromPoint,
					y1[value] - stepFromPoint
				];
			}

			mapSpecialPointsBB.get("secondSP").setAttribute({ visible: false });
			mapSpecialPointsBB.get("thirdSP").setAttribute({ visible: false });
			mapSpecialPointsBB.get("fourthSP").setAttribute({ visible: false });

			if (value >= n_end1 - 10) tangents.get('tan1').setAttribute({ visible: true });
			else tangents.get('tan1').setAttribute({ visible: false });
			tangents.get('tan2').setAttribute({ visible: false });
		}
		if (value >= n_end1 && value < n_end2 - 1)
		{
			topLine.setAttribute({ visible: true });
			bottomLine.setAttribute({ visible: true });
			leftLine.setAttribute({ visible: true });
			rightLine.setAttribute({ visible: true });

			mapSpecialPointsBB.get("secondSP").setAttribute({ visible: false });
			mapSpecialPointsBB.get("thirdSP").setAttribute({ visible: false });
			mapSpecialPointsBB.get("fourthSP").setAttribute({ visible: false });

			tangents.get('tan1').setAttribute({ visible: true });
			tangents.get('tan2').setAttribute({ visible: true });

			smallBoard.setBoundingBox([x2[value - n_end1] - stepFromPoint,
				y2[value - n_end1] + stepFromPoint,
				x2[value - n_end1] + stepFromPoint,
				y2[value - n_end1] - stepFromPoint
			]);
			smallBoundingBox = [x2[value - n_end1] - stepFromPoint,
				y2[value - n_end1] + stepFromPoint,
				x2[value - n_end1] + stepFromPoint,
				y2[value - n_end1] - stepFromPoint
			];
		}
		if (value >= n_end2 && value < n_end3)
		{
			topLine.setAttribute({ visible: true });
			bottomLine.setAttribute({ visible: true });
			leftLine.setAttribute({ visible: true });
			rightLine.setAttribute({ visible: true });

			mapSpecialPointsBB.get("secondSP").setAttribute({ visible: true });
			mapSpecialPointsBB.get("thirdSP").setAttribute({ visible: false });
			mapSpecialPointsBB.get("fourthSP").setAttribute({ visible: false });

			mapSpecialPointsSB.get("secondSP").setAttribute({ visible: true });

			if (value >= n_end3 - 50) tangents.get('tan3').setAttribute({ visible: true });
			else tangents.get('tan3').setAttribute({ visible: false });
			tangents.get('tan4').setAttribute({ visible: false });

			smallBoard.setBoundingBox([x3[value - n_end2] - stepFromPoint,
				y3[value - n_end2] + stepFromPoint,
				x3[value - n_end2] + stepFromPoint,
				y3[value - n_end2] - stepFromPoint
			]);
			smallBoundingBox = [x3[value - n_end2] - stepFromPoint,
				y3[value - n_end2] + stepFromPoint,
				x3[value - n_end2] + stepFromPoint,
				y3[value - n_end2] - stepFromPoint
			];
		}
		if (value >= n_end3 && value < n_end4 - 1)
		{
			topLine.setAttribute({ visible: true });
			bottomLine.setAttribute({ visible: true });
			leftLine.setAttribute({ visible: true });
			rightLine.setAttribute({ visible: true });

			mapSpecialPointsBB.get("secondSP").setAttribute({ visible: true });
			mapSpecialPointsBB.get("thirdSP").setAttribute({ visible: false });
			mapSpecialPointsBB.get("fourthSP").setAttribute({ visible: false });

			mapSpecialPointsSB.get("secondSP").setAttribute({ visible: true });

			tangents.get('tan3').setAttribute({ visible: true });
			tangents.get('tan4').setAttribute({ visible: true });

			smallBoard.setBoundingBox([x4[value - n_end3] - stepFromPoint,
				y4[value - n_end3] + stepFromPoint,
				x4[value - n_end3] + stepFromPoint,
				y4[value - n_end3] - stepFromPoint
			]);
			smallBoundingBox = [x4[value - n_end3] - stepFromPoint,
				y4[value - n_end3] + stepFromPoint,
				x4[value - n_end3] + stepFromPoint,
				y4[value - n_end3] - stepFromPoint
			];
		}
		if (value >= n_end4 && value < n_end5)
		{
			topLine.setAttribute({ visible: true });
			bottomLine.setAttribute({ visible: true });
			leftLine.setAttribute({ visible: true });
			rightLine.setAttribute({ visible: true });

			mapSpecialPointsBB.get("secondSP").setAttribute({ visible: true });
			mapSpecialPointsBB.get("thirdSP").setAttribute({ visible: true });
			mapSpecialPointsBB.get("fourthSP").setAttribute({ visible: false });

			mapSpecialPointsSB.get("thirdSP").setAttribute({ visible: true });
			mapSpecialPointsSB.get("fourthSP").setAttribute({ visible: false });

			if (value >= n_end5 - 20) tangents.get('tan5').setAttribute({ visible: true });
			else tangents.get('tan5').setAttribute({ visible: false });
			tangents.get('tan6').setAttribute({ visible: false });
			tangents.get('tan7').setAttribute({ visible: false });
			tangents.get('tan8').setAttribute({ visible: false });

			smallBoard.setBoundingBox([x5[value - n_end4] - stepFromPoint,
				y5[value - n_end4] + stepFromPoint,
				x5[value - n_end4] + stepFromPoint,
				y5[value - n_end4] - stepFromPoint
			]);
			smallBoundingBox = [x5[value - n_end4] - stepFromPoint,
				y5[value - n_end4] + stepFromPoint,
				x5[value - n_end4] + stepFromPoint,
				y5[value - n_end4] - stepFromPoint
			];
		}
		if (value >= n_end5 && value < n_end6)
		{
			topLine.setAttribute({ visible: true });
			bottomLine.setAttribute({ visible: true });
			leftLine.setAttribute({ visible: true });
			rightLine.setAttribute({ visible: true });

			mapSpecialPointsBB.get("secondSP").setAttribute({ visible: true });
			mapSpecialPointsBB.get("thirdSP").setAttribute({ visible: true });
			mapSpecialPointsBB.get("fourthSP").setAttribute({ visible: true });

			mapSpecialPointsSB.get("thirdSP").setAttribute({ visible: true });
			mapSpecialPointsSB.get("fourthSP").setAttribute({ visible: true });

			tangents.get('tan5').setAttribute({ visible: true });
			tangents.get('tan6').setAttribute({ visible: true });
			if (value >= n_end6 - 15) tangents.get('tan7').setAttribute({ visible: true });
			else tangents.get('tan7').setAttribute({ visible: false });
			tangents.get('tan8').setAttribute({ visible: false });

			smallBoard.setBoundingBox([x6[value - n_end5] - stepFromPoint,
				y6[value - n_end5] + stepFromPoint,
				x6[value - n_end5] + stepFromPoint,
				y6[value - n_end5] - stepFromPoint
			]);
			smallBoundingBox = [x6[value - n_end5] - stepFromPoint,
				y6[value - n_end5] + stepFromPoint,
				x6[value - n_end5] + stepFromPoint,
				y6[value - n_end5] - stepFromPoint
			];
		}
		const endIdBounds = n7 - 16;
		if (value >= n_end6)
		{
			topLine.setAttribute({ visible: true });
			bottomLine.setAttribute({ visible: true });
			leftLine.setAttribute({ visible: true });
			rightLine.setAttribute({ visible: true });

			mapSpecialPointsBB.get("secondSP").setAttribute({ visible: true });
			mapSpecialPointsBB.get("thirdSP").setAttribute({ visible: true });
			mapSpecialPointsBB.get("fourthSP").setAttribute({ visible: true });

			mapSpecialPointsSB.get("thirdSP").setAttribute({ visible: true });
			mapSpecialPointsSB.get("fourthSP").setAttribute({ visible: true });

			tangents.get('tan5').setAttribute({ visible: true });
			tangents.get('tan6').setAttribute({ visible: true });
			tangents.get('tan7').setAttribute({ visible: true });
			tangents.get('tan8').setAttribute({ visible: true });			

			if (value - n_end6 >= endIdBounds)
			{
				smallBoard.setBoundingBox([x7[endIdBounds] - stepFromPoint,
					y7[endIdBounds] + stepFromPoint,
					x7[endIdBounds] + stepFromPoint,
					y7[endIdBounds] - stepFromPoint
				]);
				smallBoundingBox = [x7[endIdBounds] - stepFromPoint,
					y7[endIdBounds] + stepFromPoint,
					x7[endIdBounds] + stepFromPoint,
					y7[endIdBounds] - stepFromPoint
				];
			}
			else
			{
				smallBoard.setBoundingBox([x7[value - n_end6] - stepFromPoint,
					y7[value - n_end6] + stepFromPoint,
					x7[value - n_end6] + stepFromPoint,
					y7[value - n_end6] - stepFromPoint
				]);
				smallBoundingBox = [x7[value - n_end6] - stepFromPoint,
					y7[value - n_end6] + stepFromPoint,
					x7[value - n_end6] + stepFromPoint,
					y7[value - n_end6] - stepFromPoint
				];
			}
		}

		topLine.point1.moveTo([smallBoundingBox[0], smallBoundingBox[1]]);
		topLine.point2.moveTo([smallBoundingBox[2], smallBoundingBox[1]]);

		bottomLine.point1.moveTo([smallBoundingBox[0], smallBoundingBox[3]]);
		bottomLine.point2.moveTo([smallBoundingBox[2], smallBoundingBox[3]]);

		leftLine.point1.moveTo([smallBoundingBox[0], smallBoundingBox[3]]);
		leftLine.point2.moveTo([smallBoundingBox[0], smallBoundingBox[1]]);

		rightLine.point1.moveTo([smallBoundingBox[2], smallBoundingBox[3]]);
	  	rightLine.point2.moveTo([smallBoundingBox[2], smallBoundingBox[1]]);

		bigBoard.unsuspendUpdate();
		smallBoard.unsuspendUpdate();
	}

	$(window).resize(function() {
		bigBoard.resizeContainer($('#bigParametricPlot').width(), $('#bigParametricPlot').height(), true, true);
		bigBoard.setBoundingBox(borders, false);

		smallBoard.resizeContainer($('#smallParametricPlot').width(), $('#smallParametricPlot').height(), true, true);
		smallBoard.setBoundingBox(smallBoundingBox, false);
	});
}

//---------------------------parametric-example-3---------------------------//

else if (document.title == "Пример 3. Построение графиков функций и кривых. Параметрическое задание.")
{
	function funcX(t) {
		return 1 / Math.sin(t);
	}
	function funcY(t) {
		return 1 / Math.sin(2 * t);
	}

	var PI = Math.PI;
	var borderValue = 6;
	var borders = [-borderValue, borderValue, borderValue, -borderValue];
	var border2Value = 8;
	var borders2 = [-border2Value, border2Value, border2Value, -border2Value];

	var color1 = '#7c83ff';
	var color2 = '#002897';
	var color3 = '#ff0000';
	var color4 = '#ff0000';
	var color5 = '#7c83ff';
	var color6 = '#11cc30';

	var colorForText = '#000';
	var colorForPoints = '#000';
	var colorForAsymptotes = '#000';

	var slider = document.getElementById('tSliderExample2MainBoard');
	var textAsymptote1 = document.getElementById('textAsymptote1');
	var textAsymptote2 = document.getElementById('textAsymptote2');

	// --- подготовка графика с ползунком --- //
	const axisX = {
		name: '$$x$$',
		withLabel: true,
		label: {
			position: 'rt',
			offset: [5, -13],
			fontSize: 22
		},
		ticks: { visible: false }
	};
	const axisY = {
		withLabel: true,
		name: '$$y$$',
		label: {
			position: 'rt',
			offset: [6, 15],
			fontSize: 22
		},
		ticks: { visible: false }
	};
	var mainBoard = JXG.JSXGraph.initBoard('bigParametricPlot', {
		axis: true,
		defaultAxes: { y: axisY, x: axisX },
		boundingbox: borders,
		registerEvents: false,
		showNavigation: false,
		showCopyright: false,
		grid: true
	});
	var mainGraph1 = mainBoard.create('curve', [[0], [0]], { strokeColor: color1, strokeWidth: 3 });
	var mainGraph2 = mainBoard.create('curve', [[0], [0]], { strokeColor: color2, strokeWidth: 3 });
	var mainGraph3 = mainBoard.create('curve', [[0], [0]], { strokeColor: color3, strokeWidth: 3 });
	var mainGraph4 = mainBoard.create('curve', [[0], [0]], { strokeColor: color4, strokeWidth: 3 });
	var mainGraph5 = mainBoard.create('curve', [[0], [0]], { strokeColor: color5, strokeWidth: 3 });

	var specialPoint1 = mainBoard.create('point', [-2 / Math.sqrt(2), 1], { name: '', size: 3, color: colorForPoints });

	var widthForAsymptotes = 2.5;
	var opacityForAsymptotes = 0.2;
	var opacityForAsymptotesVisible = 1;
	const asymptoteBaseMainBoard = {
		dash: 3,
		strokeWidth: widthForAsymptotes,
		strokeColor: colorForAsymptotes,
		strokeOpacity: opacityForAsymptotes
	};

	// --- подготовка асимптот --- //
	var edgeX = 10;
	var middleXVertical = 3;
	var middleXFunc = 2.5;
	var asymptotesMainBoard = new Map();
	const verticalSegments = [
		[ '', -1, -edgeX, middleXVertical ],
		[ 'secondSegment', -1, middleXVertical, edgeX ],
		[ '', 1, -edgeX, edgeX ]
	];
	verticalSegments.forEach(([id, x, y1, y2]) => {
		var asymptote = mainBoard.create('segment', [[x, y1], [x, y2]], {
			...asymptoteBaseMainBoard
		});
		if (id != '') asymptotesMainBoard.set(id, asymptote);
	});
	const funcSegments = [
		[ 'firstSegment', { f: x => -0.5 * x, start: -edgeX, end: -middleXFunc } ], //[6]
		[ '', { f: x => -0.5 * x, start: -middleXFunc, end: edgeX } ],
		[ '', { f: x => 0.5 * x, start: -edgeX, end: edgeX } ]
	];
	funcSegments.forEach(([id, { f, start, end }]) => {
		var asymptote = mainBoard.create('functiongraph', [f, start, end], {
			...asymptoteBaseMainBoard
		});
		if (id != '') asymptotesMainBoard.set(id, asymptote);
	});

	asymptotesMainBoard.get('firstSegment').setAttribute({
		opacity: opacityForAsymptotesVisible
	});

	// --- подготовка массивов с точками функции --- //
	var x1 = [], y1 = [];
	var x2 = [], y2 = [];
	var x3 = [], y3 = [];
	var x4 = [], y4 = [];
	var x5 = [], y5 = [];
	
	var pi200 = PI / 200;
	for (var i = 1; i < 51; i++)
	{
		var t = -PI + i * pi200;
		x1.push(funcX(t));
		y1.push(funcY(t));
	}
	for (var i = 51; i < 100; i++)
	{
		var t = -PI + i * pi200;
		x2.push(funcX(t));
		y2.push(funcY(t));
	}
	for (var i = 1; i < 100; i++)
	{
		var t = -PI / 2 + i * pi200;
		x3.push(funcX(t));
		y3.push(funcY(t));
	}
	for (var i = 1; i < 100; i++)
	{
		var t = i * pi200;
		x4.push(funcX(t));
		y4.push(funcY(t));
	}
	for (var i = 1; i < 100; i++)
	{
		var t = PI / 2 + i * pi200;
		x5.push(funcX(t));
		y5.push(funcY(t));
	}

	// --- подсветка сегментов кривых в таблице --- //
	const shifts = getTableShifts();
	applyStyleToColumn(4, shifts, "text-transparent", "text-visible");
	applyStyleToColumn(5, shifts, "text-transparent", "text-visible");

	var lastCurve = [1, 2, 3, 1];
	const curve1 = 1;
	const curve2 = 2;
	const curveNone = 0;
	function showCurrentCurve() {
		var value = slider.value;
		if (value <= 50 && lastCurve[3] != curve1) {
			applyStyleForColumns(shifts, lastCurve, 1);
			lastCurve[3] = curve1;
		}
		else if (value > 50 && value <= 99 && lastCurve[3] != curve2) {
			applyStyleForColumns(shifts, lastCurve, 3);
			lastCurve[3] = curve2;
		}
		else if (value > 99) {
			removeStyleForColumns(shifts, lastCurve);
			lastCurve[3] = curveNone;
		}
	}

	mainGraph1.updateDataArray = function()
	{
		var i_end = 50;
		var value = slider.value;
		var dataX = [], dataY = [];
		if (value <= i_end)
		{
			for (var i = 0; i <= value; i++)
			{
				dataX.push(x1[i]);
				dataY.push(y1[i]);
			}
			this.dataX = dataX;
			this.dataY = dataY;

			applyOpacityAsymptote(asymptotesMainBoard,
				'firstSegment',
				opacityForAsymptotesVisible
			);
			setNormalTextAsymptote(textAsymptote1);

			return;
		}
		else
		{
			this.dataX = x1;
			this.dataY = y1;
		}

		applyOpacityAsymptote(asymptotesMainBoard,
			'firstSegment',
			opacityForAsymptotes
		);
		setBoldTextAsymptote(textAsymptote1);
	}
	mainGraph2.updateDataArray = function()
	{ 
		var i_start = 51;
		var i_end = i_start + 49;
		var value = slider.value;
		var dataX = [], dataY = [];
		if (i_start <= value && value <= i_end)
		{
			for (var i = i_start; i <= value; i++)
			{
				dataX.push(x2[i - i_start]);
				dataY.push(y2[i - i_start]);
			}
			this.dataX = dataX;
			this.dataY = dataY;

			applyOpacityAsymptote(asymptotesMainBoard,
				'secondSegment',
				opacityForAsymptotesVisible
			);
			setNormalTextAsymptote(textAsymptote2);

			return;
		}
		else if (value > i_end)
		{
			this.dataX = x2;
			this.dataY = y2;
		}
		else
		{
			this.dataX = [];
			this.dataY = [];
		}

		applyOpacityAsymptote(asymptotesMainBoard,
			'secondSegment',
			opacityForAsymptotes
		);
		setBoldTextAsymptote(textAsymptote2);
	}
	mainGraph3.updateDataArray = function()
	{ 
		var i_start = 100;
		var i_end = i_start + 99;
		var value = slider.value;
		var dataX = [], dataY = [];
		if (i_start <= value && value <= i_end)
		{
			for (var i = i_start; i <= value; i++)
			{
				dataX.push(x3[i - i_start]);
				dataY.push(y3[i - i_start]);
			}
			this.dataX = dataX;
			this.dataY = dataY;
		}
		else if (value > i_end)
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
	mainGraph4.updateDataArray = function()
	{ 
		var i_start = 200;
		var i_end = i_start + 99;
		var value = slider.value;
		var dataX = [], dataY = [];
		if (i_start <= value && value <= i_end)
		{
			for (var i = i_start; i <= value; i++)
			{
				dataX.push(x4[i - i_start]);
				dataY.push(y4[i - i_start]);
			}
			this.dataX = dataX;
			this.dataY = dataY;
		}
		else if (value > i_end)
		{
			this.dataX = x4;
			this.dataY = y4;
		}
		else
		{
			this.dataX = [];
			this.dataY = [];
		}
	}
	mainGraph5.updateDataArray = function()
	{ 
		var i_start = 300;
		var i_end = i_start + 99;
		var value = slider.value;
		var dataX = [], dataY = [];
		if (i_start <= value && value <= i_end)
		{
			for (var i = i_start; i <= value; i++)
			{
				dataX.push(x5[i - i_start]);
				dataY.push(y5[i - i_start]);
			}
			this.dataX = dataX;
			this.dataY = dataY;
		}
		else if (value > i_end)
		{
			this.dataX = x5;
			this.dataY = y5;
		}
		else
		{
			this.dataX = [];
			this.dataY = [];
		}
	}

	function draw()
	{
		mainBoard.suspendUpdate();

		showCurrentCurve();

		mainGraph1.updateDataArray();
		mainGraph2.updateDataArray();
		mainGraph3.updateDataArray();
		mainGraph4.updateDataArray();
		mainGraph5.updateDataArray();

		mainBoard.unsuspendUpdate();
	}

	var ceilSymmetry1 = document.getElementById('ceilSymmetry1');
	var ceilSymmetry2 = document.getElementById('ceilSymmetry2');

	var symmetryBoard = JXG.JSXGraph.initBoard('bigParametricPlotSymmetry', {
		axis: true,
		defaultAxes: { y: axisY, x: axisX },
		boundingbox: borders,
		registerEvents: false,
		showNavigation: false,
		showCopyright: false,
		grid: true
	});
	var symmetryGraph1 = symmetryBoard.create('curve', [
		function(t) { return 1/Math.sin(t) },
		function(t) { return 1/Math.sin(2 * t) },
		-PI, -3 * PI / 4
	], { strokeColor: color1, strokeWidth: 3 });
	var symmetryGraph2 = symmetryBoard.create('curve', [
		function(t) { return 1/Math.sin(t) },
		function(t) { return 1/Math.sin(2 * t) },
		-3 * PI / 4, -PI / 2
	], { strokeColor: color2, strokeWidth: 3 });
	var symmetryGraph3 = symmetryBoard.create('curve', [
		function(t) { return 1/Math.sin(t) },
		function(t) { return 1/Math.sin(2 * t) },
		-PI / 2, 0
	], { dash: 3, strokeColor: color3, strokeWidth: 3 });
	var symmetryGraph4 = symmetryBoard.create('curve', [
		function(t) { return 1/Math.sin(t) },
		function(t) { return 1/Math.sin(2 * t) },
		0, PI / 2
	], { dash: 3, strokeColor: color4, strokeWidth: 3 });
	var symmetryGraph5 = symmetryBoard.create('curve', [
		function(t) { return 1/Math.sin(t) },
		function(t) { return 1/Math.sin(2 * t) },
		PI / 2, PI
	], { dash: 3, strokeColor: color5, strokeWidth: 3 });
	symmetryGraph3.setAttribute({ visible: false });
	symmetryGraph4.setAttribute({ visible: false });
	symmetryGraph5.setAttribute({ visible: false });

	symmetryBoard.create('point', [-2 / Math.sqrt(2), 1], { name: '', size: 3, color: colorForPoints });

	symmetryBoard.create('functiongraph', [function(x) { return 0.5 * x; }], { dash: 4, strokeWidth: 1, strokeColor: colorForAsymptotes });
	symmetryBoard.create('functiongraph', [function(x) { return -0.5 * x; }], { dash: 4, strokeWidth: 1, strokeColor: colorForAsymptotes });
	symmetryBoard.create('line', [[1, -10], [1, 10]], { dash: 4, strokeWidth: 1, strokeColor: colorForAsymptotes });
	symmetryBoard.create('line', [[-1, -10], [-1, 10]], { dash: 4, strokeWidth: 1, strokeColor: colorForAsymptotes });

	function showSymmetry1() {
		if (ceilSymmetry1.classList.contains('is-checked2')) {
			symmetryGraph3.setAttribute({ visible: false });
			ceilSymmetry2.classList.add('hidden');
			ceilSymmetry2.classList.remove('is-checked2');
			symmetryGraph4.setAttribute({ visible: false });
			symmetryGraph5.setAttribute({ visible: false });
		} else {
			symmetryGraph3.setAttribute({ visible: true });
			ceilSymmetry2.classList.remove('hidden');
		}
		symmetryBoard.fullUpdate();
	}
	function showSymmetry2() {
		if (ceilSymmetry2.classList.contains('is-checked2')) {
			symmetryGraph4.setAttribute({ visible: false });
			symmetryGraph5.setAttribute({ visible: false });
		} else {
			symmetryGraph4.setAttribute({ visible: true });
			symmetryGraph5.setAttribute({ visible: true });
		}
		symmetryBoard.fullUpdate();
	}

	var offsetX = 1.5;
	var offsetY = 2;

	var slider2 = document.getElementById('tSliderExample2SymmetryBoard');

	var mainBoard2 = JXG.JSXGraph.initBoard('bigParametricPlot2', {
		axis: true,
		defaultAxes: { y: axisY, x: axisX },
		boundingbox: borders2,
		registerEvents: false,
		showNavigation: false,
		showCopyright: false,
		grid: true
	});
	var mainGraph21 = mainBoard2.create('curve', [[0], [0]], { strokeColor: color1, strokeWidth: 3 });
	var mainGraph22 = mainBoard2.create('curve', [[0], [0]], { strokeColor: color2, strokeWidth: 3 });
	var mainGraph23 = mainBoard2.create('curve', [[0], [0]], { strokeColor: color3, strokeWidth: 3 });
	var mainGraph24 = mainBoard2.create('curve', [[0], [0]], { strokeColor: color4, strokeWidth: 3 });
	var mainGraph25 = mainBoard2.create('curve', [[0], [0]], { strokeColor: color5, strokeWidth: 3 });

	var specialPoint21 = mainBoard2.create('point', [-2 / Math.sqrt(2) + offsetX, 1 + offsetY], { name: '', size: 3, color: colorForPoints });

	mainBoard2.create('functiongraph', [function(x) { return 0.5 * (x - offsetX) + offsetY; }], { dash: 3, strokeWidth: 1, strokeColor: colorForAsymptotes });
	mainBoard2.create('functiongraph', [function(x) { return -0.5 * (x - offsetX) + offsetY; }], { dash: 3, strokeWidth: 1, strokeColor: colorForAsymptotes });
	mainBoard2.create('line', [[1 + offsetX, -10], [1 + offsetX, 10]], { dash: 3, strokeWidth: 1, strokeColor: colorForAsymptotes });
	mainBoard2.create('line', [[-1 + offsetX, -10], [-1 + offsetX, 10]], { dash: 3, strokeWidth: 1, strokeColor: colorForAsymptotes });

	var lineNameOffset = "$$y=2$$"; //change
	var symmetryY2 = mainBoard2.create('functiongraph', [function(x) { return offsetY; }], { withLabel: true, name: lineNameOffset,
		label: {
			offset: [-24, 11],
			fontSize: 14,
			color: color6
		}, dash: 1, strokeWidth: 1, strokeColor: color6 });
	symmetryY2.setAttribute({ visible: false });

	var pointNameOffset = "$$(1.5,2)$$"; //change
	var symmetryPoint = mainBoard2.create('point', [offsetX, offsetY], { name: pointNameOffset,
		label: {
			anchorX: 'middle',
			anchorY: 'top',
			offset: [0, 25],
			fontSize: 14
		},
		size: 3, color: colorForPoints });
	symmetryPoint.setAttribute({ visible: false });

	var x21 = [], y21 = [];
	var x22 = [], y22 = [];
	var x23 = [], y23 = [];
	var x24 = [], y24 = [];
	var x25 = [], y25 = [];

	x1.forEach((element, index) => {
		x21[index] = element + offsetX;
	});
	y1.forEach((element, index) => {
		y21[index] = element + offsetY;
	});
	x2.forEach((element, index) => {
		x22[index] = element + offsetX;
	});
	y2.forEach((element, index) => {
		y22[index] = element + offsetY;
	});
	x3.forEach((element, index) => {
		x23[index] = element + offsetX;
	});
	y3.forEach((element, index) => {
		y23[index] = element + offsetY;
	});
	x4.forEach((element, index) => {
		x24[index] = element + offsetX;
	});
	y4.forEach((element, index) => {
		y24[index] = element + offsetY;
	});
	x5.forEach((element, index) => {
		x25[index] = element + offsetX;
	});
	y5.forEach((element, index) => {
		y25[index] = element + offsetY;
	});

	mainGraph21.updateDataArray = function()
	{
		var i_end = 50;
		var value = slider2.value;
		var dataX = [], dataY = [];
		if (value <= i_end)
		{
			for (var i = 0; i < value; i++)
			{
				dataX.push(x21[i]);
				dataY.push(y21[i]);
			}
			this.dataX = dataX;
			this.dataY = dataY;
			symmetryY2.setAttribute({ visible: false });
		}
		else
		{
			this.dataX = x21;
			this.dataY = y21;
		}
	}
	mainGraph22.updateDataArray = function()
	{ 
		var i_start = 51;
		var i_end = i_start + 49;
		var value = slider2.value;
		var dataX = [], dataY = [];
		if (i_start < value && value <= i_end)
		{
			for (var i = i_start; i < value; i++)
			{
				dataX.push(x22[i - i_start]);
				dataY.push(y22[i - i_start]);
			}
			this.dataX = dataX;
			this.dataY = dataY;
			symmetryY2.setAttribute({ visible: false });
		}
		else if (value > i_end)
		{
			this.dataX = x22;
			this.dataY = y22;
			symmetryY2.setAttribute({ visible: true });
		}
		else
		{
			this.dataX = [];
			this.dataY = [];
		}
	}
	mainGraph23.updateDataArray = function()
	{ 
		var i_start = 100;
		var i_end = i_start + 99;
		var value = slider2.value;
		var dataX = [], dataY = [];
		if (i_start < value && value <= i_end)
		{
			for (var i = i_start; i < value; i++)
			{
				dataX.push(x23[i - i_start]);
				dataY.push(y23[i - i_start]);
			}
			this.dataX = dataX;
			this.dataY = dataY;
		}
		else if (value > i_end)
		{
			this.dataX = x23;
			this.dataY = y23;
		}
		else
		{
			this.dataX = [];
			this.dataY = [];
		}
	}
	mainGraph24.updateDataArray = function()
	{ 
		var i_start = 200;
		var i_end = i_start + 99;
		var value = slider2.value;
		var dataX = [], dataY = [];
		if (i_start < value && value <= i_end)
		{
			for (var i = i_start; i < value; i++)
			{
				dataX.push(x24[i - i_start]);
				dataY.push(y24[i - i_start]);
			}
			this.dataX = dataX;
			this.dataY = dataY;
			symmetryPoint.setAttribute({ visible: true });
		}
		else if (value > i_end)
		{
			this.dataX = x24;
			this.dataY = y24;
			symmetryPoint.setAttribute({ visible: true });
		}
		else
		{
			this.dataX = [];
			this.dataY = [];
			symmetryPoint.setAttribute({ visible: false });
		}
	}
	mainGraph25.updateDataArray = function()
	{ 
		var i_start = 300;
		var i_end = i_start + 99;
		var value = slider2.value;
		var dataX = [], dataY = [];
		if (i_start < value && value <= i_end)
		{
			for (var i = i_start; i < value; i++)
			{
				dataX.push(x25[i - i_start]);
				dataY.push(y25[i - i_start]);
			}
			this.dataX = dataX;
			this.dataY = dataY;
		}
		else if (value > i_end)
		{
			this.dataX = x25;
			this.dataY = y25;
		}
		else
		{
			this.dataX = [];
			this.dataY = [];
		}
	}

	function draw2()
	{
		mainBoard2.suspendUpdate();

		mainGraph21.updateDataArray();
		mainGraph22.updateDataArray();
		mainGraph23.updateDataArray();
		mainGraph24.updateDataArray();
		mainGraph25.updateDataArray();

		mainBoard2.unsuspendUpdate();
	}

	var ceilSymmetry3 = document.getElementById('ceilSymmetry3');
	var ceilSymmetry4 = document.getElementById('ceilSymmetry4');
	
	var symmetryBoard2 = JXG.JSXGraph.initBoard('bigParametricPlotSymmetry2', {
		defaultAxes: { y: axisY, x: axisX },
		boundingbox: borders2, registerEvents: false, showNavigation: false, showCopyright: false, axis: true, grid: true });
	var symmetryGraph21 = symmetryBoard2.create('curve', [
		function(t) { return 1/Math.sin(t) + offsetX },
		function(t) { return 1/Math.sin(2 * t) + offsetY },
		-PI, -3 * PI / 4
	], { strokeColor: color1, strokeWidth: 3 });
	var symmetryGraph22 = symmetryBoard2.create('curve', [
		function(t) { return 1/Math.sin(t) + offsetX },
		function(t) { return 1/Math.sin(2 * t) + offsetY },
		-3 * PI / 4, -PI / 2
	], { strokeColor: color2, strokeWidth: 3 });
	var symmetryGraph23 = symmetryBoard2.create('curve', [
		function(t) { return 1/Math.sin(t) + offsetX },
		function(t) { return 1/Math.sin(2 * t) + offsetY },
		-PI / 2, 0
	], { dash: 3, strokeColor: color3, strokeWidth: 3 });
	var symmetryGraph24 = symmetryBoard2.create('curve', [
		function(t) { return 1/Math.sin(t) + offsetX },
		function(t) { return 1/Math.sin(2 * t) + offsetY },
		0, PI / 2
	], { dash: 3, strokeColor: color4, strokeWidth: 3 });
	var symmetryGraph25 = symmetryBoard2.create('curve', [
		function(t) { return 1/Math.sin(t) + offsetX },
		function(t) { return 1/Math.sin(2 * t) + offsetY },
		PI / 2, PI
	], { dash: 3, strokeColor: color5, strokeWidth: 3 });
	symmetryGraph23.setAttribute({ visible: false });
	symmetryGraph24.setAttribute({ visible: false });
	symmetryGraph25.setAttribute({ visible: false });

	symmetryBoard2.create('point', [-2 / Math.sqrt(2) + offsetX, 1 + offsetY], { name: '', size: 3, color: colorForPoints });

	symmetryBoard2.create('functiongraph', [function(x) { return 0.5 * (x - offsetX) + offsetY; }], { dash: 4, strokeWidth: 1, strokeColor: colorForAsymptotes });
	symmetryBoard2.create('functiongraph', [function(x) { return -0.5 * (x - offsetX) + offsetY; }], { dash: 4, strokeWidth: 1, strokeColor: colorForAsymptotes });
	symmetryBoard2.create('line', [[1 + offsetX, -10], [1 + offsetX, 10]], { dash: 4, strokeWidth: 1, strokeColor: colorForAsymptotes });
	symmetryBoard2.create('line', [[-1 + offsetX, -10], [-1 + offsetX, 10]], { dash: 4, strokeWidth: 1, strokeColor: colorForAsymptotes });

	var symmetryY2_2 = symmetryBoard2.create('functiongraph', [function(x) { return offsetY; }], { withLabel: true, name: lineNameOffset,
		label: {
			offset: [-24, 11],
			fontSize: 14,
			color: color6
		}, dash: 1, strokeWidth: 1, strokeColor: color6 });
	symmetryY2_2.setAttribute({ visible: false });

	var symmetryPoint_2 = symmetryBoard2.create('point', [offsetX, offsetY], { name: pointNameOffset,
		label: {
			anchorX: 'middle',
			anchorY: 'top',
			offset: [0, 25],
			fontSize: 14
		},
		size: 3, color: colorForPoints });
	symmetryPoint_2.setAttribute({ visible: false });

	function showSymmetry3() {
		if (ceilSymmetry3.classList.contains('is-checked2')) {
			symmetryGraph23.setAttribute({ visible: false });
			ceilSymmetry4.classList.add('hidden');
			ceilSymmetry4.classList.remove('is-checked2');
			symmetryGraph24.setAttribute({ visible: false });
			symmetryGraph25.setAttribute({ visible: false });

			symmetryY2_2.setAttribute({ visible: false });
			symmetryPoint_2.setAttribute({ visible: false });
		} else {
			symmetryGraph23.setAttribute({ visible: true });
			ceilSymmetry4.classList.remove('hidden');

			symmetryY2_2.setAttribute({ visible: true });
		}
		symmetryBoard2.fullUpdate();
	}
	function showSymmetry4() {
		if (ceilSymmetry4.classList.contains('is-checked2')) {
			symmetryGraph24.setAttribute({ visible: false });
			symmetryGraph25.setAttribute({ visible: false });

			symmetryPoint_2.setAttribute({ visible: false });
		} else {
			symmetryGraph24.setAttribute({ visible: true });
			symmetryGraph25.setAttribute({ visible: true });

			symmetryPoint_2.setAttribute({ visible: true });
		}
		symmetryBoard2.fullUpdate();
	}

	$(window).resize(function() {
		mainBoard.resizeContainer($('#bigParametricPlot').width(), $('#bigParametricPlot').height(), true, true);
		mainBoard.setBoundingBox(borders, false);

		mainBoard2.resizeContainer($('#bigParametricPlot2').width(), $('#bigParametricPlot2').height(), true, true);
		mainBoard2.setBoundingBox(borders2, false);

		symmetryBoard.resizeContainer($('#bigParametricPlotSymmetry').width(), $('#bigParametricPlotSymmetry').height(), true, true);
		symmetryBoard.setBoundingBox(borders, false);

		symmetryBoard2.resizeContainer($('#bigParametricPlotSymmetry2').width(), $('#bigParametricPlotSymmetry').height(), true, true);
		symmetryBoard2.setBoundingBox(borders2, false);
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

else if (document.title == "Пример 1. Построение графиков функций и кривых. Явное задание.")
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

else if (document.title == "Пример 2. Построение графиков функций и кривых. Явное задание.")
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

//---------------------------polar-1 (1 + cos(phi))---------------------------//

else if (document.title == "Связь полярных и декартовых координат r=1+cos(φ)") {
  let brdXYGraph1 = JXG.JSXGraph.initBoard("XYGraph1Plot", {
    axis: true,
    defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
    boundingbox: [-2.5, 2, 3.5, -2],
    registerEvents: false,
    grid: true,
    showNavigation: false,
    showCopyright: false,
  });

  let PointSize1 = document.getElementById("PointSize1");

  brdXYGraph1.suspendUpdate();
  let plot1 = brdXYGraph1.create(
    "curve",
    [
      function (phi) {
        return 1 + Math.cos(phi);
      },
      [0, 0],
      0,
      2 * Math.PI,
    ],
    { curveType: "polar", strokewidth: 3 }
  );
  let point1 = brdXYGraph1.create("point", [0, 0], { name: "", size: parseInt(PointSize1.value), color: "#ff0000" });
  let txt1 = brdXYGraph1.create("text", [3.35, -0.12, "$$x$$"], { fontSize: 20, color: "#000" });
  let txt2 = brdXYGraph1.create("text", [0.08, 1.92, "$$y$$"], { fontSize: 20, color: "#000" });
  brdXYGraph1.unsuspendUpdate();

  let brdRFGraph1 = JXG.JSXGraph.initBoard("RFGraph1Plot", {
    axis: true,
    defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
    boundingbox: [-3 * Math.PI, 6.5, 3 * Math.PI, -4],
    registerEvents: false,
    grid: true,
    showNavigation: false,
    keepaspectratio: true,
    showCopyright: false,
  });
  brdRFGraph1.suspendUpdate();
  let plot2 = brdRFGraph1.create(
    "functiongraph",
    [
      function (x) {
        return 1 + Math.cos(x);
      },
    ],
    { strokeColor: "#1e28ff", strokeWidth: 3 }
  );
  let point2 = brdRFGraph1.create("point", [-3 * Math.PI, 1 + Math.cos(-3 * Math.PI)], {
    name: "",
    size: parseInt(PointSize1.value),
    color: "#ff0000",
  });
  let txt3 = brdRFGraph1.create("text", [9, -0.4, "$$φ$$"], { fontSize: 20, color: "#000" });
  let txt4 = brdRFGraph1.create("text", [0.23, 6.24, "$$r$$"], { fontSize: 20, color: "#000" });
  brdRFGraph1.unsuspendUpdate();

  let PointVelocity1 = document.getElementById("PointVelocity1");
  let velocity = PointVelocity1.value;

  let isRunning = false;
  function start() {
    isRunning = true;
  }

  function stop() {
    isRunning = false;
  }

  function changeVelocity(value) {
    velocity = value;
  }

  function changeSize(value) {
    point1.setAttribute({ size: parseInt(value) });
    point2.setAttribute({ size: parseInt(value) });
  }

  function setXText(x) {
    document.getElementById("XYGraph1Text1").innerHTML = parseFloat(x).toFixed(2);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "XYGraph1Text1"]);
  }

  function setYText(y) {
    document.getElementById("XYGraph1Text2").innerHTML = parseFloat(y).toFixed(2);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "XYGraph1Text2"]);
  }

  function setFText(f) {
    document.getElementById("RFGraph1Text1").innerHTML = parseFloat(f).toFixed(2);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "RFGraph1Text1"]);
  }

  function setRText(r) {
    document.getElementById("RFGraph1Text2").innerHTML = parseFloat(r).toFixed(2);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "RFGraph1Text2"]);
  }

  let phi = -3 * Math.PI,
    step = 0.2;

  function anim() {
    changeVelocity(PointVelocity1.value);
    changeSize(PointSize1.value);

    setXText((1 + Math.cos(phi)) * Math.cos(phi));
    setYText((1 + Math.cos(phi)) * Math.sin(phi));
    setFText(phi * 180 / (2 * Math.PI));
    setRText(1 + Math.cos(phi));

    if (isRunning) {
      phi += step * velocity;

      if (phi > 3 * Math.PI)
        phi = -3 * Math.PI;

      point1.moveTo([(1 + Math.cos(phi)) * Math.cos(phi), (1 + Math.cos(phi)) * Math.sin(phi)]);
      point2.moveTo([phi, 1 + Math.cos(phi)]);
    }
    setTimeout(anim, 30);
  }

  $(window).resize(function () {
    brdXYGraph1.resizeContainer($("#XYGraph1Plot").width(), $("#XYGraph1Plot").height(), true, true);
    brdXYGraph1.setBoundingBox([-2.5, 2, 3.5, -2], false);
    brdRFGraph1.resizeContainer($("#RFGraph1Plot").width(), $("#RFGraph1Plot").height(), true, true);
    brdRFGraph1.setBoundingBox([-3 * Math.PI, 6.5, 3 * Math.PI, -4], false);
  });

  anim();
}

//---------------------------polar-2 (1 + sin(phi))---------------------------//

else if (document.title == "Связь полярных и декартовых координат r=1+sin(φ)") {
  let brdXYGraph2 = JXG.JSXGraph.initBoard("XYGraph2Plot", {
    axis: true,
    defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
    boundingbox: [-3, 2.7, 3, -1.3],
    registerEvents: false,
    grid: true,
    showNavigation: false,
    showCopyright: false,
  });

  let PointSize2 = document.getElementById("PointSize2");

  brdXYGraph2.suspendUpdate();
  let plot1 = brdXYGraph2.create(
    "curve",
    [
      function (phi) {
        return 1 + Math.sin(phi);
      },
      [0, 0],
      0,
      2 * Math.PI,
    ],
    { curveType: "polar", strokewidth: 3 }
  );
  let point1 = brdXYGraph2.create("point", [0, 0], { name: "", size: parseInt(PointSize2.value), color: "#ff0000" });
  let txt1 = brdXYGraph2.create("text", [2.85, -0.12, "$$x$$"], { fontSize: 20, color: "#000" });
  let txt2 = brdXYGraph2.create("text", [0.08, 2.63, "$$y$$"], { fontSize: 20, color: "#000" });
  brdXYGraph2.unsuspendUpdate();

  let brdRFGraph2 = JXG.JSXGraph.initBoard("RFGraph2Plot", {
    axis: true,
    defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
    boundingbox: [-3 * Math.PI, 6.5, 3 * Math.PI, -4],
    registerEvents: false,
    grid: true,
    showNavigation: false,
    keepaspectratio: true,
    showCopyright: false,
  });
  brdRFGraph2.suspendUpdate();
  let plot2 = brdRFGraph2.create(
    "functiongraph",
    [
      function (x) {
        return 1 + Math.sin(x);
      },
    ],
    { strokeColor: "#1e28ff", strokeWidth: 3 }
  );
  let point2 = brdRFGraph2.create("point", [-3 * Math.PI, 1 + Math.sin(-3 * Math.PI)], {
    name: "",
    size: parseInt(PointSize2.value),
    color: "#ff0000",
  });
  let txt3 = brdRFGraph2.create("text", [9, -0.4, "$$φ$$"], { fontSize: 20, color: "#000" });
  let txt4 = brdRFGraph2.create("text", [0.23, 6.24, "$$r$$"], { fontSize: 20, color: "#000" });
  brdRFGraph2.unsuspendUpdate();

  let PointVelocity2 = document.getElementById("PointVelocity2");
  let velocity = PointVelocity2.value;

  let isRunning = false;
  function start() {
    isRunning = true;
  }

  function stop() {
    isRunning = false;
  }

  function changeVelocity(value) {
    velocity = value;
  }

  function changeSize(value) {
    point1.setAttribute({ size: parseInt(value) });
    point2.setAttribute({ size: parseInt(value) });
  }

  function setXText(x) {
    document.getElementById("XYGraph2Text1").innerHTML = parseFloat(x).toFixed(2);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "XYGraph2Text1"]);
  }

  function setYText(y) {
    document.getElementById("XYGraph2Text2").innerHTML = parseFloat(y).toFixed(2);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "XYGraph2Text2"]);
  }

  function setFText(f) {
    document.getElementById("RFGraph2Text1").innerHTML = parseFloat(f).toFixed(2);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "RFGraph2Text1"]);
  }

  function setRText(r) {
    document.getElementById("RFGraph2Text2").innerHTML = parseFloat(r).toFixed(2);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "RFGraph2Text2"]);
  }

  let phi = -3 * Math.PI,
    step = 0.2;

  function anim() {
    changeVelocity(PointVelocity2.value);
    changeSize(PointSize2.value);

    setXText((1 + Math.sin(phi)) * Math.cos(phi));
    setYText((1 + Math.sin(phi)) * Math.sin(phi));
    setFText(phi * 180 / (2 * Math.PI));
    setRText(1 + Math.sin(phi));

    if (isRunning) {
      phi += step * velocity;

      if (phi > 3 * Math.PI)
        phi = -3 * Math.PI;

      point1.moveTo([(1 + Math.sin(phi)) * Math.cos(phi), (1 + Math.sin(phi)) * Math.sin(phi)]);
      point2.moveTo([phi, 1 + Math.sin(phi)]);
    }
    setTimeout(anim, 30);
  }

  $(window).resize(function () {
    brdXYGraph2.resizeContainer($("#XYGraph2Plot").width(), $("#XYGraph2Plot").height(), true, true);
    brdXYGraph2.setBoundingBox([-3, 2.7, 3, -1.3], false);
    brdRFGraph2.resizeContainer($("#RFGraph2Plot").width(), $("#RFGraph2Plot").height(), true, true);
    brdRFGraph2.setBoundingBox([-3 * Math.PI, 6.5, 3 * Math.PI, -4], false);
  });

  anim();
}

//---------------------------polar-3 (2cos(2phi))---------------------------//

else if (document.title == "Связь полярных и декартовых координат r=2cos(2φ)") {
  let brdXYGraph3 = JXG.JSXGraph.initBoard("XYGraph3Plot", {
    axis: true,
    defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
    boundingbox: [-2.5, 1.5, 2.5, -1.5],
    registerEvents: false,
    grid: true,
    showNavigation: false,
    showCopyright: false,
  });

  let PointSize3 = document.getElementById("PointSize3");

  brdXYGraph3.suspendUpdate();
  let plot1 = brdXYGraph3.create(
    "curve",
    [
      function (phi) {
        if (phi > -9 * Math.PI / 4 && phi < -7 * Math.PI / 4 || 
            phi > -5 * Math.PI / 4 && phi < -3 * Math.PI / 4 || 
            phi > -Math.PI / 4 && phi < Math.PI / 4 || 
            phi > 3 * Math.PI / 4 && phi < 5 * Math.PI / 4)
          return 2 * Math.cos(2 * phi);
      },
      [0, 0],
      -9 * Math.PI / 4,
      7 * Math.PI / 4,
    ],
    { curveType: "polar", strokewidth: 3 }
  );
  let point1 = brdXYGraph3.create("point", [0, 0], { name: "", size: parseInt(PointSize3.value), color: "#ff0000" });
  let txt1 = brdXYGraph3.create("text", [2.37, -0.09, "$$x$$"], { fontSize: 20, color: "#000" });
  let txt2 = brdXYGraph3.create("text", [0.08, 1.44, "$$y$$"], { fontSize: 20, color: "#000" });
  brdXYGraph3.unsuspendUpdate();

  let brdRFGraph3 = JXG.JSXGraph.initBoard("RFGraph3Plot", {
    axis: true,
    defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
    boundingbox: [-9 * Math.PI / 4, 4, 7 * Math.PI / 4, -1],
    registerEvents: false,
    grid: true,
    showNavigation: false,
    keepaspectratio: true,
    showCopyright: false,
  });
  brdRFGraph3.suspendUpdate();
  let plot2 = brdRFGraph3.create(
    "functiongraph",
    [
      function (x) {
        if (Math.cos(2 * x) > 0)
          return 2 * Math.cos(2 * x);
      },
    ],
    { strokeColor: "#1e28ff", strokeWidth: 3 }
  );
  let plot3 = brdRFGraph3.create(
    "functiongraph",
    [
      function (x) {
        if (Math.cos(2 * x) < 0)
          return 2 * Math.cos(2 * x);
      },
    ],
    { strokeColor: "#1e28ff", strokeWidth: 3, dash: 3 }
  );
  let point2 = brdRFGraph3.create("point", [-9 * Math.PI / 4, 2 * Math.cos(-18 * Math.PI / 4)], {
    name: "",
    size: parseInt(PointSize3.value),
    color: "#ff0000",
  });
  let txt3 = brdRFGraph3.create("text", [5.2, -0.17, "$$φ$$"], { fontSize: 20, color: "#000" });
  let txt4 = brdRFGraph3.create("text", [0.14, 3.82, "$$r$$"], { fontSize: 20, color: "#000" });
  brdRFGraph3.unsuspendUpdate();

  let PointVelocity3 = document.getElementById("PointVelocity3");
  let velocity = PointVelocity3.value;

  let isRunning = false;
  function start() {
    isRunning = true;
  }

  function stop() {
    isRunning = false;
  }

  function changeVelocity(value) {
    velocity = value;
  }

  function changeSize(value) {
    point1.setAttribute({ size: parseInt(value) });
    point2.setAttribute({ size: parseInt(value) });
  }

  function setXText(x) {
    document.getElementById("XYGraph3Text1").innerHTML = parseFloat(x).toFixed(2);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "XYGraph3Text1"]);
  }

  function setYText(y) {
    document.getElementById("XYGraph3Text2").innerHTML = parseFloat(y).toFixed(2);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "XYGraph3Text2"]);
  }

  function setFText(f) {
    document.getElementById("RFGraph3Text1").innerHTML = parseFloat(f).toFixed(2);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "RFGraph3Text1"]);
  }

  function setRText(r) {
    document.getElementById("RFGraph3Text2").innerHTML = parseFloat(r).toFixed(2);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "RFGraph3Text2"]);
  }

  let phi = -9 * Math.PI / 4,
    step = 0.2;

  function anim() {
    changeVelocity(PointVelocity3.value);
    changeSize(PointSize3.value);

    setXText((2 * Math.cos(2 * phi)) * Math.cos(phi));
    setYText((2 * Math.cos(2 * phi)) * Math.sin(phi));
    setFText(phi * 180 / (2 * Math.PI));
    setRText(2 * Math.cos(2 * phi));

    if (phi > -7 * Math.PI / 4 && phi < -5 * Math.PI / 4 || 
        phi > -3 * Math.PI / 4 && phi < -Math.PI / 4 || 
        phi > Math.PI / 4 && phi < 3 * Math.PI / 4 || 
        phi > 5 * Math.PI / 4 && phi < 7 * Math.PI / 4)
        point1.setAttribute({ size: 0 });

    if (isRunning) {
      phi += step * velocity;

      if (phi > 7 * Math.PI / 4)
        phi = -9 * Math.PI / 4;      

      point1.moveTo([(2 * Math.cos(2 * phi)) * Math.cos(phi), (2 * Math.cos(2 * phi)) * Math.sin(phi)]);
      point2.moveTo([phi, 2 * Math.cos(2 * phi)]);
    }
    setTimeout(anim, 30);
  }

  $(window).resize(function () {
    brdXYGraph3.resizeContainer($("#XYGraph3Plot").width(), $("#XYGraph3Plot").height(), true, true);
    brdXYGraph3.setBoundingBox([-2.5, 1.5, 2.5, -1.5], false);
    brdRFGraph3.resizeContainer($("#RFGraph3Plot").width(), $("#RFGraph3Plot").height(), true, true);
    brdRFGraph3.setBoundingBox([-9 * Math.PI / 4, 4, 7 * Math.PI / 4, -1], true);
  });

  anim();
}

//---------------------------polar-4 (2sin(2phi))---------------------------//

else if (document.title == "Связь полярных и декартовых координат r=2sin(2φ)") {
  let brdXYGraph4 = JXG.JSXGraph.initBoard("XYGraph4Plot", {
    axis: true,
    defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
    boundingbox: [-3, 2, 3, -2],
    registerEvents: false,
    grid: true,
    showNavigation: false,
    showCopyright: false,
  });

  let PointSize4 = document.getElementById("PointSize4");

  brdXYGraph4.suspendUpdate();
  let plot1 = brdXYGraph4.create(
    "curve",
    [
      function (phi) {
        if (phi > -2 * Math.PI && phi < -3 * Math.PI / 2 || 
            phi > -Math.PI && phi < -Math.PI / 2 || 
            phi > 0 && phi < Math.PI / 2 || 
            phi > Math.PI && phi < 3 * Math.PI / 2)
          return 2 * Math.sin(2 * phi);
      },
      [0, 0],
      -2 * Math.PI,
      2 * Math.PI,
    ],
    { curveType: "polar", strokewidth: 3 }
  );
  let point1 = brdXYGraph4.create("point", [0, 0], { name: "", size: parseInt(PointSize4.value), color: "#ff0000" });
  let txt1 = brdXYGraph4.create("text", [2.85, -0.12, "$$x$$"], { fontSize: 20, color: "#000" });
  let txt2 = brdXYGraph4.create("text", [0.08, 1.93, "$$y$$"], { fontSize: 20, color: "#000" });
  brdXYGraph4.unsuspendUpdate();

  let brdRFGraph4 = JXG.JSXGraph.initBoard("RFGraph4Plot", {
    axis: true,
    defaultAxes: { y: { ticks: { visible: false } }, x: { ticks: { visible: false } } },
    boundingbox: [-2 * Math.PI, 4, 2 * Math.PI, -1],
    registerEvents: false,
    grid: true,
    showNavigation: false,
    keepaspectratio: true,
    showCopyright: false,
  });
  brdRFGraph4.suspendUpdate();
  let plot2 = brdRFGraph4.create(
    "functiongraph",
    [
      function (x) {
        if (Math.sin(2 * x) > 0)
          return 2 * Math.sin(2 * x);
      },
    ],
    { strokeColor: "#1e28ff", strokeWidth: 3 }
  );
  let plot3 = brdRFGraph4.create(
    "functiongraph",
    [
      function (x) {
        if (Math.sin(2 * x) < 0)
          return 2 * Math.sin(2 * x);
      },
    ],
    { strokeColor: "#1e28ff", strokeWidth: 3, dash: 3 }
  );
  let point2 = brdRFGraph4.create("point", [-2 * Math.PI, 2 * Math.sin(-4 * Math.PI)], {
    name: "",
    size: parseInt(PointSize4.value),
    color: "#ff0000",
  });
  let txt3 = brdRFGraph4.create("text", [5.9, -0.22, "$$φ$$"], { fontSize: 20, color: "#000" });
  let txt4 = brdRFGraph4.create("text", [0.14, 3.82, "$$r$$"], { fontSize: 20, color: "#000" });
  brdRFGraph4.unsuspendUpdate();

  let PointVelocity4 = document.getElementById("PointVelocity4");
  let velocity = PointVelocity4.value;

  let isRunning = false;
  function start() {
    isRunning = true;
  }

  function stop() {
    isRunning = false;
  }

  function changeVelocity(value) {
    velocity = value;
  }

  function changeSize(value) {
    point1.setAttribute({ size: parseInt(value) });
    point2.setAttribute({ size: parseInt(value) });
  }

  function setXText(x) {
    document.getElementById("XYGraph4Text1").innerHTML = parseFloat(x).toFixed(2);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "XYGraph4Text1"]);
  }

  function setYText(y) {
    document.getElementById("XYGraph4Text2").innerHTML = parseFloat(y).toFixed(2);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "XYGraph4Text2"]);
  }

  function setFText(f) {
    document.getElementById("RFGraph4Text1").innerHTML = parseFloat(f).toFixed(2);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "RFGraph4Text1"]);
  }

  function setRText(r) {
    document.getElementById("RFGraph4Text2").innerHTML = parseFloat(r).toFixed(2);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "RFGraph4Text2"]);
  }

  let phi = -2 * Math.PI,
    step = 0.2;

  function anim() {
    changeVelocity(PointVelocity4.value);
    changeSize(PointSize4.value);

    setXText((2 * Math.sin(2 * phi)) * Math.cos(phi));
    setYText((2 * Math.sin(2 * phi)) * Math.sin(phi));
    setFText(phi * 180 / (2 * Math.PI));
    setRText(2 * Math.sin(2 * phi));

    if (phi > -3 * Math.PI / 2 && phi < -Math.PI || 
        phi > -Math.PI / 2 && phi < 0 || 
        phi > Math.PI / 2 && phi < Math.PI || 
        phi > 3 * Math.PI / 2 && phi < 2 * Math.PI)
        point1.setAttribute({ size: 0 });

    if (isRunning) {
      phi += step * velocity;

      if (phi > 2 * Math.PI)
        phi = -2 * Math.PI;      

      point1.moveTo([(2 * Math.sin(2 * phi)) * Math.cos(phi), (2 * Math.sin(2 * phi)) * Math.sin(phi)]);
      point2.moveTo([phi, 2 * Math.sin(2 * phi)]);
    }
    setTimeout(anim, 30);
  }

  $(window).resize(function () {
    brdXYGraph4.resizeContainer($("#XYGraph4Plot").width(), $("#XYGraph4Plot").height(), true, true);
    brdXYGraph4.setBoundingBox([-3, 2, 3, -2], false);
    brdRFGraph4.resizeContainer($("#RFGraph4Plot").width(), $("#RFGraph4Plot").height(), true, true);
    brdRFGraph4.setBoundingBox([-2 * Math.PI, 4, 2 * Math.PI, -1], true);
  });

  anim();
}