const $acordions = $(".accordion");
$acordions.find("div").hide();

$(document).ready(function() {
  const $box = $("#box");

  $(".control-panel").click(function (e) {
    const thisButton = e.target;
    const fName = thisButton.textContent.trim(); // Получаем имя функции из текста кнопки

    const dura = Math.floor(Math.random() * (600 - 100 + 1)) + 100;
    
    // Проверяем, существует ли метод с таким именем у jQuery-объекта $box
    if (typeof $box[fName] === 'function') {
      $box[fName](dura); // Вызываем метод с динамическим именем
    } else {
      console.warn(`Метод "${fName}" не найден у элемента #box`); // Предупреждение, если метод не существует
    }
  });

  $("#moveRightBtn").click(function() {
    $box.animate({
      left: "+=300px" // Перемещаем на 300px вправо относительно текущей позиции
    }, 500); // Длительность 500 мс
  });

  $("#moveDiagBtn").click(function() {
    $box.animate({
      left: "+=300px",
      top: "+=100px"
    }, 500);
  });

  $("#resizeBtn").click(function() {
    $box.animate({
      width: "400px",
      height: "100px"
    }, 500);
  });

  $("#multiEffectBtn").click(function() {
    $box.animate({
      opacity: 0.5, // Уменьшаем прозрачность
      left: "+=200px",
      top: "+=50px"
    }, 500)
    .animate({ // Затем увеличиваем размер
      width: "300px",
      height: "300px"
    }, 500)
    .animate({ // Возвращаем в исходное состояние
      opacity: 1,
      left: 100,
      top: 150,
      width: "200px",
      height: "200px"
    }, 500);
  });



  $acordions.click(function(e) {
    const $thisAccordeon = $(this);
    const thisH = e.target;
    if ($(thisH).is("h2, h3, h4, h5, h6")) { // Проверяем, что кликнули на заголовок
      $thisAccordeon.find("div").not($(thisH).next()).slideUp(300); // Скрытие всех, кроме кликнутого
      $(thisH).next().slideToggle(300); // slideToggle для плавности
    } else {
      console.warn("Клик был не на заголовке аккордеона");
    }
  });

  

  const $galleryItems = $(".gallery-item");
  const $overlay = $("#overlay");
  const $overlayImg = $("#overlay img");
  let currentImageIndex = 0; // Индекс текущего изображения

  // Увеличение изображения при клике
  $galleryItems.click(function() {
    const imgSrc = $(this).find("img").attr("src");
    $overlayImg.attr("src", imgSrc);
    $overlay.fadeIn(300); // Показываем оверлей

    // Центрирование изображения (не анимированное, т.к. display:flex)
    // Позиционирование в css

    // Закрытие оверлея при клике на него
    $overlay.click(function() {
      $(this).fadeOut(300);
    });

    // Устанавливаем индекс текущего изображения
    currentImageIndex = $galleryItems.index(this);
  });

  // Кнопка "Влево"
  $("#prevBtn").click(function() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
      currentImageIndex = $galleryItems.length - 1; // Переходим к последнему изображению
    }
    showImage(currentImageIndex);
  });

  // Кнопка "Вправо"
  $("#nextBtn").click(function() {
    currentImageIndex++;
    if (currentImageIndex >= $galleryItems.length) {
      currentImageIndex = 0; // Переходим к первому изображению
    }
    showImage(currentImageIndex);
  });

  // Функция для показа изображения в оверлее
  function showImage(index) {
    const imgSrc = $galleryItems.eq(index).find("img").attr("src");
    $overlayImg.attr("src", imgSrc);

    // Добавляем/удаляем класс для анимации перехода
    $overlayImg.addClass('fade-in');
    setTimeout(function() {
        $overlayImg.removeClass('fade-in');
    }, 300); // Удаляем класс после завершения анимации
      $overlay.fadeIn(300); // Показываем оверлей

       // Закрытие оверлея при клике на него
       $overlay.click(function() {
        $(this).fadeOut(300);
       });

       // Устанавливаем индекс текущего изображения
       currentImageIndex = index;
  }
});