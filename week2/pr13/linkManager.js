const linkInput = document.getElementById('addLinkInput');
const linkText = document.getElementById('linkText');
const linkButton = document.getElementById('addLinkButton');
const linkOutput = document.getElementById('links');
const warn = document.getElementById('warn');
        

function isExternalLink(url) { // Проверка внешняя ли ссылка
    // Получаем домен текущей страницы
    const currentDomain = window.location.hostname;
    // Создаем объект URL из переданной ссылки
    try {
      const linkURL = new URL(url);
    
      // Получаем домен из URL ссылки
      const linkDomain = linkURL.hostname;
    
      // Сравниваем домены
      return linkDomain !== currentDomain; // Если домены не совпадают (true), это внешняя ссылка
    } catch (e) {
      // Если URL не валиден, считаем его внутренней ссылкой (или возвращаем false, в зависимости от логики)
      console.error("Invalid URL:", url);
      return false; // Или true, если хотите считать невалидные URL внешними
    }
}
var input = linkInput.value; // Значение инпута URL
function AddLink() { //Добавление ссылки
    var input = linkInput.value;
    if (input == '') {
        warn.textContent = 'URL обязательно.'; // Если пусто - выход из функции
        return;
    } else {
        warn.textContent = '';
    }
    var text = linkText.value; // Значение текста ссылки
    if (text == '') { // Если пусто - текст это URL
        text = input;
    }
    const linkBlock = document.createElement('div'); // Создание блока
    linkBlock.classList.add('link');
    const editButton = document.createElement('span'); // Создание кнопки редактировать
    editButton.textContent = " ✎";
    const newLink = document.createElement('a'); // Создание ссылки
    if (isExternalLink(input)) { // Если внешняя ссылка добавить тень
        newLink.style.boxShadow = '7px 7px 19px 1px rgba(60, 193, 255, 0.2)';
    }
    newLink.href = input;
    newLink.textContent = text;
    newLink.target = "_blank";
    linkBlock.appendChild(newLink); // Вставка элементов
    linkBlock.appendChild(editButton);
    linkOutput.appendChild(linkBlock);
}
function edit(event) {
    if (event.target.tagName === 'SPAN') {
      // Получение блока, в котором была кликнута кнопка редактировать
      const linkBlock = event.target.closest('.link');
      const editSpan = event.target; // Rename to be more descriptive
    
      if (editSpan.textContent === ' ✎') { // Если нажали на кнопку редактирования
        const a = linkBlock.querySelector('a');
        const aWidth = a.offsetWidth;
        const url = a.getAttribute('href'); // URL редактируемой ссылки
        const text = a.textContent; // Текст прошлой ссылки
        const input = document.createElement('input');
        input.type = "url"; // Important to specify the input type for validation
        editSpan.textContent = ' ✓'; // Change span text
        input.value = url;
        input.style.width = aWidth + 'px'; // Такая же ширина как у ссылки
        // Store old values to restore if needed
        editSpan.dataset.oldUrl = url;
        editSpan.dataset.oldText = text;
        linkBlock.removeChild(a); // Удаление ссылки
        linkBlock.insertBefore(input, editSpan); // Вставка инпута
        input.focus(); // Set focus to input
        // Attach keypress listener so when the user presses "Enter" the edit is finished
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            finishEdit(linkBlock, editSpan, input);
          }
        });
    
        // Handle outside click
        document.addEventListener('click', clickOutsideHandler);
    
        function clickOutsideHandler(e) {
          if (!linkBlock.contains(e.target)) {
            cancelEdit(linkBlock, editSpan, input);
            document.removeEventListener('click', clickOutsideHandler);
          }
        }
    
      } else if (editSpan.textContent === ' ✓') { // Если нажали готово
        const input = linkBlock.querySelector('input'); // Get the input element
        finishEdit(linkBlock, editSpan, input);
      }
    }
}           
function finishEdit(linkBlock, editSpan, input) {
    const newUrl = input.value; // Get new URL
    // Check if the URL is valid
    try {
      new URL(newUrl); // Check for URL validity
    } catch (_) {
      alert('Please enter a valid URL'); // Show error if invalid
      input.focus(); // Stay in edit mode
      return; // Stop execution
    }
    const text = newUrl; // Use URL as text

    const newLink = document.createElement('a'); // Создание ссылки

    if (isExternalLink(newUrl)) { // Если внешняя ссылка добавить тень
      newLink.style.boxShadow = '7px 7px 19px 1px rgba(60, 193, 255, 0.2)';
    }

    newLink.href = newUrl;
    newLink.textContent = text;
    newLink.target = "_blank";

    linkBlock.removeChild(input); // Удаление input
    linkBlock.insertBefore(newLink, editSpan);

    editSpan.textContent = ' ✎'; // Change span text

    document.removeEventListener('click', clickOutsideHandler);
}           
function cancelEdit(linkBlock, editSpan, input) {
    const oldUrl = editSpan.dataset.oldUrl;
    const oldText = editSpan.dataset.oldText;
    const newLink = document.createElement('a'); // Создание ссылки
    if (isExternalLink(oldUrl)) { // Если внешняя ссылка добавить тень
      newLink.style.boxShadow = '7px 7px 19px 1px rgba(60, 193, 255, 0.2)';
    }

    newLink.href = oldUrl;
    newLink.textContent = oldText;
    newLink.target = "_blank";

    linkBlock.removeChild(input); // Удаление input
    linkBlock.insertBefore(newLink, editSpan);

    editSpan.textContent = ' ✎'; // Change span text

    document.removeEventListener('click', clickOutsideHandler);
}
linkButton.addEventListener('click', AddLink);
linkOutput.addEventListener('click', edit);