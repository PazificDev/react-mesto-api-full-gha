// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { joiCreateUser, joiLoginUser } = require('./middlewares/validation');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DB_URI } = require('./config');

const { PORT } = process.env;

const app = express();

const corsOptions = {
  origin: ['https://pazificdev.mesto.nomoredomains.rocks', 'http://pazificdev.mesto.nomoredomains.rocks', 'pazificdev.mesto.nomoredomains.rocks'],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(helmet());
app.use(express.json());
app.use(cors(corsOptions));

mongoose.connect(DB_URI);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', joiLoginUser, login);
app.post('/signup', joiCreateUser, createUser);
app.use(auth);
app.use(router);

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use(centralErrorHandler);

app.listen(PORT);
