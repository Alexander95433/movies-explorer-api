require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
// const cors = require('cors');
const { errors } = require('celebrate');

// подключи бд по url
const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(cookieParser());

app.use(express.json());

mongoose.connect(MONGO_URL, { autoIndex: true });

// разрешения для корсы
// app.use(cors(файл с разрешениями));

// централизованные обработчики ошибок
app.use(errors());

// сервер
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Порт ${PORT}`);
});
