$(document).ready(function() {
  $list = $("#list");
  $("#addItem").click(function() {
    const li = document.createElement('div');
    li.classList.add('item');
    li.textContent = "Элемент" + ($list.find("div").length + 1);
    $list.append(li);
  });
  $("#removeLast").click(function() {
    const last = $list.find("div:last");
    last.remove();
  });
  $("#changeText").click(function() {
    $list.find("div").each(function(index) {
      $(this).text("Изменённый элемент " + (index + 1));
    });
  });
  $("#highlightEven").click(function() {
    $list.find("div:odd").addClass("highlight");
  });

  // Задание 2
  const $form = $("#userForm");
  const $fOutput = $("#formOutput");

  $form.submit(function (event) {
    event.preventDefault(); // Предотвращаем отправку формы
    $fOutput.empty();

    $form.find("> *").each(function() {
      const $element = $(this); // Кэшируем текущий элемент как jQuery-объект
  
      let label = $element.attr('name') || $element.attr('id') || 'Неизвестное поле'; // Получаем лейбл (name или id)
      let value = '';
  
      if ($element.is('input[type="text"], input[type="email"], textarea, select')) {
        value = $element.val(); // Получаем значение для текстовых полей, textarea и select
      } else if ($element.is('input[type="radio"]:checked')) {
        value = $element.val(); // Получаем значение для выбранной радиокнопки
      } else if ($element.is('input[type="checkbox"]')) {
        value = $element.is(':checked') ? 'Да' : 'Нет'; // Да/Нет для чекбоксов
      } else {
        label = $element.text() || label; // Если это не поле ввода, берем текст из элемента (например label)
        value = "Не применимо"; // Для других элементов
      }
  
      // Формируем строку вывода
      $fOutput.append($("<div>").html(label + ': ' + value));
    });
  });

  $("#clear").click(function (event) {
    event.preventDefault();
    $form.find("> *").each(function() {
      const $element = $(this);
      $element.val('');
    });
  });

  $("#roleSelect").change(function () {
    if ($("#roleSelect").val() == 'admin') {
      $form.find('input[type="email"]').addClass('admin');
    } else {
      $form.find('input[type="email"]').removeClass('admin');
    }
  });

  // Задание 3
  const $table = $("#dynamicTable");
  const $cellText = $("#cellText");

  // Добавление строки
  $("#addRow").click(function() {
    let newRow = "<tr>";
    $table.find("tr:first td").each(function() {
      newRow += "<td>Новая ячейка</td>"; // Текст по умолчанию
    });
    newRow += "</tr>";
    $table.append(newRow);
  });

  // Добавление столбца
  $("#addColumn").click(function() {
    $table.find("tr").each(function() {
      $(this).append("<td>Новая ячейка</td>"); // Текст по умолчанию
    });
  });

  // Удаление последней строки
  $("#removeLastRow").click(function() {
    $table.find("tr:last").remove();
  });

  // Заполнение всех ячеек текстом из input при двойном клике
  $table.dblclick(function() {
    const text = $cellText.val();
    $table.find("td").text(text);
  });

  // Задание 3
  const $gallery = $("#gallery");

  $("#swapImages").click(function() {
    $gallery.prepend($gallery.find(".image-container:eq(1)")); // В начало второй элемент
  });

  $("#cloneFirst").click(function() {
    $gallery.append($gallery.find(".image-container:eq(0)").clone()); // В конец первый элемент
  });

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  function generateRandomString(length) {  
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';  
    const charactersLength = characters.length;  
    const randomValues = new Uint32Array(length);  
    window.crypto.getRandomValues(randomValues);  
    let result = '';  
    for (let i = 0; i < length; i++) {  
        const randomIndex = randomValues[i] % charactersLength;  
        result += characters.charAt(randomIndex);  
    }  
    return result;  
  }  

  $("#changeAttr").click(function() {
    $gallery.find("img").each(function () {
      let randomNumber = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
      $(this).attr("src", `https://imgholder.ru/${randomNumber}/${getRandomColor()}/${getRandomColor()}.jpg&font=kelson`);
      $(this).attr("data-desc", generateRandomString(8));
      $(this).next().text($(this).attr("data-desc"));
    })
  });
});