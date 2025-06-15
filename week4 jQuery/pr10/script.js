$(document).ready(function() {
  const $duraSelect = $("#duration"); // Кэшируем jQuery-объект выбора длительности

  let dura = parseInt($duraSelect.val(), 10) || 500; // Начальное значение, парсим в число, по умолчанию 500 мс
  const $sections = $('section'); // Кэшируем jQuery-объект sections

  // Скрываем все section-content при загрузке страницы
  $sections.find(".section-content").hide();

  $sections.click(function(e) {
    const $thisSection = $(this); // Кэшируем jQuery-объект для текущего section

    // Обновляем значение длительности из элемента выбора
    dura = parseInt($duraSelect.val(), 10) || dura; // Если не число, оставляем старое значение

    // Скрываем все section-content (кроме текущего), анимированно
    $sections.find(".section-content").not($thisSection.find(".section-content")).hide(dura);

    // Показываем содержимое текущего раздела, анимированно
    $thisSection.find(".section-content").show(dura);
  });
});