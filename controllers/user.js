const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const BadRequestError = require('../errors/BadRequestError');
const ErrorNotFound = require('../errors/ErrorNotFound');

const User = require('../modules/user');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) { throw new ErrorNotFound('Пользователь не найден'); }
      return res.send(user);
    })
    .catch(next);
};

/* eslint-disable brace-style */
const updateUserInformation = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name })
    .orFail(() => new ErrorNotFound('Пользователь с указанным id не существует'))
    .then((user) => { res.send({ data: user }); })
    .catch((err) => { if (err instanceof mongoose.Error.ValidationError) { return next(new BadRequestError('Переданы невалидные данные')); }
      return next(err); });
};

module.exports = { getUser, updateUserInformation };
