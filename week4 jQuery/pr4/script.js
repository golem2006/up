// 1. Выбрать только li внутри #menu
$("#menu li").css("text-transform", "uppercase");

// 2. Выбрать только .current внутри ul
$("ul .current").css("font-weight", "bold");

// 3. Выбрать непосредственные дочерние элементы
$("#menu > ul > li").css("margin", "10px");

// 1. Выбрать первую строку таблицы
$("#data tr:first").css("background", "yellow");

// 2. Выбрать четные строки
$("#data tr:even").css("color", "green");

// 3. Выбрать элементы, содержащие "2"
$("td:contains('2')").css("font-size", "20px");

// 1. Выбрать поле с name="login"
$("input[name='login']").val("admin");

// 2. Выбрать disabled-элементы
$(":disabled").css("opacity", "0.5");

// 3. Выбрать ссылки с https
$("a[href^='https']").attr("target", "_blank");

// 1. Выбрать все статьи, кроме .featured
$(".post:not(.featured)").css("border", "1px dashed gray");

// 2. Выбрать первый .post в .posts
$(".posts .post:first").css("font-size", "1.2em");

// 3. Выбрать элементы, содержащие "2"
$(".post:contains('2')").css("color", "red");

// Самостоятельная
$(".container.flex > .block:odd").css("background-color", "blue");

$(document).ready(function() {
    // Функция для добавления/удаления рамки
    function updateCheckboxStyle() {
        $('input[type="checkbox"]').each(function() {
            console.log(this);
            if ($(this).is(':checked')) {
                $(this.parentNode).addClass('checked-element');
            } else {
                $(this.parentNode).removeClass('checked-element');
            }
        });
    }

    // При загрузке страницы применяем стиль к уже отмеченным чекбоксам
    updateCheckboxStyle();

    // При изменении состояния чекбокса обновляем стиль
    $('input[type="checkbox"]').change(function() {
        updateCheckboxStyle();
    });
    
    // Находим последнюю ячейку таблицы и добавляем класс
    $("#last tr:last-child td:last-child").css("background-color", "yellow");
});

