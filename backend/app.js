// require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./middlewares/rateLimit');

const app = express();
app.use(cors());
const errorMiddlewares = require('./middlewares/error');

const corsMiddlewares = require('./middlewares/cors');
const router = require('./routes/index');

// импортируем логгеры
const { requestLogger, errorLogger } = require('./middlewares/logger');

// для защиты приложения от некоторых широко известных веб-уязвимостей
app.use(helmet());

// для ограничения кол-ва запросов, для защиты от DoS-атак
app.use(limiter);

// mongoose.connect('mongodb://localhost:27017/mestodb');
// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());

// Логгер запросов нужно подключить до всех обработчиков роутов
app.use(requestLogger); // подключаем логгер запросов

app.use(router); // обработчиков роутов
app.use(corsMiddlewares);
// логгер ошибок нужно подключить после обработчиков роутов и до обработчиков ошибок
app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use(errorMiddlewares); // централизованная обработка ошибок

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен');
});
