const http = require("http"); // Исправлено: Используем http, а не https для простоты

const fs = require("fs");

http.createServer(function(request, response) {
    if (request.url === "/user.json") {  // Изменение:  Теперь отвечает на /user.json
        // Отправляем users.json как JSON
        fs.readFile("user.json", (error, users) => {
            if (error) {
                response.writeHead(500, { "Content-Type": "text/plain" }); // Обработка ошибки (внутренняя ошибка сервера)
                response.end("Internal Server Error");
                console.error(error); // Логируем ошибку
                return;
            }
            response.writeHead(200, { "Content-Type": "application/json" }); // Устанавливаем заголовок для JSON
            response.end(users); // Отправляем данные
        });
    }
    else if (request.url === "/") { // Обслуживаем index.html по корневому пути
        // Отправляем index.html как HTML
        fs.readFile("index.html", (error, data) => {
            if (error) {
                response.writeHead(500, { "Content-Type": "text/plain" }); // Обработка ошибки
                response.end("Internal Server Error");
                console.error(error);
                return;
            }
            response.writeHead(200, { "Content-Type": "text/html" }); // Устанавливаем заголовок для HTML
            response.end(data);
        });
    }
     else {
        // Если URL не соответствует ни одному маршруту, возвращаем 404 (Not Found)
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("Not Found");
    }
}).listen(3000, () => console.log("Сервер запущен по адресу http://localhost:3000"));