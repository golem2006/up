$(document).ready(function() {
    // Обработчик для кнопки "Вперед"
    $('.next').click(function() {
        let $active = $('.gallery img.active');
        let $next = $active.next();

        if ($next.length === 0 || $next[0].nodeName == 'DIV') {
            $next = $('.gallery img:first'); // Возвращаемся к первому изображению
        }

        $active.removeClass('active');
        $next.addClass('active');
    });

    // Обработчик для кнопки "Назад"
    $('.prev').click(function() {
        let $active = $('.gallery img.active');
        let $prev = $active.prev();

        if ($prev.length === 0) {
            $prev = $('.gallery img:last'); // Переходим к последнему изображению
        }

        $active.removeClass('active');
        $prev.addClass('active');
    });
});