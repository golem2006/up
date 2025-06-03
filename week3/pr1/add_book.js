try {
    const fs = require('fs');
    const booksData = fs.readFileSync('books.json', 'utf8');
    books = JSON.parse(booksData);
    const newBook = {
        title: "Brave New World",
        author: "Aldous Huxley",
        year: 1932,
        isAvailable: true,
        genres: ["dystopia", "science fiction"]
      };
      books.push(newBook);
  
      // Запись обратно в файл
      fs.writeFileSync('books.json', JSON.stringify(books, null, 2));
      console.log("Книга успешно добавлена!");
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error("Файл не найден!");
    } else if (error instanceof SyntaxError) {
      console.error("Ошибка парсинга JSON!");
    } else {
      console.error("Произошла ошибка:", error.message);
    }
}