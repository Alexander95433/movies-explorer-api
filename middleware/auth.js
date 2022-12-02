const jwt = require('jsonwebtoken');
const BadAuthError = require('../errors/BadAuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new BadAuthError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
module.exports = auth;
