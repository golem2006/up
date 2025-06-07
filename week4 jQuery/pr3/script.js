$("#main-title").text("Новый заголовок через jQuery!");

$(".text").css("color", "red");

$("#list li").addClass("list-item");

$(".box").first().css("background", "lightblue");

$(".box.special").text("Это особый блок!");

$("#change-btn").click(function() {
    $("#list").css("background", "yellow");
});

$("#list li").dblclick(function() {
    $(this).hide();
});

$("#main-title").css("color", "blue").text("Изменённый заголовок");


setInterval(() => {
    $(".box").slideUp(1000).slideDown(1000);
}, 3000);