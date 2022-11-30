const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, updateUserInformation } = require('../controllers/user')

// # возвращает информацию о пользователе (email и имя)
// GET /users/me

// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me

router.get('/users/me', getUser);
router.patch('/users/me', updateUserInformation);

module.exports = router;
