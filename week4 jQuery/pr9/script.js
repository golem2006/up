// Задание 2.1: Чтение отдельных свойств

$("#getStyles").click(function() {
    const bgColor = $("#box").css("background-color");
    const width = $("#box").css("width");
    const padding = $("#box").css("padding");
    
    $("#styleLog").html(`
        <p>Фон: ${bgColor}</p>
        <p>Ширина: ${width}</p>
        <p>Отступы: ${padding}</p>
    `);
});
// Задание 2.2: Чтение нескольких свойств

$("#getStyles").click(function() {
    const styles = $("#box").css(["background-color", "width", "height"]);
    
    let logContent = "";
    $.each(styles, function(property, value) {
        logContent += `<p>${property}: ${value}</p>`;
    });
    
    $("#styleLog").html(logContent);
});
// 3. Установка значений стилей
// Задание 3.1: Установка отдельных свойств

$("#setStyles").click(function() {
    $("#box")
        .css("background-color", "#e74c3c")
        .css("color", "white")
        .css("font-weight", "bold");
});
// Задание 3.2: Установка через объект

$("#setStyles").click(function() {
    $("#box").css({
        "background-color": "#2ecc71",
        "border-radius": "10px",
        "box-shadow": "3px 3px 5px #888888"
    });
});
// 4. Использование callback-функций
// Задание 4.1: Динамическое изменение размеров

$("#animateStyles").click(function() {
    $("#box").css("width", function(index, currentWidth) {
        const current = parseInt(currentWidth);
        return (current + 50) + "px";
    });
    
    $("#box").css("height", function(i, currentHeight) {
        return (parseInt(currentHeight) + 20) + "px";
    });
});
// Задание 4.2: Циклическое изменение цвета

let colorIndex = 0;
const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f1c40f"];

$("#animateStyles").click(function() {
    $("#box").css("background-color", function() {
        colorIndex = (colorIndex + 1) % colors.length;
        return colors[colorIndex];
    });
});
// 5. Работа с относительными значениями
// Задание 5.1: Увеличение/уменьшение размеров

$("#animateStyles").click(function() {
    $("#box").css({
        "width": "+=30px",
        "height": "+=10px",
        "font-size": "+=1px"
    });
});

// Самостоятельная

  const $element = $("#resizable");
  const $fontSizeValue = $("#fontSizeValue");
  const $paddingValue = $("#paddingValue");
  const $historyList = $("#historyList");

  const initialStyles = { // Запоминаем исходные стили
    fontSize: parseInt($element.css("font-size")),
    padding: parseInt($element.css("padding"))
  };

  let history = []; // История изменений

  function updateDisplay() { // Обновляем отображение текущих значений
    $fontSizeValue.text(parseInt($element.css("font-size")) + "px");
    $paddingValue.text(parseInt($element.css("padding")) + "px");
  }

  function addToHistory(action, fontSize, padding) {
    const entry = `${action}: Font=${fontSize}px, Padding=${padding}px`;
    history.push(entry);
    $historyList.prepend(`<li>${entry}</li>`); // Добавляем в начало списка
    if (history.length > 10) { // Ограничиваем длину истории
      history.shift(); // Удаляем самый старый элемент
      $historyList.children().last().remove(); // Удаляем из DOM
    }
  }


  $("#increaseButton").on("click", function() {
    const currentFontSize = parseInt($element.css("font-size"));
    const currentPadding = parseInt($element.css("padding"));
    const newFontSize = currentFontSize + 2;
    const newPadding = currentPadding + 5;

    $element.css({
      "font-size": newFontSize + "px",
      "padding": newPadding + "px"
    });

    addToHistory("Увеличение", newFontSize, newPadding);
    updateDisplay();
  });

  $("#decreaseButton").on("click", function() {
    const currentFontSize = parseInt($element.css("font-size"));
    const currentPadding = parseInt($element.css("padding"));
    const newFontSize = currentFontSize - 2;
    const newPadding = currentPadding - 5;

    $element.css({
      "font-size": newFontSize + "px",
      "padding": newPadding + "px"
    });

    addToHistory("Уменьшение", newFontSize, newPadding);
    updateDisplay();
  });

  $("#resetButton").on("click", function() {
    $element.css({
      "font-size": initialStyles.fontSize + "px",
      "padding": initialStyles.padding + "px"
    });

    addToHistory("Сброс", initialStyles.fontSize, initialStyles.padding);
    updateDisplay();
  });

  updateDisplay(); // Первоначальное отображение значений