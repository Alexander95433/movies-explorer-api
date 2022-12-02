require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
// const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger');
const cenralErrors = require('./middleware/centralError');

// подключи бд по url
const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(cookieParser());

app.use(express.json());

mongoose.connect(MONGO_URL, { autoIndex: true });

app.use(requestLogger);

// разрешения для корсы
// app.use(cors(файл с разрешениями));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер успешно упал');
  }, 0);
});

// здесь будут роуты

// обработчики ошибок
app.use(errorLogger);

app.use(errors());

app.use(cenralErrors);

// сервер
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Порт ${PORT}`);
});
