const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovies } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovie);
router.delete('/:_id', deleteMovies);

module.exports = router;
