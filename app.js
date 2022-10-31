const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { loginValidation, registerValidation } = require('./middlewares/validation');
const { NotFoundError } = require('./utils/NotFoundError');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(MONGO_URL);

const app = express();

app.use(express.json());

app.post('/signin', loginValidation, login);
app.post('/signup', registerValidation, createUser);
app.use('/', userRouter);
app.use('/', cardRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка сервера' : message });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
