const jwt = require('jsonwebtoken');
const BadAuthError = require('../errors/BadAuthError');

const { secretKey } = require('../utils/constants');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return next(new BadAuthError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
module.exports = auth;
