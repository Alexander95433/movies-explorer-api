const mongoose = require('mongoose');

const BadRequestError = require('../errors/BadRequestError');
// const ErrorNotFound = require('../errors/ErrorNotFound');
// const CardDeletionError = require('../errors/CardDeletionError');

// const { celebrate, Joi } = require('celebrate');

const Movies = require('../modules/movies');

const getMovies = (req, res, next) => {
  Movies.find({})
    .then((movies) => { res.send(movies); })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  Movies.create({
    // eslint-disable-next-line object-property-newline, max-len
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId,
  })
    .then((movie) => { res.send(movie); })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

const deleteMovies = (req, res, next) => {
  Movies.findById(req.params.moviesId)
    .then(() => {})
    .catch(() => {});
};

module.exports = { getMovies, createMovie, deleteMovies };

// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies

// # создаёт фильм с переданными в теле
// eslint-disable-next-line max-len
// # country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
// POST /movies

// # удаляет сохранённый фильм по id
// DELETE /movies/_id
