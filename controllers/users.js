const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { secretKey } = require('../utils/constants');

const BadRequestError = require('../errors/BadRequestError');
const ErrorNotFound = require('../errors/ErrorNotFound');
const BadAuthError = require('../errors/BadAuthError');
const AccessError = require('../errors/AccessError');

const User = require('../modules/users');

const login = ((req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        // maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: 'None', secure: true,
        maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: 'None',
      });
      res.send({ token });
    })
    .catch(() => { next(new BadAuthError('Неправильные почта или пароль')); });
});

const createUsers = (req, res, next) => {
  const { name } = req.body;
  return bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) { return next(new BadRequestError('Переданы невалидные данные')); }
      if (err.code === 11000) { return next(new AccessError('Аккаунт с такой почтой уже существует')); }
      return next(err);
    });
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) { throw new ErrorNotFound('Пользователь не найден'); }
      return res.send(user);
    })
    .catch(next);
};

const updateUserInformation = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name })
    .orFail(() => new ErrorNotFound('Пользователь с указанным id не существует'))
    .then((user) => { res.send({ data: user }); })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) { return next(new BadRequestError('Переданы невалидные данные')); }
      if (err.codeName === 'DuplicateKey') { return next(new AccessError('Изменяемые данные пользователя совпадают с уже существующими')); }
      return res.send(err);
    });
};

module.exports = {
  login, getUser, updateUserInformation, createUsers,
};
