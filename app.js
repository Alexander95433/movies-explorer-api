require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const corsOptionsDelegate = require('./middleware/cors');
const { requestLogger, errorLogger } = require('./middleware/logger');
const cenralErrors = require('./middleware/centralError');
const routes = require('./routes/index');

const { addressMongodb } = require('./utils/constants');

// подключи бд по url
const { PORT = 3000, MONGO_URL = addressMongodb } = process.env;

const app = express();

app.use(helmet());

app.use(cookieParser());

app.use(express.json());

mongoose.connect(MONGO_URL, { autoIndex: true });

app.use(requestLogger);

// разрешения для корсы
app.use(cors(corsOptionsDelegate));

// роуты
app.use(routes);

// обработчики ошибок
app.use(errorLogger);

app.use(errors());

app.use(cenralErrors);

// сервер
app.listen(PORT, () => {
  console.log(`Порт ${PORT}`);
});
