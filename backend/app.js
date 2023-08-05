require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const PORT = 3000;

const cors = require('cors');

const helmet = require('helmet');
const limiter = require('./middlewares/rateLimit');
const { DB } = require('./utils/config');
// const { corsMiddlewares } = require('./middlewares/cors');

const app = express();
app.use(cors());
// app.use(corsMiddlewares);
const errorMiddlewares = require('./middlewares/error');

const router = require('./routes/index');

// импортируем логгеры
const { requestLogger, errorLogger } = require('./middlewares/logger');

// для защиты приложения от некоторых широко известных веб-уязвимостей
app.use(helmet());

// для ограничения кол-ва запросов, для защиты от DoS-атак
app.use(limiter);

// mongoose.connect('mongodb://localhost:27017/mestodb');
// подключаемся к серверу mongo
mongoose.connect(DB);

app.use(bodyParser.json());

// Логгер запросов нужно подключить до всех обработчиков роутов
app.use(requestLogger); // подключаем логгер запросов

/* app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
}); */

app.use(router); // обработчиков роутов

// логгер ошибок нужно подключить после обработчиков роутов и до обработчиков ошибок
app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use(errorMiddlewares); // централизованная обработка ошибок

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен');
});
