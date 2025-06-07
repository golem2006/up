$("#targetBox").click(function() {
    $("#log").append("<p>Естественный клик на targetBox</p>");
});

// Имитация клика через 2 секунды после загрузки
setTimeout(function() {
    $("#targetBox").trigger("click");
    $("#log").append("<p>Искусственный клик через trigger()</p>");
}, 2000);

$("#targetBox").on("customEvent", function(event, param1, param2) {
    $("#log").append(`<p>Кастомное событие с параметрами: ${param1}, ${param2}</p>`);
});

$("#manualTrigger").click(function() {
    $("#targetBox").trigger("customEvent", ["Значение 1", "Значение 2"]);
});

$("#parentBox").click(function() {
    $("#log").append("<p>Обработчик parentBox</p>");
});

$("#childBox").click(function(event) {
    $("#log").append("<p>Обработчик childBox</p>");
    // event.stopPropagation(); // Раскомментируйте для остановки
});

$("#childBox").on("customClick", function(event) {
    $("#log").append("<p>Первый обработчик childBox</p>");
    event.stopImmediatePropagation();
});

$("#childBox").on("customClick", function() {
    $("#log").append("<p>Второй обработчик (не выполнится)</p>");
});

$("#manualTrigger").click(function() {
    $("#childBox").trigger("customClick");
});

$("#targetBox").focus(function() {
    $("#log").append("<p>Обработчик focus</p>");
});

$("#manualTrigger").click(function() {
    // trigger() вызовет и обработчик, и нативное поведение
    $("#targetBox").trigger("focus");
    
    // triggerHandler() вызовет только обработчик
    $("#textInput").triggerHandler("focus");
});

// Создаем кастомное событие
$("#targetBox").on("colorChange", function(event, newColor) {
    $(this).css("background", newColor);
    $("#log").append(`<p>Цвет изменен на ${newColor}</p>`);
});

// Триггерим событие с параметрами
$("#manualTrigger").click(function() {
    const colors = ["red", "green", "blue", "yellow"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    $("#targetBox").trigger("colorChange", [randomColor]);
});

  $("#cancelButton").on("click", function() {
    // Отключаем обработчики клика на #targetBox
    $("#targetBox").off("click");

    // Запрещаем новые обработчики на 3 секунды
    clickDisabled = true;
    $("#targetBox").addClass("disabled"); // Добавляем класс для визуального отображения отключения

    setTimeout(function() {
      clickDisabled = false;
      $("#targetBox").removeClass("disabled"); // Убираем класс после истечения времени
      console.log("Обработчики клика на #targetBox снова включены.");
    }, 3000);

    console.log("Обработчики клика на #targetBox отключены на 3 секунды.");
  });

$("#chain").on("stage1", function() {
    $("#log").append(`<p>Первое событе в цепочке</p>`);
    $("#chain").trigger("stage2");
});

$("#chain").on("stage2", function() {
    $("#log").append(`<p>Второе событе в цепочке</p>`);
    $("#chain").trigger("stage3");
});

$("#chain").on("stage3", function() {
    $("#log").append(`<p>Третье событе в цепочке</p>`);
});

$("#chain").click(function() {
    $("#chain").trigger("stage1");
});