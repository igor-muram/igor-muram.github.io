/* Popup window */
function PopupWindow() {
    let popup_windows = document.querySelectorAll(".popup"),
        container = document.querySelector(".container");

    popup_windows.forEach(function (elem) {
        let popup_close = elem.querySelector(".popup__close");

        popup_close.addEventListener("click", function () {
            elem.classList.remove("active");
            container.classList.remove("pointer-none");
        });
    });
}

// Закрытие окна
function ClosePopup(elem_id) {
    let container = document.querySelector(".container"),
        elem = document.getElementById("drag-" + elem_id);

    elem.classList.remove("active");
    container.classList.remove("pointer-none");
}

// Определение начальной позиции окна по центру экрана
function Popup(elem_id) {
    PopupWindow();

    let container = document.querySelector(".container"),
        popup = document.getElementById("drag-" + elem_id);

    popup.style.top = (document.body.clientHeight - popup.offsetHeight) / 2 + "px";
    popup.style.left = (document.body.clientWidth - popup.offsetWidth) / 2 + "px";

    popup.classList.add("active");
    container.classList.add("pointer-none");

    Drag("drag-" + elem_id, "handle-" + elem_id);
}

// Перемещение окна
function Drag(dragID, handleID) {
    let mousePosition,
        offset = [0, 0],
        handle = document.getElementById(handleID),
        drag = document.getElementById(dragID),
        isDown = false;

    Position(dragID);

    handle.addEventListener("mousedown", function (e) {
        isDown = true;
        offset = [drag.offsetLeft - e.clientX, drag.offsetTop - e.clientY];
    });

    document.addEventListener("mouseup", function () {
        isDown = false;
    });

    document.addEventListener("mousemove", function (e) {
        if (isDown) {
            mousePosition = { x: e.clientX, y: e.clientY };

            drag.style.left = mousePosition.x + offset[0] + "px";
            drag.style.top = mousePosition.y + offset[1] + "px";

            Position(dragID);
        }
    });
}

// Вычисление позиции окна на экране при перемещении
function Position(dragID) {
    let drag = document.getElementById(dragID);

    let container = document.querySelector(".container");

    if (drag.offsetTop < 0) drag.style.top = "0px";
    if (drag.offsetLeft < 0) drag.style.left = "0px";
    if (drag.offsetTop + drag.clientHeight > container.clientHeight) drag.style.top = container.clientHeight - drag.clientHeight + "px";
    if (drag.offsetLeft + drag.clientWidth > container.clientWidth) drag.style.left = container.clientWidth - drag.clientWidth + "px";
}
