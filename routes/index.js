const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const auth = require('../middleware/auth');
const { login, createUsers } = require('../controllers/users');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const ErrorNotFound = require('../errors/ErrorNotFound');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) { return value; }
      return helpers.message('Некорректный email');
    }),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', (celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Некорректный email');
    }),
    password: Joi.string().required(),
  }),
})), createUsers);

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

// проверил токен
router.use(auth);

// получил доступ к роутам если прошел проверку токена
router.use('/users', usersRouter);

router.use('/movies', moviesRouter);

router.use('*', (req, res, next) => { next(new ErrorNotFound('Запрашиваемый ресурс не найден')); });

module.exports = router;
