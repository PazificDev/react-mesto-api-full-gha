// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { joiCreateUser, joiLoginUser } = require('./middlewares/validation');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://localhost:3000', 'localhost:3000'],
};

app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(cors(corsOptions));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb1');

app.post('/signin', joiLoginUser, login);
app.post('/signup', joiCreateUser, createUser);
app.use(auth);
app.use(router);

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use(centralErrorHandler);

app.listen(PORT);
