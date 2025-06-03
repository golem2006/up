const express = require('express'); // Установить: npm install express
const cors = require('cors'); // Установить: npm install cors

const app = express();
const port = 3000;

app.use(express.static('.')); // Обслуживать статические файлы из текущей директории
app.use(express.json()); // Для парсинга JSON в теле запроса

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:3000', null]; // Добавляем null
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) { // Проверяем origin *и* разрешаем отсутствие origin
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));

app.get('/api/product', (req, res) => {
    const product = {
        id: 1,
        name: "Ноутбук",
        price: 45000,
        inStock: true
      };
      res.json(product); // Автоматически устанавливает Content-Type: application/json    
});

app.post('/api/user', (req, res) => {
    console.log('Получены данные:', req.body);
    res.json({ status: 'success', user: req.body });
  });
  

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});