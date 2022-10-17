const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { NOT_FOUND } = require('./utils/errors');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(MONGO_URL);

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '634a9c9a514685fd2afe1529',
  };

  next();
});

app.use('/', userRouter);
app.use('/', cardRouter);
app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Такой страницы не существует' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
