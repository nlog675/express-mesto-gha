const mongoose = require('mongoose');
const Card = require('../models/card');
const { BAD_REQUEST, NOT_FOUND, DEFAULT_ERROR } = require('../utils/errors');

const getCards = (req, res) => Card.find({})
  .then((cards) => {
    res.status(200).send({ cards });
  })
  .catch(() => {
    res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.' });
  });

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch(() => {
      res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки.' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId).orFail()
    .then((card) => res.send(card))
    .catch(() => {
      res.status(NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена.' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
      }
      res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
      }
      res.status(DEFAULT_ERROR).send({ message: 'На сервере произошла ошибка.' });
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
