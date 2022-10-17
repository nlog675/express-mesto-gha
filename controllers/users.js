const mongoose = require('mongoose');
const User = require('../models/user');
const { BAD_REQUEST, NOT_FOUND, DEFAULT_ERROR } = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(() => {
      res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ user }))
    .catch(() => {
      res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.' });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.id).orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.' });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true }).orFail()
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
      }
      res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true }).orFail()
    .then((updatedAvatar) => res.send(updatedAvatar))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
      }
      res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.' });
    });
};

module.exports = {
  getUsers, createUser, getUserById, updateProfile, updateAvatar,
};
