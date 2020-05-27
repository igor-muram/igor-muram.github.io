$(function () {
  $('.preloader__wrapper').delay(800).fadeOut('slow');

  $("#my-menu").mmenu(
    {
      extensions: ["widescreen", "effect-menu-slide", "pagedim-black"],
      navbars: [{ position: "top", content: ["searchfield"] }],
      navbar: { title: "Содержание" },
      searchfield: { panel: true, placeholder: "Поиск", noResults: "Нет подходящих результатов" },
    },
    { searchfield: { clear: true } }
  );

  let api = $("#my-menu").data("mmenu");
  api
    .bind("open:finish", function () {
      $(".hamburger").addClass("is-active");
    })
    .bind("close:finish", function () {
      api.closeAllPanels();
      $(".hamburger").removeClass("is-active");
    });

  $(".start").click(function () {
    $(this).addClass("disabled");
    $(".stop").removeClass("disabled");
  });

  $(".stop").click(function () {
    $(this).addClass("disabled");
    $(".start").removeClass("disabled");
  });
});

//-------------- 1 + cos(phi) --------------//
if (document.title == "Связь полярных и декартовых координат r=1+cos(φ)") {
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
    setFText(phi);
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

//-------------- 1 + sin(phi) --------------//
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
    setFText(phi);
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

//-------------- 2cos(2phi) --------------//
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
    setFText(phi);
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

//-------------- 2sin(2phi) --------------//
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
    setFText(phi);
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