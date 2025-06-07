// Обработчик клика на кнопку
$("#btn-click").click(function() {
    alert("Кнопка была нажата!");
    $(this).css("background", "green");
});

// При наведении на кнопку
$("#btn-hover").hover(
    function() { // mouseenter
        $(this).css("background", "orange");
    },
    function() { // mouseleave
        $(this).css("background", "");
    }
);

// Использование .on() для клика
$("#box").on("click", function() {
    $(this).toggleClass("highlight");
});

// Предотвращение отправки формы
$("#my-form").on("submit", function(e) {
    e.preventDefault();
    alert("Форма отправлена!");
});

// Добавление нового элемента
$("#add-item").click(function() {
    $("#list").append("<li>Новый элемент</li>");
});

// Обработка клика на li (включая динамически добавленные)
$("#list").on("click", "li", function() {
    $(this).css("text-decoration", "line-through");
});

// Создаем обработчик
$("#btn-click").on("custom-event", function() {
    console.log("Произошло custom-event!");
});

// Вызываем событие
$("#btn-click").trigger("custom-event");

// Удаляем обработчик
$("#btn-click").off("custom-event");

// 1. Случайный цвет
$("#change-color-btn").click(function() {
    const colors = ["red", "green", "blue", "yellow", "purple"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    $("#box").css("background", randomColor);
});

// 2. Двойной клик
$("#box").on("dblclick", function() {
    console.log("Текущий цвет: " + $(this).css("background-color"));
});

// 3. Нажатие клавиш
$("input[type='text']").on("keydown", function(e) {
    console.log("Нажата клавиша: " + e.keyCode);
});