const mongoose = require('mongoose');

const BadRequestError = require('../errors/BadRequestError');
const ErrorNotFound = require('../errors/ErrorNotFound');
const CardDeletionError = require('../errors/CardDeletionError');

const Movies = require('../modules/movies');

const getMovies = (req, res, next) => {
  Movies.find({})
    .then((movies) => { res.send(movies); })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movies.create({
    owner, ...req.body,
  }).then((movie) => { res.send(movie); })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

const deleteMovies = (req, res, next) => {
  Movies.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) { throw (new ErrorNotFound('Попытка удалить несуществующую карточку')); }
      if (!movie.owner.equals(req.user._id)) { throw (new CardDeletionError('Попытка удалить чужую карточку')); }
      return Movies.findByIdAndRemove(req.params.movieId)
        .then((removeMovie) => { res.send(removeMovie); });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) { return next(new BadRequestError('Переданы некорректные данные при удалении карточки')); }
      if (err.name === 'CastError') { return next(new BadRequestError('Переданы некорректные данные при удалении карточки')); }
      return next(err);
    });
  // Movies.findByIdAndRemove(req.params.movieId)
  //   .then((removeMovie) => { res.send(removeMovie); });
};

module.exports = { getMovies, createMovie, deleteMovies };
