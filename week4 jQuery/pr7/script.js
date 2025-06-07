$("#target").click(function(event) {
    const log = `
        Тип события: ${event.type}<br>
        Целевой элемент: ${event.target.id}<br>
        Координаты (pageX/pageY): ${event.pageX}/${event.pageY}<br>
        Координаты относительно элемента: ${event.offsetX}/${event.offsetY}<br>
        Кнопка мыши: ${event.which} (1-левая, 2-средняя, 3-правая)
    `;
    
    $("#eventLog").append(`<div>${log}</div>`);
});

$("#myForm").submit(function(event) {
    event.preventDefault();
    $("#eventLog").append(`<div>Форма не отправлена! (${new Date().toLocaleTimeString()})</div>`);
});

$("#textInput").keydown(function(event) {
    const info = `
        Нажата клавиша: ${event.key} (код: ${event.which})<br>
        Ctrl: ${event.ctrlKey}, Alt: ${event.altKey}, Shift: ${event.shiftKey}
    `;
    
    $("#eventLog").append(`<div>${info}</div>`);
    
    // Запрещаем ввод цифр
    if (event.which >= 48 && event.which <= 57) {
        event.preventDefault();
        $("#eventLog").append("<div>Цифры запрещены!</div>");
    }
});

$("#container").click(function() {
    $("#eventLog").append("<div>Сработал обработчик контейнера</div>");
});

$("#target").click(function(event) {
    $("#eventLog").append("<div>Сработал обработчик цели</div>");
    // event.stopPropagation(); // Раскомментируйте для остановки всплытия
});

let isDragging = false;
let offsetX, offsetY;

$("#target").mousedown(function(event) {
    isDragging = true;
    offsetX = event.offsetX;
    offsetY = event.offsetY;
});

$(document).mousemove(function(event) {
    if (!isDragging) return;
    
    $("#target").css({
        left: event.pageX - offsetX,
        top: event.pageY - offsetY
    });
    
    $("#eventLog").append(`<div>Перемещение: ${event.pageX}, ${event.pageY}</div>`);
});

$(document).mouseup(function() {
    isDragging = false;
    $("#eventLog").append("<div>Перетаскивание завершено</div>");
});

// Самостоятельная
  let lastClickTime = 0;
  const doubleClickThreshold = 300; // Миллисекунды

  $("#container").on("click", function(event) {
    const currentTime = event.timeStamp;
    const timeDiff = currentTime - lastClickTime;

    if (timeDiff < doubleClickThreshold && timeDiff > 0) {
      $("#eventLog").append("Двойной клик! Время между кликами: " + timeDiff + " мс");
      event.preventDefault(); // Предотвращаем стандартное поведение двойного клика (выделение текста и т.п.)
      lastClickTime = 0; // Сбрасываем время последнего клика, чтобы следующий клик не был расценен как часть двойного
    } else {
      $("#eventLog").append("Одиночный клик");
    }

    lastClickTime = currentTime;
  });

  // Обработка горячих клавиш
  $(document).keydown(function(event) {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault(); // Предотвращаем стандартное поведение Ctrl+S (сохранение страницы)
      $("#eventLog").append("Сохранение...");
    }

    if (event.altKey && event.key === '1') {
      $("#target").css("background-color", "blue");
    }
  });