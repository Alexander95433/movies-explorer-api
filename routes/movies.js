const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies

// # создаёт фильм с переданными в теле
// eslint-disable-next-line max-len
// # country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
// POST /movies

// # удаляет сохранённый фильм по id
// DELETE /movies/_id

router.get('/movies',  );
router.post('/movies',  );
router.delete('/movies/_id',  );

module.exports = router;
