const interval = setInterval(() => {
    if (document.getElementById("app").innerHTML != "Loading...") {
        OnLoad();
        clearInterval(interval);
    }
}, 100);

function OnLoad() {
    let main_container = document.querySelector(".container");

    /* Canvas size */
    function CanvasSize() {
        let form_container = document.querySelector(".form-container"),
            canvas = document.querySelector("#canvas"),
            canvas2D = document.querySelector("#canvas2D"),
            empty_block = document.querySelector(".empty-block");

        empty_block.style.width = form_container.offsetWidth + "px";
        canvas.style.width = "calc(100% - " + empty_block.style.width + ")";
        canvas2D.style.width = canvas.style.width;
    }

    // Обновление размера canvas при клике в любом месте документа
    document.addEventListener("click", function () {
        CanvasSize();
    });

    /* Panel collapse button */
    function PanelCollapse() {
        let collapse_buttons = document.querySelectorAll(".panel__collapse"),
            panels = document.querySelectorAll(".panel"),
            tab_links = document.querySelectorAll(".tab-link"),
            form_container = document.querySelector(".form-container"),
            canvas = document.getElementById("canvas");

        collapse_buttons.forEach(function (elem) {
            elem.addEventListener("click", function () {
                // Поворот стрелки и изменение заголовка для кнопки сворачивания верхней панели
                collapse_buttons.forEach(function (el) {
                    el.classList.toggle("active");
                    el.title = el.classList.contains("active") ? "Expand panel" : "Collapse panel";
                });

                // Открепление верхних панелей
                panels.forEach(function (el) {
                    el.classList.toggle("collapse");
                });

                // Изменение внешнего вида tab-link при откреплении верхних панелей
                tab_links.forEach(function (element) {
                    element.classList.toggle("panel-collapsed");
                });

                // Увеличение высоты canvas и form-container на высоту верхней панели при ее откреплении
                canvas.classList.toggle("panel-collapsed");
                form_container.classList.toggle("panel-collapsed");

                // Сворачивание активной  верхней панели 
                if (elem.classList.contains("active")) {
                    let panel_show = elem.closest(".panel_show");
                    panel_show.classList.remove("panel_show");
                }
            });
        });

        let panel = document.querySelector(".panel");

        // Скрытие открепленной панели при нажатии в любом месте экрана вне этой панели
        document.addEventListener("mousedown", function (e) {
            if (panel.classList.contains("collapse")) {
                let target = e.target,
                    active_link = document.querySelector(".active-link"),
                    tab_panel = document.querySelector(active_link.getAttribute("href")),
                    panel_show = tab_panel.parentElement.querySelector(".panel_show");

                if (panel_show !== null && !target.classList.contains("tab-link")) {
                    let panel_clicked = target == panel_show || panel_show.contains(target),
                        panel_is_active = panel_show.classList.contains("panel_show");

                    if (!panel_clicked && panel_is_active)
                        panel_show.classList.remove("panel_show");
                }
            }
        });
    }

    PanelCollapse();

    /* Popup window */
    let canvas = document.getElementById("canvas2D"),
        container = document.querySelector(".container");

    function PopupWindow() {
        let popup_windows = document.querySelectorAll(".popup");

        popup_windows.forEach(function (elem) {
            // Закрытие окна
            function ClosePopup() {
                elem.classList.remove("active");
                container.classList.remove("pointer-none");
            }
        });
    }

    PopupWindow();

    // Определение начальной позиции окна по центру экрана
    function PopupWindowPosition(drag_id, handle_id) {
        let popup = document.getElementById(drag_id);

        popup.style.top = (document.body.clientHeight - popup.offsetHeight) / 2 + "px";
        popup.style.left = (document.body.clientWidth - popup.offsetWidth) / 2 + "px";

        popup.classList.add("active");
        container.classList.add("pointer-none");

        Drag(drag_id, handle_id);
    }

    // Вызов popup-окна при нажатии ПКМ на canvas
    canvas.addEventListener("contextmenu", function () {
        // PopupWindowPosition("drag-coords", "handle-coords");
        PopupWindowPosition("drag-define-point", "handle-define-point");
        // PopupWindowPosition("drag-define-line", "handle-define-line");
        // PopupWindowPosition("drag-reflection-plane", "handle-reflection-plane");
    });

    /* Drag popup */
    let unpinned_form_count = 0;

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

        if (drag.offsetTop < 0) drag.style.top = "0px";
        if (drag.offsetLeft < 0) drag.style.left = "0px";
        if (drag.offsetTop + drag.clientHeight > container.clientHeight) drag.style.top = container.clientHeight - drag.clientHeight + "px";
        if (drag.offsetLeft + drag.clientWidth > container.clientWidth) drag.style.left = container.clientWidth - drag.clientWidth + "px";
    }

    /* Menu */
    function Menu() {
        let file_button = document.querySelector(".file-button"),
            menu = document.querySelector(".menu");

        // Открытие окна меню при нажатии на кнопку File
        file_button.addEventListener("click", function () {
            file_button.classList.toggle("active");
            menu.classList.toggle("active");
        });

        // Скрытие окна меню при нажатии в любом месте экрана вне меню
        document.addEventListener("mousedown", function (e) {
            let target = e.target;
            let menu_clicked = target == menu || menu.contains(target);
            let file_button_clicked = target == file_button;
            let menu_is_active = menu.classList.contains("active");

            if (!menu_clicked && !file_button_clicked && menu_is_active) {
                file_button.classList.remove("active");
                menu.classList.remove("active");
            }
        });
    }

    Menu();

    /* Checkbox */
    let checkboxes = document.querySelectorAll(".checkbox"),
        forms = document.querySelectorAll(".form");

    function Checkbox() {
        checkboxes.forEach(function (elem) {
            // Активация чекбоксов
            elem.addEventListener("click", function () {
                let check = elem.querySelector(".check"),
                    checkbox_container = elem.closest(".checkbox-container"),
                    checkbox_quantity = checkbox_container.querySelector(".quantity"),
                    checkbox_input = checkbox_container.querySelector(".checkbox__input"),
                    base = checkbox_container.querySelector(".base");

                check.classList.toggle("is-checked");

                if (checkbox_input !== null)
                    checkbox_input.classList.toggle("active");

                if (checkbox_quantity !== null)
                    checkbox_quantity.classList.toggle("active");

                if (base !== null)
                    base.classList.toggle("active");

                let form_mouse = document.querySelector(".form-mouse"),
                    checkbox_wrapper = form_mouse.querySelector(".form__checkbox-wrapper"),
                    active_log_checkboxes = checkbox_wrapper.querySelectorAll(".is-checked"),
                    first_checkbox = checkbox_wrapper.querySelector(".first");

                // Выравнивание чекбоксов в форме form-mouse, если включен только один из них
                if (active_log_checkboxes.length == 1) {
                    if (active_log_checkboxes[0].closest(".checkbox-container") === first_checkbox)
                        first_checkbox.style.marginRight = "-48px";
                    else
                        first_checkbox.style.marginRight = "48px";
                } else {
                    first_checkbox.style.marginRight = "0px";
                }
            });
        });

        let bases = document.querySelectorAll(".base");

        // Имитация нажатия на чекбокс при нажатии на основание логарифма
        bases.forEach(function (elem) {
            elem.addEventListener("click", function () {
                let checkbox = elem.closest(".checkbox-container").querySelector(".checkbox");

                let clickEvent = new Event("click");
                checkbox.dispatchEvent(clickEvent);
            });
        });

        // Стрелки для input number
        let quantity = document.querySelectorAll(".quantity");

        quantity.forEach(function (elem) {
            let input = elem.querySelector("input"),
                btnUp = elem.querySelector(".quantity-up"),
                btnDown = elem.querySelector(".quantity-down");

            btnUp.addEventListener("click", function () {
                let changeEvent = new Event("change");

                input.value = parseFloat(input.value) + 1;
                input.dispatchEvent(changeEvent);
            });

            btnDown.addEventListener("click", function () {
                let changeEvent = new Event("change");

                input.value = parseFloat(input.value) - 1;
                input.dispatchEvent(changeEvent);
            });
        });
    }

    // Checkbox();

    // Выделение зафиксированной координаты в footer
    let fix_checkboxes = document.querySelectorAll(".checkbox-fix");

    fix_checkboxes.forEach(function (elem) {
        elem.addEventListener("click", function () {
            let coords_span = document.querySelector("." + elem.dataset.coord.toString());

            coords_span.classList.toggle("fixed");
        });
    });

    function ShowFloatingList(place, eventname, list, isButton) {
        place.addEventListener(eventname, function (e) {
            let mousePosition = { x: e.clientX, y: e.clientY },
                rect = place.getBoundingClientRect(),
                form_container = document.querySelector(".form-container");

            if (!isButton) {
                // Если нижняя граница меню заходит за границу окна, то выводить окна над позицией нажатия курсора
                if (mousePosition.y - rect.y + list.offsetHeight <= rect.y + place.offsetHeight + 50 - mousePosition.y)
                    list.style.top = mousePosition.y + "px";
                else
                    list.style.top = mousePosition.y - list.offsetHeight + "px";

                // Если формы находятся справа, то вызывать меню слева от клика мыши и наоборот
                if (form_container.classList.contains("left-side")) {
                    list.style.left = mousePosition.x + "px";
                    list.style.right = "auto";
                } else {
                    list.style.right = place.offsetWidth - (mousePosition.x - rect.x) + "px";
                    list.style.left = "auto";
                }
            } else {
                let body = document.querySelector("body");

                // Если нижняя граница меню заходит за границу окна, то выводить окна над позицией нажатия курсора
                if (rect.y + place.offsetHeight + list.offsetHeight <= body.offsetHeight)
                    list.style.top = mousePosition.y + "px";
                else
                    list.style.top = mousePosition.y - list.offsetHeight + "px";

                // Если формы находятся справа, то вызывать меню слева от клика мыши и наоборот
                if (form_container.classList.contains("left-side"))
                    list.style.left = mousePosition.x + "px";
                else
                    list.style.left = mousePosition.x - list.offsetWidth + "px";
            }

            list.classList.add("active");
        });

        // Скрытие всплывающего меню при нажатии вне его
        document.addEventListener("mousedown", function (e) {
            let target = e.target;
            let list_clicked = target == list || list.contains(target);
            let list_is_active = list.classList.contains("active");

            if (!list_clicked && list_is_active)
                list.classList.remove("active");
        });
    }

    /* Form */
    function Form() {
        if (main_container.classList.contains("preprocessor")) {
            let form_variables = document.querySelector(".form-variables"),
                expander_variables = form_variables.querySelector(".expander .block__heading");

            // Удаление заголовка формы Variables при неактивном expander для удаления лишнего отступа (опционально)
            expander_variables.addEventListener("click", function () {
                form_variables.querySelector(".form__title").classList.toggle("show");
            });
        }

        if (main_container.classList.contains("processor")) {
            let form_task = document.querySelector(".form-task"),
                expander_task = form_task.querySelector(".expander .block__heading");

            // Удаление заголовка формы Task panel при неактивном expander для улучшения вида формы (опционально)
            expander_task.addEventListener("click", function () {
                form_task.querySelector(".form__title").classList.toggle("show");
            });

            let form_inputs = document.querySelectorAll(".form__input-wrapper");

            form_inputs.forEach(function (elem) {
                elem.addEventListener("click", function (e) {
                    CanvasSize();
                    e.stopPropagation();
                });
            });
        }

        // Заполнение атрибутов формы data-top и data-left начальными значениями top и left
        forms.forEach(function (elem) {
            let rect = elem.getBoundingClientRect(),
                canvas = document.getElementById("canvas");

            elem.dataset.top = rect.y + "px";
            elem.dataset.left = (canvas.clientWidth - elem.clientWidth) / 2 + "px";
        });

        // Появление формы выше остальных при перемещении
        forms.forEach(function (elem) {
            // MovePinnedForm(elem);

            elem.addEventListener("mousedown", function () {
                ChangeFormZIndex(elem);
            });
        });

        // Появление выбранной формы выше остальных
        function ChangeFormZIndex(form) {
            form.style.zIndex = "1" + unpinned_form_count;

            [].forEach.call(forms, function (el) {
                if (el !== form)
                    el.style.zIndex = "1" + (unpinned_form_count - 1);
            }, form);
        }

        // Доступ к возможности перемещения открепленного окна и счетчик открепленных окон
        function OnClickFormPin(form, drag_id, handle_id) {
            if (!form.classList.contains("unpinned")) {
                unpinned_form_count++;

                form.style.top = form.dataset.top;
                form.style.left = form.dataset.left;

                ChangeFormZIndex(form);

                form.classList.add("unpinned");

                // SetOrderForForms();

                Drag(drag_id, handle_id);
            } else {
                form.classList.remove("unpinned");
                unpinned_form_count--;
                form.style.zIndex = "10";

                form.dataset.top = form.style.top;
                form.dataset.left = form.style.left;

                // SetOrderForForms();
            }
        }

        let form_container = document.querySelector(".form-container"),
            form_control_wrapper = document.querySelector(".form__control-wrapper"),
            form_control = form_control_wrapper.querySelector(".form__control"),
            control_button_collapse = form_control.querySelector(".floating-list__button-collapse"),
            control_button_move = form_control.querySelector(".floating-list__button-move"),
            expand_form_button = document.querySelector(".button-expand_form"),
            form_checkboxes = form_control.querySelectorAll(".checkbox");

        let close_form_buttons = document.querySelectorAll(".form__close");

        // Скрытие выбранной формы
        close_form_buttons.forEach(function (elem) {
            elem.addEventListener("click", function () {
                elem.closest(".form").classList.add("hide");

                // Добавление кнопки "развернуть панель", если на экране не осталось форм
                if (form_container.clientWidth == 0)
                    expand_form_button.classList.add("active");

                // Синхронизация форм и чекбоксов
                SynchronizingFormsAndCheckboxes();
            });
        });

        let pin_form_buttons = document.querySelectorAll(".form__pin");

        // Обработка нажатия на Pin
        pin_form_buttons.forEach(function (elem) {
            elem.addEventListener("click", function () {
                elem.classList.toggle("active");

                // Смена title для pin при наведении
                elem.title = elem.classList.contains("active") ? "Pin form" : "Unpin form";

                let current_form = elem.closest(".form");

                OnClickFormPin(current_form, current_form.id.toString(), current_form.querySelector(".form__handle").id.toString());
            });
        });

        // Синхронизация чекбоксов в панели управления формами и наличия форм на экране
        form_checkboxes.forEach(function (elem) {
            elem.addEventListener("click", function () {
                let current_form = document.querySelector("." + elem.dataset.form.toString());

                current_form.classList.toggle("hide");
            });
        });

        SynchronizingFormsAndCheckboxes();

        // Активация всплывающих меню для кнопок move, copy и create curve
        if (main_container.classList.contains("preprocessor")) {
            let button_move = document.querySelector(".button-move"),
                list_move = form_container.querySelector(".list-move"),
                button_copy = document.querySelector(".button-copy"),
                list_copy = form_container.querySelector(".list-copy"),
                button_curve = document.querySelector(".button-curve"),
                list_curve = form_container.querySelector(".list-curve");

            ShowFloatingList(button_move, "click", list_move, true);
            ShowFloatingList(button_copy, "click", list_copy, true);
            ShowFloatingList(button_curve, "click", list_curve, true);
        }

        // Активация всплывающего меню управления формами
        ShowFloatingList(form_control_wrapper, "contextmenu", form_control, false);

        // Скрытие окна управления формами, сворачивание панели с формами и появление кнопки "развернуть панель" при нажатии на "свернуть панель"
        control_button_collapse.addEventListener("click", function () {
            form_control.classList.remove("active");
            form_container.classList.add("hide");
            expand_form_button.classList.add("active");
        });

        // Перемещение панели с формами и кнопки "развернуть панель" на противоположную сторону
        control_button_move.addEventListener("click", function () {
            form_control.classList.remove("active");
            form_container.classList.toggle("left-side");
            expand_form_button.classList.toggle("left-side");
        });

        // Скрытие кнопки "развернуть панель" при нажатии на нее и открытие главной формы 
        expand_form_button.addEventListener("click", function () {
            expand_form_button.classList.remove("active");

            let main_form = document.querySelector(".form-main");

            main_form.classList.remove("hide");
            form_container.classList.remove("hide");

            // Синхронизация форм и чекбоксов
            SynchronizingFormsAndCheckboxes();
        });

        // Синхронизация чекбоксов и форм
        function SynchronizingFormsAndCheckboxes() {
            for (let i = 0; i < forms.length; i++) {
                if (!forms[i].classList.contains("hide"))
                    form_checkboxes[i].querySelector(".check").classList.add("is-checked");
                else
                    form_checkboxes[i].querySelector(".check").classList.remove("is-checked");
            }
        }
    }

    Form();
}
