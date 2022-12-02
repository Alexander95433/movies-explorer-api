const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, updateUserInformation } = require('../controllers/users');

// # возвращает информацию о пользователе (email и имя)
// GET /users/me

// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me

router.get('/me', getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required(),
  }),
}), updateUserInformation);

module.exports = router;
